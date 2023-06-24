import React, { ReactNode } from "react";

interface IProps {
  size?: "small" | "default" | "large";
  styles?: string;
  children?: ReactNode;
}

const Button: React.FC<IProps> = ({
  size = "default",
  styles = "",
  children,
}) => {
  const getStyleBySize = () => {
    if (size === "small") {
      return "text-[12px] p-[8px]";
    }
    if (size === "large") {
      return "text-[16px] p-[12px]";
    }

    return "text-[14px] p-[10px]";
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 ${getStyleBySize()} ${
        styles ? styles : "text-white bg-blue-500 hover:bg-blue-600"
      } rounded-md cursor-pointer duration-300`}
    >
      {children}
    </div>
  );
};

export default Button;
