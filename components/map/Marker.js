import { MdLocationPin } from "react-icons/md";
import EventCard from "./EventCard";

export default function Marker({
  mark,
  showEventCard,
  setShowEventCard,
  setMapProps,
  zoom,
}) {
  return (
    <div
      className={
        showEventCard === mark.id
          ? "text-xl text-violet-600 flex flex-col items-center justify-center cursor-alias relative z-50"
          : "text-xl text-red-600 flex flex-col items-center justify-center cursor-alias relative"
      }
    >
      {showEventCard === mark.id && (
        <EventCard mark={mark} setShowEventCard={setShowEventCard} />
      )}

      <MdLocationPin
        className="h-12 w-12"
        onClick={() => {
          setMapProps({
            center: {
              lat: mark.geoLocation.lat + zoom,
              lng: mark.geoLocation.lon,
            },
            zoom: 8,
          });
          setShowEventCard((prev) => (mark.id === prev ? null : mark.id));
        }}
      />
    </div>
  );
}
