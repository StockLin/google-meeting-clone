import React from "react";
import { FaQuestionCircle, FaExclamationCircle, FaCog } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <div className=" w-full flex justify-between items-center p-[16px]">
      <div className=" flex flex-row items-center cursor-pointer">
        <img className=" w-[124px]" src="/logo.png" alt="logo" />
        <span className=" text-[22px] text-gray-600 pl-[4px] leading-[24px]">
          Meet
        </span>
      </div>
      <div className="flex justify-around items-center text-gray-600">
        <div className=" text-xl p-[12px] cursor-pointer hover:text-gray-500 duration-300">
          <FaQuestionCircle />
        </div>
        <div className=" text-xl p-[12px] cursor-pointer hover:text-gray-500 duration-300">
          <FaExclamationCircle />
        </div>
        <div className=" text-xl p-[12px] cursor-pointer hover:text-gray-500 duration-300">
          <FaCog />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
