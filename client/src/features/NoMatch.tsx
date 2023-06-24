import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-8 p-32">
        <h1 className="text-5xl font-normal">視訊通話名稱無效</h1>
        <Link to="/">
          <Button>返回主頁</Button>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
