import Link from "next/link";
import React from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { FaFemale, FaMale } from "react-icons/fa";
import { GiCursedStar, GiPriceTag, GiTimeBomb } from "react-icons/gi";
import CustomCarousel from "./CustomCarousel";

export default function Card({ data }) {
  let cols =
    data.length > 10 ? ` md:grid-cols-3` : ` md:grid-cols-${data.length}`;
  return (
    <div
      className={
        "w-full grid grid-cols-1 md:w-[80%]  gap-y-4 md:gap-x-20  py-8 bg-[#F6F9FD] text-black px-4 z-20 cursor-default" +
        cols
      }
    >
      {data.map((mark) => (
        <div
          key={mark.id}
          className="flex flex-col  mx-auto gap-y-4 border rounded-lg px-4 w-full"
        >
          <div className="pt-4 w-full">
            <div className="text-violet-600 bg-[#F6F9FD] rounded-lg py-1 w-1/3 text-center mx-auto text-xl border-violet-600 border-2 px-2 z-50">
              {mark.eventType}
            </div>
          </div>
          <CustomCarousel data={mark.imageUrl} />
          <h1 className="text-violet-600 text-xl font-bold md:py-2 text-center">
            {mark.name.replace("Hotel", "") + " Eventi"}
          </h1>

          <p className="md:py-2 text-sm text-violet-500 italic">
            {mark.description}
          </p>
          <div className="w-full flex flex-row items-center justify-between px-4 md:py-4 py-2 border-y-2">
            <div className="flex flex-row gap-x-2 items-center justify-center text-xl font-bold w-1/5">
              <FaFemale size={30} className="text-violet-200" />
              <p className="text-violet-600">
                {mark.peopleCount.female + mark.name.length}
              </p>
            </div>
            <p className="text-xs w-1/3">Katılımcı Sayısı</p>
            <div className="flex flex-row gap-x-2 items-center justify-center text-2xl font-bold">
              <FaMale size={30} className="text-violet-200" />
              <p className="text-violet-600">
                {mark.peopleCount.male + mark.name.length}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row items-center justify-between px-4 md:py-2 border-b-2">
            <GiTimeBomb size={40} className="w-1/6" />
            <p className="text-xs w-1/3 pl-3">Etkinlik Zamanı</p>
            <div className="flex flex-row gap-x-3 items-center">
              <p className="text-3xl">{24}</p>
              <div className="text-center">
                <p className="text-violet-600 text-lg">{24}</p>
                <p className="text-violet-600 text-lg">{24}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row items-center justify-between px-4 md:py-2 border-b-2">
            <BiCurrentLocation size={40} className="w-1/6" />
            <p className="text-xs w-1/3 pl-1">Etkinlik Yeri</p>
            <div className="flex flex-col gap-x-3 items-end">
              <p className="text-lg">{mark.location.city}</p>
              <p className="text-violet-600 text-xs">{mark.location.state}</p>
              <p className="text-violet-600 text-lg">
                {mark.location.country.replace("Türkiye", "TR")}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-between px-4 md:py-2 border-b-2">
            <GiPriceTag size={40} className="w-1/6" />
            <p className="text-xs w-1/3">Etkinlik Ücreti</p>
            <div className="flex flex-col text-end">
              <p className="text-lg text-green-600">
                {mark.price?.amount || "FREE"}
              </p>
              <p className="text-violet-600 text-lg">
                {mark.price?.currency || ""}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-between pl-4 pr-2 md:py-4">
            <p className="text-lg w-full pl-3">Rating</p>
            <div className="flex flex-row gap-x-1 text-yellow-400">
              {mark.score.point > 0 &&
                Array.from({ length: Math.ceil(mark.score.point) / 2 }).map(
                  (_, i) => <GiCursedStar key={i} size={20} />
                )}
            </div>
          </div>
          <Link href={mark.id}>
            <a
              style={{ zIndex: "10000 !important" }}
              className="w-full md:w-[50%] font-bold border border-violet-600 bg-violet-600 hover:text-violet-600 hover:bg-white hover:border-violet-600 flex text-base items-center justify-center mx-auto z-50 mb-6 px-4 py-2 rounded-lg text-white"
            >
              İncele
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
