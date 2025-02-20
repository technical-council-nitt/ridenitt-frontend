import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function LoadingScreen({
  isOpen
}: {
  isOpen: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    } else {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [isOpen]);

  return (
    <div className={`${open ? "" : "-translate-y-full duration-200"} grid place-items-center gap-8 fixed inset-0 bg-green-100 z-[100]`}>
      <div className="w-32 h-32 self-end relative">
        <div className='animate-spin rounded-full h-32 w-32 border-b-4 border-green-800' />
        <FaLocationDot className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-green-800 h-16 w-16' />
      </div>
      <div className="self-start">
        <h1
          className="text-[#008955] font-bold text-center leading-snug whitespace-nowrap md:whitespace-normal"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          RideNITT
        </h1>
        <p
          className="text-gray-700 text-center mt-2 font-bold leading-snug"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          Find your ride, your way!
        </p>
      </div>
    </div>
  )
}
