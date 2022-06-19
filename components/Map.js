import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { MdLocationPin } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { GiTimeBomb, GiPriceTag, GiCursedStar } from "react-icons/gi";
import { FaFemale, FaMale } from "react-icons/fa";
import { AiTwotoneStar } from "react-icons/ai";
import CustomCarousel from "./CustomCarousel";
const defaultProps = {
  center: {
    lat: 39.8996161,
    lng: 32.8131191,
  },
  zoom: 11,
};

export default function Map({ data }) {
  if (!data) return null;
  useEffect(() => {
    setMapWindow();
  }, []);
  const [showEventCard, setShowEventCard] = React.useState(null);
  const [mapProps, setMapProps] = React.useState(defaultProps);
  const [mapWindow, setWindow] = React.useState({
    width: null,
    height: "",
  });
  async function getLocation() {
    await window.navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setMapProps({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 13,
      });
    });
  }
  async function setMapWindow(params) {
    await setWindow({
      width: window.innerWidth,
      height: window.innerHeight / 0.8,
    });
  }
  return (
    <div
      className="relative"
      style={{
        width: mapWindow.width,
        height: mapWindow.height / 1.3,
      }}
    >
      <div
        onClick={() => getLocation()}
        className="hidden md:block absolute right-0 bottom-1/2 bg-violet-600 z-10 px-4 py-2 rounded-lg mr-4 text-white cursor-pointer"
      >
        Set Location
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`,
        }}
        onGoogleApiLoaded={({ map, maps }) => {
          console.log(map);
          getLocation();
        }}
        draggable={true}
        shouldUnregisterMapOnUnmount={true}
        center={mapProps.center}
        zoom={mapProps.zoom}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {mapProps.center && (
          <UserMarker
            lat={mapProps.center.lat}
            lng={mapProps.center.lng}
            key={mapProps.center.lon}
          />
        )}
        {data.map((mark) => (
          <Marker
            lat={mark.geoLocation.lat}
            lng={mark.geoLocation.lon}
            key={mark.id}
            mark={mark}
            showEventCard={showEventCard}
            setShowEventCard={setShowEventCard}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
function UserMarker() {
  return (
    <div className="relative z-50">
      <div className="absolute bottom-12 left-0 bg-white text-xl text-center px-2 rounded-lg border border-violet-600 z-50">
        You
      </div>
      <BiCurrentLocation className="h-12 w-12 text-violet-600 " />
    </div>
  );
}
function Marker({ mark, showEventCard, setShowEventCard }) {
  return (
    <div
      className={
        showEventCard === mark.id
          ? "text-xl text-blue-600 flex flex-col items-center justify-center cursor-alias relative z-50"
          : "text-xl text-red-600 flex flex-col items-center justify-center cursor-alias relative"
      }
    >
      {showEventCard === mark.id && (
        <EventCard mark={mark} setShowEventCard={setShowEventCard} />
      )}

      <MdLocationPin
        className="h-12 w-12"
        onClick={() =>
          setShowEventCard((prev) => (mark.id === prev ? null : mark.id))
        }
      />
    </div>
  );
}
function EventCard({ mark, setShowEventCard }) {
  let eventTime = mark.date
    .split(" ")
    .map((x, i) => i < 4 && x)
    .filter((y) => y !== false);
  return (
    <>
      <div className="w-[350px] border border-blue-600 absolute bottom-16 bg-[#323232] text-white rounded-lg py-2 px-4 z-20 cursor-default">
        <GrFormClose
          className="absolute top-0 !text-white bg-white right-0 m-2 text-3xl cursor-pointer z-50"
          onClick={() =>
            setShowEventCard((prev) => (mark.id === prev ? null : mark.id))
          }
        />
        <CustomCarousel data={mark.imageUrl} />
        <h1 className="text-blue-600 text-xl font-bold py-2 text-center">
          {mark.name.replace("Hotel", "") + " Eventi"}
        </h1>

        <p className="py-2 text-sm text-gray-500 italic">{mark.description}</p>
        <div className="w-full flex flex-row items-center justify-between px-4 py-4 border-y-2">
          <div className="flex flex-row gap-x-2 items-center justify-center text-2xl font-bold w-1/5">
            <FaFemale size={30} className="text-gray-200" />
            <p className="text-blue-600">{mark.peopleCount.female}</p>
          </div>
          <p className="text-xs w-1/3">Katılımcı Sayısı</p>
          <div className="flex flex-row gap-x-2 items-center justify-center text-2xl font-bold">
            <FaMale size={30} className="text-gray-200" />
            <p className="text-blue-600">{mark.peopleCount.male}</p>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-between px-4 py-2 border-b-2">
          <GiTimeBomb size={40} className="w-1/5" />
          <p className="text-xs w-1/3 pl-3">Etkinlik Zamanı</p>
          <div className="flex flex-row gap-x-3 items-center">
            <p className="text-3xl">{eventTime[2]}</p>
            <div className="text-center">
              <p className="text-gray-600 text-lg">{eventTime[1]}</p>
              <p className="text-gray-600 text-lg">{eventTime[3]}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-between px-4 py-2 border-b-2">
          <BiCurrentLocation size={40} className="w-1/5" />
          <p className="text-xs w-1/3">Etkinlik Yeri</p>
          <div className="flex flex-col gap-x-3 items-end">
            <p className="text-xl">{mark.location.city}</p>
            <p className="text-gray-600 text-lg">
              {mark.location.country.replace("Türkiye", "TR")}
            </p>
            <p className="text-gray-600 text-sm">{mark.location.state}</p>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between px-4 py-2 border-b-2">
          <GiPriceTag size={40} className="w-1/5" />
          <p className="text-xs w-1/3 pl-3">Etkinlik Ücreti</p>
          <div className="flex flex-col text-end">
            <p className="text-lg text-green-600">
              {mark.price?.amount || "FREE"}
            </p>
            <p className="text-gray-600 text-lg">
              {mark.price?.currency || ""}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between px-4 py-4">
          <p className="text-lg w-full pl-3">Rating</p>
          <div className="grid grid-cols-4 gap-x-4 text-yellow-400">
            {mark.score.point > 0 &&
              Array.from({ length: Math.ceil(mark.score.point) / 2 }).map(
                (_, i) => <GiCursedStar key={i} size={20} />
              )}
          </div>
        </div>
      </div>
      <div className=" h-14 w-14 bg-[#323232] border-l-4 border-b-4 border-blue-600 z-30 -rotate-45 transform  bottom-14 absolute"></div>
    </>
  );
}
// getStaticProps
