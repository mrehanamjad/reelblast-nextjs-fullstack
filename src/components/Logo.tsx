import { Film } from "lucide-react";

export default function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' | 'xl' }) {
  // Set icon sizes based on the size prop using switch
  let iconSize;
  let textSizeClass;
  
  switch (size) {
    case 'lg':
      iconSize = 32;
      textSizeClass = 'text-bold';
      break;
    case 'xl':
      iconSize = 40;
      textSizeClass = 'text-3xl font-bold';
      break;
    case 'sm':
    default:
      iconSize = 26;
      textSizeClass = 'text-xl font-semibold';
      break;
  }
  
  return (
    <div className="flex items-center">
      <Film size={iconSize} color="cyan" />
      <span className={`ml-2 ${textSizeClass} text-cyan-200`}>Reelblast</span>
    </div>
  );
}