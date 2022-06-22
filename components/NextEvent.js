import React from "react";
import { useTimer } from "react-timer-hook";
import Confetti from "react-confetti";
import { GiPriceTag, GiTimeBomb } from "react-icons/gi";
import { BiCurrentLocation } from "react-icons/bi";

function Timer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  return (
    <div className="relative border border-violet-600 bg-violet-300 my-4 p-4 w-[90%] mx-auto bg-opacity-80 rounded-lg text-center flex flex-col items-center justify-content">
      <p className="text-white bg-violet-600 rounded-lg text-xl font-bold py-2 px-4 my-2 !z-50">
        Sonraki Etkinlik
      </p>
      <Confetti className="absolute top-0 left-0 w-full h-full !z-10" />
      <div className="flex flex-row items-center justify-center gap-x-4 w-full text-4xl z-50 py-4">
        <Tag data={days} text="gün" />
        <Tag data={hours} text="saat" />
        <Tag data={minutes} text="dakika" />
        <Tag data={seconds} text="saniye" />
      </div>

      <div
        key={"mark.id"}
        className="flex flex-col  mx-auto gap-y-4 border rounded-lg px-4 w-full !z-50 md:w-[80%] bg-white"
      >
        <div className="pt-4 w-full">
          <div className="text-violet-600 bg-[#F6F9FD] rounded-lg py-1 w-full md:w-1/3 text-center mx-auto text-xl border-violet-600 border-2 px-2 z-50">
            {"Etkinlik Detayları"}
          </div>
        </div>
        <h1 className="text-violet-600 text-xl font-bold md:py-2 text-center">
          {"Görsel Resim Sergisi"}
        </h1>

        <p className="md:py-2 text-sm text-violet-500 italic">
          Event sizlere daha iyi bir hizmet sunmak amacı ile anonim kişilerce
          düzenlenmiş olup eğlenceli vakit geçirmenize dileğiyle...
        </p>

        <div className="w-full flex flex-row items-center justify-between px-4 md:py-2 border-b-2">
          <GiTimeBomb size={40} className="w-1/3" />
          <p className="text-xs text-center w-full">Etkinlik Zamanı</p>
          <div className="flex flex-row gap-x-3 items-center justify-center w-1/3">
            <p className="text-3xl ">{1}</p>
            <div className="text-center">
              <p className="text-violet-600 text-lg">{"Hz"}</p>
              <p className="text-violet-600 text-lg">{22}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-between px-4 md:py-2 border-b-2">
          <BiCurrentLocation size={40} className="w-1/3" />
          <p className="text-xs text-center w-full">Etkinlik Yeri</p>
          <div className="flex flex-row gap-x-3 items-center justify-center w-1/3">
            <p className="text-violet-600 md:text-lg text-xs">TR</p>
            <div className="text-center">
              <p className="md:text-lg text-xs">Gazi</p>
              <p className="text-violet-600 md:text-lg text-xs">Ankara</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between px-4 pb-4">
          <GiPriceTag size={40} className="w-1/3" />
          <p className="text-xs w-full">Etkinlik Ücreti</p>
          <div className="flex flex-row gap-x-3 items-center justify-center w-1/3">
            <p className="text-lg text-green-600">{"FREE"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function Tag({ data, text }) {
  return (
    <div className="flex w-1/2 p-4 flex-col items-center  gap-y-4 border border-violet-600 bg-violet-600 text-white rounded-lg ">
      <p className="w-[30px] h-[30px]">{data}</p>
      <span className="text-xs">{text}</span>
    </div>
  );
}
export default function NextEvent() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <div>
      <Timer expiryTimestamp={time} />
    </div>
  );
}
