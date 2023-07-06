import React from "react";
import { FaUser, FaShieldAlt } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { MdOutlineClose, MdOutlineContentCopy } from "react-icons/md";
import Button from "../../components/Button";

interface IProps {
  setShowMeetingInfo: (visible: boolean) => void;
  url: string;
}

const MeetingInfo: React.FC<IProps> = ({ setShowMeetingInfo, url }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-md ">
      {/* header */}
      <div className="flex items-center justify-between ">
        <span className="text-lg font-light ">會議已準備就緒</span>
        <div onClick={() => setShowMeetingInfo(false)}>
          <MdOutlineClose />
        </div>
      </div>

      <Button size="default">
        <TiUserAdd /> 新增其他人
      </Button>

      <p className="text-sm text-gray-500 ">
        你也可以將會議連結分享給想邀請加入會議的對象
      </p>

      {/* copy */}
      <div className=" relative p-[12px] rounded-md bg-gray-100">
        <span className="text-sm text-gray-600">{url}</span>
        <div
          className="absolute duration-300 -translate-y-1/2 cursor-pointer top-1/2 right-4 hover:text-gray-600"
          onClick={() => navigator.clipboard.writeText(url)}
        >
          <MdOutlineContentCopy />
        </div>
      </div>

      {/* security */}
      <div className="flex items-center gap-2 ">
        <div className="text-blue-400 text-md">
          <FaShieldAlt />
        </div>
        <span className="text-xs text-gray-500 ">
          使用者必須先獲得您的允許，才能使用這個會議連結加入
        </span>
      </div>

      <p className="text-xs text-gray-500 ">
        已使用liangyun.stark@gmail.com的身份加入
      </p>
    </div>
  );
};

export default MeetingInfo;
