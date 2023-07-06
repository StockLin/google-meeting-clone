import React, { createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext({});

const socket = io("http://localhost:8000");
// const socket = io("https://warm-wildwood-81069.herokuapp.com");

const ContextProvider = ({ children }: any) => {
  const [stream, setStream] = useState<any>(null);
  const [me, setMe] = useState<string>("");
  const [call, setCall] = useState<any>({});
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();

  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       setStream(currentStream);

  //       myVideo.current.srcObject = currentStream;
  //     });

  //   socket.on("me", (id) => setMe(id));

  //   socket.on("calluser", ({ from, name: callerName, signal }) => {
  //     setCall({ isReceivedCall: true, from, name: callerName, signal });
  //   });
  // }, []);

  // const answerCall = () => {
  //   setCallAccepted(true);

  //   const peer = new Peer({ initiator: false, trickle: false, stream });

  //   peer.on("signal", (data: any) => {
  //     socket.emit("answercall", { signal: data, to: call.from });
  //   });

  //   peer.on("stream", (currentStream: any) => {
  //     userVideo.current.srcObj = currentStream;
  //   });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // };

  // const callUser = (id: string) => {
  //   const peer = new Peer({ initiator: true, trickle: false, stream });

  //   peer.on("signal", (data) => {
  //     socket.emit("callUser", {
  //       userToCall: id,
  //       signalData: data,
  //       from: me,
  //       name,
  //     });
  //   });

  //   peer.on("stream", (currentStream) => {
  //     userVideo.current.srcObj = currentStream;
  //   });

  //   socket.on("callAccepted", (signal) => {
  //     setCallAccepted(true);

  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const leaveCall = () => {
  //   setCallEnded(true);

  //   connectionRef.current.destory();

  //   window.location.reload();
  // };

  return (
    <SocketContext.Provider
      value={
        {
          // call,
          // callAccepted,
          // myVideo,
          // userVideo,
          // stream,
          // name,
          // setName,
          // callEnded,
          // me,
          // callUser,
          // leaveCall,
          // answerCall,
        }
      }
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
