import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { BiCurrentLocation } from "react-icons/bi";
import Marker from "./Marker";
import UserMarker from "./UserMarker";

const defaultProps = {
  center: {
    lat: 39.8996161,
    lng: 32.8131191,
  },
  zoom: 8,
};

export default function Map({ data }) {
  const [showEventCard, setShowEventCard] = React.useState(null);
  const [mapProps, setMapProps] = React.useState(defaultProps);
  const [userLocation, setUserLocation] = React.useState({
    lat: null,
    lng: null,
  });
  const [zoom, setZoom] = React.useState(1.441);
  const [mapWindow, setWindow] = React.useState({
    width: null,
    height: "",
  });

  async function getLocation() {
    await window.navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setMapProps({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 8,
      });
    });
  }
  async function setMapWindow() {
    await setWindow({
      width: window.innerWidth,
      height: window.innerHeight / 0.8,
    });
  }
  useEffect(() => {
    setMapWindow();
  }, []);
  let zoomDetails = [
    { lan: 1.441, zo: 8 },
    { lan: 0.851, zo: 9 },
    { lan: 0.381, zo: 10 },
    { lan: 0.181, zo: 11 },
    { lan: 0.081, zo: 12 },
  ];
  function setZoomToLantitude(zoom) {
    let res = zoomDetails.find((z) => z.zo === zoom).lan;
    setZoom(res);
  }
  if (!data) return null;
  return (
    <div
      className="relative"
      style={{
        width: mapWindow.width,
        height: mapWindow.height / 1.3,
      }}
    >
      <BiCurrentLocation
        onClick={() => getLocation()}
        size={40}
        className="absolute md:right-0 md:bottom-1/5 bottom-28 right-0 bg-violet-600 z-10 rounded-lg mr-[10px] text-black cursor-pointer"
      />
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`,
        }}
        options={{
          minZoom: 8,
          maxZoom: 12,
        }}
        onGoogleApiLoaded={({ map, maps }) => {
          console.log(map);
          getLocation();
          setMapWindow();
        }}
        onChange={(mapProps) => setZoomToLantitude(mapProps.zoom)}
        center={mapProps.center}
        zoom={mapProps.zoom}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {mapProps.center && (
          <UserMarker
            lat={userLocation.lat}
            lng={userLocation.lng}
            key={userLocation.lon}
          />
        )}
        {data.map((mark) => (
          <Marker
            lat={mark.geoLocation.lat}
            lng={mark.geoLocation.lon}
            key={mark.id}
            mark={mark}
            zoom={zoom}
            setMapProps={setMapProps}
            showEventCard={showEventCard}
            setShowEventCard={setShowEventCard}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
