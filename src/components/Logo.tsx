import { Film } from "lucide-react";
import Image from "next/image";

export default function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' | 'xl' }) {
  let iconSize;
  let textSizeClass;
  
  switch (size) {
    case 'lg':
      iconSize = 56;
      textSizeClass = 'text-2xl font-bold';
      break;
    case 'xl':
      iconSize = 72;
      textSizeClass = 'text-3xl font-bold';
      break;
    case 'sm':
    default:
      iconSize = 40;
      textSizeClass = 'text-xl font-semibold ';
      break;
  }
  
  return (
    <div className="flex items-center">
      {/* <Film size={iconSize} className="text-blue-400" />
       */}
       <Image alt="reelblast logo image" src={"/logo.png"} width={iconSize} height={ iconSize}/>
      <span className={`ml-2 ${textSizeClass} text-blue-200 tracking-wider`}>ReelBlast</span>
    </div>
  );
}