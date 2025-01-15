import React from "react";

const LoadingComponent = ({ text, textColor = "text-primary-foreground" }) => {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="loader rounded-full border-t-4 border-secondary border-solid h-16 w-16 animate-spin"></div>
        <p className={`mt-4 font-medium ${textColor}`}>{text}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
