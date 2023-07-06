import React, { useEffect, useRef } from "react";
import { IPeer } from "./types";

interface IProps {
  peer: IPeer;
}

const Video: React.FC<IProps> = ({ peer }) => {
  const ref = useRef<any>();

  useEffect(() => {
    peer?.peer?.on("stream", (stream) => {
      console.log("current video stream", ref);
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <div>
      <h3>{peer.userName}</h3>
      <video
        className=" w-full object-fill bg-[rgb(60,64,67)] -z-10"
        playsInline={true}
        autoPlay={true}
        muted={true}
        ref={ref}
      />
    </div>
  );
};

export default Video;
