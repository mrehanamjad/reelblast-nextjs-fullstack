import {  LoaderCircle } from "lucide-react";
import React from "react";

function ScreenLoader() {
  return (
    <div className="flex justify-center items-center py-4">
      <LoaderCircle className="animate-spin" size={50} color="blue" />
    </div>
  );
}

export default ScreenLoader;
