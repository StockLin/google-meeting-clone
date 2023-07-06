import React, { useState } from "react";
import "./MessageBox.scss";
import { FaTimes } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { IconButton, Typography } from "@mui/material";

export interface IMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
}

interface IProps {
  messages?: IMessage[];
  onMessageBoxClose?: () => void;
}

const MessageBox: React.FC<IProps> = ({ messages = [], onMessageBoxClose }) => {
  const [inputMessage, setInputMessage] = useState<string>("");

  const renderMessages = () => {
    return (
      <div className="messages-container_content">
        {messages?.map((message) => (
          <div key={message.id} className="message">
            <div className="message-head">
              <Typography variant="caption">{message.userName}</Typography>
              <Typography variant="caption" sx={{ color: "grey.600" }}>
                {message.createdAt}
              </Typography>
            </div>

            <Typography
              variant="caption"
              sx={{ color: "grey.900", textAlign: "justify" }}
            >
              {message.message}
            </Typography>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="messages-container">
      {/* header */}
      <div className="messages-container_header">
        <Typography variant="subtitle1">通話中的訊息</Typography>
        <IconButton size="small" onClick={onMessageBoxClose}>
          <FaTimes />
        </IconButton>
      </div>

      <div className="messages-container_note">
        <Typography variant="caption">
          只有這場通話的參與者可以查去訊息，而且訊息會在通話結束後刪除
        </Typography>
      </div>

      {/* content */}
      {renderMessages()}

      {/* input */}
      <div className="messages-container_action">
        <input
          type="text"
          placeholder="傳送訊息"
          value={inputMessage}
          onChange={(e) => setInputMessage(e?.target?.value ?? "")}
        />

        <IconButton className={`sender ${inputMessage ? "active" : ""}`}>
          <AiOutlineSend />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageBox;
