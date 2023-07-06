import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaVideo, FaKeyboard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";

const Home: React.FC = () => {
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
    <div className="flex flex-col w-full h-screen ">
      <Navbar />

      <div className="flex flex-col items-center justify-around h-full p-16  md:flex-row">
        {/* left-side */}
        <div className="flex flex-col items-center ">
          <div className=" flex flex-col max-w-xl px-[16px] py-[48px]">
            <div className=" text-5xl font-normal leading-[3.5rem]">
              進階視訊會議功能現已免費開放給所有人使用。
            </div>
            <div className="mt-4 text-lg font-normal text-gray-500 ">
              我們重新打造了 Google
              Meet，讓所有人都能免費使用這項既安全又實用的商務會議服務。
            </div>

            <div className=" flex flex-col md:flex-row items-center mt-[60px] ">
              <div
                className="flex justify-center items-center gap-2 text-[16px] p-[12px] text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 duration-300"
                onClick={onStartCall}
              >
                <FaVideo />
                發起會議
              </div>
              <div className=" flex justify-center items-center ml-4 min-w-[17em]">
                <div className="relative ">
                  <div className=" absolute top-[50%] translate-x-[16px] -translate-y-[50%] z-10">
                    <FaKeyboard />
                  </div>
                  <input
                    type="text"
                    className=" text-[16px] h-[48px] border border-[#ccc] rounded-md pl-[42px] outline-blue-600 caret-blue-600"
                    placeholder="輸入會議代碼或連結"
                    onChange={(e) => setCode(e?.target?.value ?? "")}
                  />
                </div>
                <div
                  className={`ml-4   ${
                    code
                      ? "text-blue-600 cursor-pointer"
                      : "text-gray-500 cursor-default"
                  }`}
                  onClick={onStartCallWithCode}
                >
                  加入
                </div>
              </div>
            </div>

            <div className=" pt-[24px] border-t-2 mt-8 font-light">
              <a href="/" className="text-blue-600 ">
                進一步瞭解
              </a>{" "}
              <span>Google Meet</span>
            </div>
          </div>
        </div>

        {/* right-side */}
        <div>
          <div className="  w-full max-w-[650px] overflow-hidden rounded-md shadow-md p-8">
            <img src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
