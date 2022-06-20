import { BiCurrentLocation } from "react-icons/bi";

export default function UserMarker() {
  return (
    <div className="relative z-50">
      <div className="absolute bottom-12 left-0 bg-white text-xl text-center px-2 rounded-lg border border-violet-600 z-50">
        You
      </div>
      <BiCurrentLocation className="h-12 w-12 text-violet-600 " />
    </div>
  );
}
