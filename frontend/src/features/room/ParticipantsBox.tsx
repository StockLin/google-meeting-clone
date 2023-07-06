import React from "react";
import "./ParticipantsBox.scss";
import { VideoBox } from "./VideoBox";

interface IProps {
  self?: any;
  peers?: any[];
}

export const ParticipantsBox: React.FC<IProps> = ({
  self = null,
  peers = [],
}) => {
  return (
    <div className="participants-container">
      {/* single */}
      {/* <VideoBox /> */}

      {/* multiple */}

      <div className="video">
        <VideoBox />
      </div>
      <div className="video">
        <VideoBox />
      </div>
      <div className="video">
        <VideoBox />
      </div>
    </div>
  );
};
