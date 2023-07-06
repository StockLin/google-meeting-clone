import React from "react";
import "./VideoBox.scss";
import { Avatar } from "@mui/material";
import { FaMicrophoneSlash } from "react-icons/fa";

interface IProps {
  muted?: boolean;
}

export const VideoBox: React.FC<IProps> = ({ muted = false }) => {
  return (
    <div className="video-container">
      <Avatar className="video-container_avatar">H</Avatar>
      <div className="video-container_mute">
        <FaMicrophoneSlash />
      </div>
      <div className="video-container_name">StarkLin</div>
    </div>
  );
};
