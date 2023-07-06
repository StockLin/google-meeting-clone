import React from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import Button from "../../components/Button";

const Messenger: React.FC = () => {
  const renderMessages = () => {
    return (
      // chat section
      <div className="flex flex-col flex-1 gap-8 p-4 overflow-y-scroll">
        {Array.from(Array(5).keys())?.map((k) => (
          // chat
          <div key={k} className="text-sm">
            <div className="flex gap-2 mb-2">
              <span>你</span>
              <span className="text-gray-500">下午 10:00</span>
            </div>
            <div className="font-light text-gray-600">
              Lorem ipsum dolor sit amet.
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col justify-between bg-white w-[360px] h-[calc(100%-96px)] rounded-md overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between p-4 text-lg">
        <h3>通話中的訊息</h3>
        <div className="cursor-pointer ">
          <FaTimes />
        </div>
      </div>

      {renderMessages()}

      {/* sender */}
      <div className="p-4 ">
        <div className="flex justify-between gap-4 overflow-hidden bg-gray-100 rounded-full">
          <input
            type="text"
            className=" w-[80%] pl-4 outline-none text-sm text-gray-600 font-light bg-gray-100"
            placeholder="傳送訊息"
          />
          <Button styles=" text-md text-blue-600 bg-gray-100 hover:bg-gray-200 w-[42px] h-[42px] rounded-[50%]">
            <FaPaperPlane />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
