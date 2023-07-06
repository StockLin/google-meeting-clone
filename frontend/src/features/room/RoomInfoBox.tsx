import React from "react";
import "./RoomInfoBox.scss";
import { Button, IconButton, Typography } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { AiOutlineUserAdd, AiOutlineCopy } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";

interface IProps {
  url?: string;
  onClose?: () => void;
}

export const RoomInfoBox: React.FC<IProps> = ({
  url = "test-123-123-123",
  onClose,
}) => {
  return (
    <div className="info-container">
      {/* header */}
      <div className="info-container_header">
        <Typography variant="subtitle1">通話中的訊息</Typography>
        <IconButton size="small" onClick={onClose}>
          <FaTimes />
        </IconButton>
      </div>

      <Button variant="contained" startIcon={<AiOutlineUserAdd />}>
        新增其他人
      </Button>

      <Typography variant="caption" sx={{ color: "grey.700" }}>
        你也可以將會議連結分享給想邀請加入會議的對象
      </Typography>

      <div className="info-container_copy">
        <Typography variant="caption" sx={{ px: 2 }}>
          {url}
        </Typography>
        <IconButton onClick={() => navigator.clipboard.writeText(url)}>
          <AiOutlineCopy />
        </IconButton>
      </div>

      {/* security */}
      <div className="info-container_security">
        <div className="icon">
          <BsShieldLock />
        </div>

        <Typography variant="caption" sx={{ color: "grey.700" }}>
          使用者必須先獲得您的允許，才能使用這個會議連結加入
        </Typography>
      </div>

      <span className="info-container_note">
        已使用liangyun.stark@gmail.com的身份加入
      </span>
    </div>
  );
};
