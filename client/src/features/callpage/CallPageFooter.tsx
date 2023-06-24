import React from "react";
import {
  FaVideo,
  FaMicrophone,
  FaPhone,
  FaAngleUp,
  FaClosedCaptioning,
  FaDesktop,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { BiMessageDetail, BiUser } from "react-icons/bi";
import Button from "../../components/Button";

const CallPageFooter: React.FC = () => {
  return (
    <div className="absolute p-4 bottom-0 left-0 right-0 h-[80px] flex justify-between items-center bg-[rgb(60,64,67)] text-white z-10">
      {/* left */}
      <div className="flex w-[360px] justify-start gap-4">
        <span>下午 00:00</span>
        <span>|</span>
        <span>code-001</span>
      </div>

      {/* middle */}
      <div className="flex justify-center w-full gap-4">
        <Button
          size="small"
          styles=" text-md text-white bg-gray-600 hover:bg-gray-500 w-[42px] h-[42px] rounded-full"
        >
          <FaMicrophone />
        </Button>
        <Button
          size="small"
          styles=" text-md text-white bg-gray-600 hover:bg-gray-500 w-[42px] h-[42px] rounded-full"
        >
          <FaVideo />
        </Button>
        <Button
          size="small"
          styles=" text-md text-white bg-gray-600 hover:bg-gray-500 w-[42px] h-[42px] rounded-full"
        >
          <FaClosedCaptioning />
        </Button>
        <Button
          size="small"
          styles=" text-md text-white bg-gray-600 hover:bg-gray-500 w-[42px] h-[42px] rounded-full"
        >
          <FaDesktop />
        </Button>
        <Button
          size="small"
          styles=" text-md text-white bg-red-600 hover:bg-red-500 w-[42px] h-[42px] rounded-full"
        >
          <FaPhone />
        </Button>

        <Button
          size="small"
          styles=" text-md text-white bg-gray-600 hover:bg-gray-500 w-[42px] h-[42px] rounded-full"
        >
          <FaAngleUp />
        </Button>
      </div>
      {/* rigth */}
      <div className="  w-[360px] flex justify-end gap-4">
        <Button
          size="small"
          styles=" text-md text-white bg-gray-600 hover:bg-gray-500 w-[42px] h-[42px] rounded-full"
        >
          <BiUser />
        </Button>
        <Button
          size="small"
          styles=" text-md text-white bg-gray-600 hover:bg-gray-500 w-[42px] h-[42px] rounded-full"
        >
          <BiMessageDetail />
        </Button>
      </div>
    </div>
  );
};

export default CallPageFooter;
