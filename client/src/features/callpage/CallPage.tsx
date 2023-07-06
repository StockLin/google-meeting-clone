import React, { useContext, useEffect, useRef, useState } from "react";
import MeetingInfo from "./MeetingInfo";
import CallPageFooter from "./CallPageFooter";
import Messenger from "./Messenger";
import Visitor from "./Visitor";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Peer from "simple-peer";
import { Socket, io } from "socket.io-client";
import { createMeeting, getMeeting } from "../../utils/apiEndpoints";
import { SocketContext } from "../../SocketContext";
import Video from "./Video";
import { socket } from "../../sockets";

import shortid from "shortid";
import { IPeer } from "./types";

interface IUsers {
  userId: string;
  info: {
    userName: string;
    video: string;
    audio: string;
  };
}

const CallPage: React.FC = () => {
  const { id } = useParams();

  // get google auth user info
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentUser = query.get("username") ?? shortid.generate();

  const isAdmin = window.location.hash === "#init" ? true : false;
  const url = `${window.location.origin}${window.location.pathname}`;

  const [showMeetingInfo, setShowMeetingInfo] = useState<boolean>(true);
  const [showMessager, setShowMessager] = useState<boolean>(false);
  const [showVisitor, setShowVisitor] = useState<boolean>(false);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [messagerAlert, setMessagerAlert] = useState({});
  const [isAudio, setIsAudio] = useState<boolean>(true);

  const userVideoRef = useRef<any>();
  const userStream = useRef<any>();
  const peersRef = useRef<IPeer[]>([]);
  const [peers, setPeers] = useState<IPeer[]>([]);

  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });

  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const initRTC = () => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const filtered = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setVideoDevices(filtered);
      });

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          userVideoRef.current.srcObject = stream;
          userStream.current = stream;

          socket.emit("BE-join-room", { roomId: id, userName: currentUser });

          socket.on("FE-user-join", (users: IUsers[] = []) => {
            // all users
            const peers: IPeer[] = [];

            users.forEach(({ userId, info }) => {
              const { userName, video, audio } = info;

              if (userName !== currentUser) {
                const peer = createPeer(userId, socket.id, stream);

                const currentPeer = {
                  peerId: userId,
                  userName: userName,
                  peer,
                };

                peersRef.current.push({
                  peerId: userId,
                  userName,
                  peer,
                });

                peers.push(currentPeer);

                setUserVideoAudio((preList) => {
                  return {
                    ...preList,
                    [currentPeer.userName]: { video, audio },
                  };
                });
              }
            });

            console.log("user join...", currentUser, peers);

            setPeers(peers);
          });

          socket.on("FE-receive-call", ({ signal, from, info }) => {
            const { userName, video, audio } = info;
            const peerIdx = findPeer(from);

            if (!peerIdx) {
              const peer = addPeer(signal, from, stream);

              const currentPeer: IPeer = {
                peerId: from,
                userName,
                peer,
              };

              peersRef.current.push({
                peerId: from,
                peer,
                userName: userName,
              });

              setPeers((users) => {
                return [...users, currentPeer];
              });

              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [currentPeer.userName]: { video, audio },
                };
              });
            }
          });

          socket.on("FE-call-accepted", ({ signal, answerId }) => {
            const peerIdx = findPeer(answerId);
            peerIdx?.peer?.signal(signal);
          });

          socket.on("FE-user-leave", ({ userId }) => {
            const peerIdx = findPeer(userId);
            peerIdx?.peer?.destroy();

            setPeers((users) => {
              users = users.filter((user) => user.peerId !== peerIdx?.peerId);
              return [...users];
            });
            peersRef.current = peersRef.current.filter(
              ({ peerId }) => peerId !== userId
            );
          });
        });

      // return () => {
      //   socket.disconnect();
      // };
    };

    initRTC();
  }, [id]);

  const createPeer = (userId: string, caller: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-call-user", {
        userToCall: userId,
        from: caller,
        signal,
      });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    return peer;
  };

  const addPeer = (
    incomingSignal: Peer.SignalData,
    callerId: string,
    stream: MediaStream
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    console.log("ADD PEER...", callerId);

    peer.on("signal", (signal) => {
      socket.emit("BE-accept-call", { signal, to: callerId });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const findPeer = (id: string): IPeer | undefined => {
    return peersRef.current.find((p) => p.peerId === id);
  };

  return (
    <div>
      <div className="relative w-full h-[calc(100vh-80px)]">
        {/* video container */}
        <div className="w-full h-full grid-cols-1 gap-2 p-2 ">
          {/* video box */}
          <div className="grid h-full grid-flow-col gap-4 border border-blue-300 auto-cols-max ">
            <div>
              <h3>{currentUser}</h3>
              <video
                className=" w-full object-fill bg-[rgb(60,64,67)] -z-10"
                playsInline={true}
                autoPlay={true}
                muted={true}
                ref={userVideoRef}
              />
            </div>

            {peers?.map((peer, idx) => (
              <h1 key={idx}>
                Peer-{peer?.peerId}-{peer?.userName}
              </h1>
              // <Video key={idx} peer={peer} />
            ))}
          </div>

          {/* chat box */}
          {/* <div></div> */}
        </div>

        {/* info card */}
        {isAdmin && showMeetingInfo && (
          <div className=" absolute w-[300px] left-[32px] bottom-[112px]">
            <MeetingInfo setShowMeetingInfo={setShowMeetingInfo} url={url} />
          </div>
        )}

        {/* visitor */}
        {/* {showVisitor && <Visitor />} */}

        {/* messenger */}
        {/* {showMessager && <Messenger />} */}
      </div>

      {/* footer bar */}
      <CallPageFooter />
    </div>
  );
};

export default CallPage;
