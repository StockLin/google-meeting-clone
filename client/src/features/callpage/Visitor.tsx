import React from "react";
import { FaTimes } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineUserAdd } from "react-icons/hi";
import Button from "../../components/Button";

const Visitor: React.FC = () => {
  const renderVisitors = () => {
    return (
      <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-scroll">
        {Array.from(Array(5).keys())?.map((k) => (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* avatar */}
              <div className="w-[36px] h-[36px] bg-orange-500 rounded-full flex justify-center items-center text-white text-sm">
                SL
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm ">StarkLin</span>
                <span className="text-xs text-gray-500">會議主辦人</span>
              </div>
            </div>

            <div className="p-4 duration-100 rounded-full cursor-pointer hover:bg-gray-100">
              <FiMoreVertical />
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
        <h3>參與者</h3>
        <div className="cursor-pointer ">
          <FaTimes />
        </div>
      </div>

      <div className="p-4 ">
        <Button>
          <HiOutlineUserAdd />
          新增成員
        </Button>
      </div>

      {/* visitor list */}
      {renderVisitors()}
    </div>
  );
};

export default Visitor;
