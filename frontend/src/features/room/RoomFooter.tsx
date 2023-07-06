import React, { useState } from "react";
import {
  FaVideo,
  FaMicrophone,
  FaPhone,
  FaEllipsis,
  FaClosedCaptioning,
  FaDesktop,
  FaMicrophoneSlash,
  FaVideoSlash,
} from "react-icons/fa6";
import { BiSolidMessage } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import "./RoomFooter.scss";
import { IconButton, Divider, Button } from "@mui/material";

interface IProps {
  popupMessages: boolean;
  onPopupMessageChange: (value: boolean) => void;
}

export const RoomFooter: React.FC<IProps> = ({
  popupMessages,
  onPopupMessageChange,
}) => {
  const [devices, setDevices] = useState<{
    audio: boolean;
    video: boolean;
    screen: boolean;
  }>({
    audio: true,
    video: true,
    screen: false,
  });

  const [popupUsers, setPopupUsers] = useState<boolean>(false);

  return (
    <div className="footer">
      <div className="footer-left">
        <span>下午4:46</span>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ bgcolor: "white" }}
          flexItem
        />
        <span>code-xcxd-1212</span>
      </div>
      <div className="footer-middle">
        <IconButton
          className={`icon-btn ${devices.audio ? "" : "error"}`}
          onClick={() =>
            setDevices((prev) => ({ ...prev, audio: !prev.audio }))
          }
        >
          {devices.audio ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </IconButton>
        <IconButton
          className={`icon-btn ${devices.video ? "" : "error"}`}
          onClick={() =>
            setDevices((prev) => ({ ...prev, video: !prev.video }))
          }
        >
          {devices.video ? <FaVideo /> : <FaVideoSlash />}
        </IconButton>
        <IconButton className="icon-btn">
          <FaClosedCaptioning />
        </IconButton>
        <IconButton className="icon-btn">
          <FaDesktop />
        </IconButton>
        <IconButton className="icon-btn">
          <FaEllipsis />
        </IconButton>
        <Button className="icon-btn-close" sx={{ borderRadius: 8 }}>
          <FaPhone />
        </Button>
      </div>
      <div className="footer-right">
        <IconButton
          className={`icon-btn ${popupUsers ? "active" : ""}`}
          onClick={() => setPopupUsers((prev) => !prev)}
        >
          <HiUsers />
        </IconButton>

        <IconButton
          className={`icon-btn ${popupMessages ? "active" : ""}`}
          onClick={() => onPopupMessageChange(!popupMessages)}
        >
          <BiSolidMessage />
        </IconButton>
      </div>
    </div>
  );
};
