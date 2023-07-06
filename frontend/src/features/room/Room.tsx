import React, { useState } from "react";
import "./Room.scss";
import { RoomFooter } from "./RoomFooter";
import MessageBox, { IMessage } from "./MessageBox";
import { RoomInfoBox } from "./RoomInfoBox";
import { ParticipantsBox } from "./ParticipantsBox";

export const Room: React.FC = () => {
  const [popUpMessageBox, setPopupMessageBox] = useState<boolean>(true);
  const [popUpInfoBox, setPopupInfoBox] = useState<boolean>(true);

  const defaultMessages: IMessage[] = [
    {
      id: "1",
      userId: "1",
      userName: "StarkLin",
      message: "hello",
      createdAt: "晚上10:20",
    },
    {
      id: "2",
      userId: "2",
      userName: "你",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ducimus nihil quod magni ipsam ullam accusamus odio eos quia! Amet sequi voluptas necessitatibus suscipit sit quo voluptatibus laudantium eaque! Veritatis!",
      createdAt: "晚上10:22",
    },
    {
      id: "3",
      userId: "2",
      userName: "你",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ducimus nihil.",
      createdAt: "晚上10:25",
    },
  ];

  return (
    <div className="room">
      <div className="room-body">
        <div className="room-body__left">
          {/* video box */}
          <ParticipantsBox />

          {/* room info box */}
          {popUpInfoBox && (
            <RoomInfoBox
              url="ak101-01-dt001-123"
              onClose={() => setPopupInfoBox(false)}
            />
          )}
        </div>

        {/* message box */}
        {popUpMessageBox && (
          <div className="room-body__right">
            <MessageBox
              messages={defaultMessages}
              onMessageBoxClose={() => setPopupMessageBox(false)}
            />
          </div>
        )}
      </div>

      <div className="room-footer">
        <RoomFooter
          popupMessages={popUpMessageBox}
          onPopupMessageChange={setPopupMessageBox}
        />
      </div>
    </div>
  );
};
