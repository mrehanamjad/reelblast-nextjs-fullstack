import { Loader } from "lucide-react";
import React from "react";

function ScreenLoader() {
  return (
    <div className="flex justify-center items-center ">
      <Loader size={70} scale={100} color="cyan" />
    </div>
  );
}

export default ScreenLoader;
