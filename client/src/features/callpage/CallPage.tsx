import React, { useState } from "react";
import MeetingInfo from "./MeetingInfo";
import CallPageFooter from "./CallPageFooter";
import Messenger from "./Messenger";
import Visitor from "./Visitor";

const CallPage: React.FC = () => {
  const [showMessager, setShowMessager] = useState<boolean>(false);
  const [showVisitor, setShowVisitor] = useState<boolean>(true);

  return (
    <div className="relative w-full h-screen">
      {/* video container */}
      <video className="absolute object-cover w-full h-screen bg-[rgb(60,64,67)] -z-10">
        <source src="" />
      </video>

      {/* info card */}
      <div className=" absolute w-[300px] left-[32px] bottom-[112px]">
        <MeetingInfo />
      </div>

      {/* visitor */}
      {showVisitor && <Visitor />}

      {/* messenger */}
      {showMessager && <Messenger />}

      {/* footer bar */}
      <CallPageFooter />
    </div>
  );
};

export default CallPage;
