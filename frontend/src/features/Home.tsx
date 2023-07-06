import React, { useState } from "react";
import "./Home.scss";
import {
  FaQuestionCircle,
  FaExclamationCircle,
  FaCog,
  FaVideo,
  FaKeyboard,
} from "react-icons/fa";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");

  const onStartCall = () => {
    const uid = shortid.generate();
    navigate(`/${uid}#init`);
  };

  const onStartCallWithCode = () => {
    if (!code) return;

    navigate(`/${code}`);
  };

  return (
    <div className="home">
      <div className="navbar">
        <div className="navbar-left">
          <img src="/logo.png" alt="" />
          <span>Meet</span>
        </div>
        <div className="navbar-right">
          <div className="action">
            <FaQuestionCircle />
          </div>
          <div className="action">
            <FaExclamationCircle />
          </div>
          <div className="action">
            <FaCog />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="body-left">
          <div className="content">
            <Typography variant="h3" gutterBottom>
              進階視訊會議功能現已免費開放給所有人使用。
            </Typography>
            <Typography
              variant="h6"
              fontWeight={300}
              sx={{ paddingBottom: "54px", lineHeight: "1.5rem" }}
            >
              我們重新打造了 Google
              Meet，讓所有人都能免費使用這項既安全又實用的商務會議服務。
            </Typography>

            <div className="toolbar">
              <Button
                variant="contained"
                startIcon={<FaVideo />}
                sx={{ height: 48 }}
                onClick={onStartCall}
              >
                發起會議
              </Button>

              <div className="toolbar-input">
                <div className="icon">
                  <FaKeyboard />
                </div>
                <input
                  type="text"
                  placeholder="輸入會議代碼或連結"
                  onChange={(e) => setCode(e?.target?.value ?? "")}
                />
              </div>

              <Button
                variant="text"
                sx={{ height: 48 }}
                disabled={code ? false : true}
                onClick={onStartCallWithCode}
              >
                加入
              </Button>
            </div>

            <Divider />

            <div className="help-text">
              <a href="/" className="text-blue-600 ">
                進一步瞭解
              </a>{" "}
              <span>Google Meet</span>
            </div>
          </div>
        </div>
        <div className="body-right">
          <Box
            className="body-cover"
            component="img"
            src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
            alt="img"
            boxShadow={2}
            borderRadius={2}
          />
        </div>
      </div>
    </div>
  );
};
