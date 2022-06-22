import React, { useEffect, useState } from "react";
import Map from "../components/map";
import NoMatch from "./404";
import Link from "next/link";
import { FaGithub, FaGlobe, FaLinkedinIn, FaMailBulk } from "react-icons/fa";
export default function EventDetails({ data }) {
  if (data.error) {
    return <NoMatch />;
  }
  const mark = [];
  mark.push(data);
  const [speaker, setSpeaker] = useState([]);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const handleShowRight = () => {
    setTimeout(() => {
      setShowRight(!showRight);
    }, 300);
  };
  const handleShowLeft = () => {
    setTimeout(() => {
      setShowLeft(!showLeft);
    }, 300);
  };
  useEffect(() => {
    setSpeaker(mark[0].speaker);
  }, []);
  return (
    <div className="w-full overflow-hidden text-center gap-x-10 relative">
      <div className="md:hidden flex gap-y-2 flex-col items-end z-0 pr-8 h-[800px] justify-center rounded-l-full bg-violet-500 bg-opacity-50 bottom-40 text-xs py-8 border rounded-lg w-full my-8 mx-auto  overflow-hidden text-white font-bold ">
        <p className="text-xl">Konuşmacı Bilgileri</p>
        <img
          src={speaker.img}
          className="pl-4 w-40 h-40 object-cover rounded-full"
          alt={speaker.name}
        />
        <p className="text-xl">{speaker.name}</p>
        <p className="text-right border-y py-2">{speaker.about}</p>
        <p className="text-xl font-bold uppercase text-white">
          {speaker.jobTitle}
        </p>
        <p className="text-xl font-bold uppercase text-white">
          {speaker.experience}
        </p>
        <div
          style={{
            zIndex: 1000,
          }}
          className="grid grid-cols-4 gap-4 border-y py-4"
        >
          {speaker?.links?.map((link) => {
            let icon = <FaGithub size={30} />;
            if (link.includes("linkedin")) icon = <FaLinkedinIn size={30} />;
            if (link.includes("gmail")) icon = <FaMailBulk size={30} />;
            if (link.includes("vercel")) icon = <FaGlobe size={30} />;
            return (
              <Link key={link} href={link}>
                <a className="text-white hover:text-violet-600 bg-violet-600 hover:bg-white border-violet-600  border  p-2 rounded-lg">
                  {icon}
                </a>
              </Link>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-1 items-center justify-end">
          {speaker?.Tags?.map((tag) => (
            <p
              key={tag}
              className="border rounded-lg bg-white text-violet-600 p-2 font-bold text-[8px]"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full md: gap-10 md:w-[80%] my-10 mx-auto flex flex-row flex-1 relative">
        <Map data={mark} eventCard={mark[0]} />
        {!showRight && (
          <div
            onMouseOver={() => handleShowRight()}
            className="absolute right-0 top-0 h-full w-1/5 z-10 cursor-help hidden md:flex items-center justify-end"
          >
            <p className="-rotate-90 -mr-28 font-bold text-violet-600 text-xs ">
              Konuşmacı detayı için buraya mouse ile gelin
            </p>
          </div>
        )}
        {!showLeft && (
          <div
            onMouseOver={() => handleShowLeft()}
            className="absolute left-0 top-0 h-full w-1/5 z-0 cursor-help hidden md:flex items-center justify-start"
          >
            <p className="rotate-90 -ml-24 font-bold text-violet-600 text-xs ">
              Diğer detaylar için buraya mouse ile gelin
            </p>
          </div>
        )}
        {showRight && (
          <div
            onMouseLeave={() => handleShowRight()}
            className="absolute right-0 hidden md:flex gap-y-2 flex-col items-end z-0 pr-8 justify-center rounded-l-full bg-violet-500 bg-opacity-50 bottom-40 text-xs py-8 border rounded-lg w-1/2 md:w-1/4 h-[75%] mx-auto  overflow-hidden text-white font-bold"
          >
            <img
              src={speaker.img}
              className="pl-4 w-40 h-40 object-cover rounded-full"
              alt={speaker.name}
            />
            <p className="text-xl">{speaker.name}</p>
            <p className="text-right border-y py-2">{speaker.about}</p>
            <p className="text-xl font-bold uppercase text-white">
              {speaker.jobTitle}
            </p>
            <p className="text-xl font-bold uppercase text-white">
              {speaker.experience}
            </p>
            <div
              style={{
                zIndex: 1000,
              }}
              className="grid grid-cols-4 gap-4 border-y py-4"
            >
              {speaker.links.map((link) => {
                let icon = <FaGithub size={30} />;
                if (link.includes("linkedin"))
                  icon = <FaLinkedinIn size={30} />;
                if (link.includes("gmail")) icon = <FaMailBulk size={30} />;
                if (link.includes("vercel")) icon = <FaGlobe size={30} />;
                return (
                  <Link key={link} href={link}>
                    <a className="text-white hover:text-violet-600 bg-violet-600 hover:bg-white border-violet-600  border  p-2 rounded-lg">
                      {icon}
                    </a>
                  </Link>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-1 items-center justify-end">
              {speaker.Tags.map((tag) => (
                <p
                  key={tag}
                  className="border rounded-lg bg-white text-violet-600 p-2 font-bold text-[8px]"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        )}
        {showLeft && (
          <div
            onMouseLeave={() => handleShowLeft()}
            className="absolute left-0 hidden md:flex flex-col items-start pr-8 justify-center rounded-r-full bg-violet-600 bg-opacity-40 top-0 text-xs py-8 border rounded-lg w-1/2 md:w-1/3 h-full mx-auto  overflow-hidden text-violet-500 font-bold"
          >
            <p className="text-4xl text-white py-8">
              Evente Katılacakların Düşünceleri
            </p>

            <div className="w-full flex flex-col items-center justify-center px-4 md:py-2 gap-4">
              {["David", "Serif", "Mustafa", "Jennifer", "Katherina"].map(
                (customer, idx) => (
                  <div
                    key={`${customer}-${idx}`}
                    className="flex flex-row gap-x-4 items-center justify-center bg-white p-4 rounded-lg"
                  >
                    <img
                      src="https://falconreactbs4.prium.me/static/media/1.38f0341f.jpg"
                      className="w-8 h-8 object-contain rounded-full"
                    />
                    <div>
                      <p>{customer}</p>
                      <q className="text-gray-600 italic">
                        Lorem ipsum details ipsum details ipsum details
                      </q>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <div className="absolute left-0 md:hidden flex flex-col items-start pr-8 justify-center rounded-r-full bg-violet-600 bg-opacity-40 top-0 text-xs py-8 border rounded-lg w-1/2 md:w-1/3 h-full mx-auto  overflow-hidden text-violet-500 font-bold">
        <p className="text-4xl text-white py-8">
          Evente Katılacakların Düşünceleri
        </p>

        <div className="w-full flex flex-col items-center justify-center px-4 md:py-2 gap-4">
          {["David", "Serif", "Mustafa", "Jennifer", "Katherina"].map(
            (customer, idx) => (
              <div
                key={`${customer}-${idx}`}
                className="flex flex-row gap-x-4 items-center justify-center bg-white p-4 rounded-lg"
              >
                <img
                  src="https://falconreactbs4.prium.me/static/media/1.38f0341f.jpg"
                  className="w-8 h-8 object-contain rounded-full"
                />
                <div>
                  <p>{customer}</p>
                  <q className="text-gray-600 italic">
                    Lorem ipsum details ipsum details ipsum details
                  </q>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let data = [];
  try {
    data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/location/${ctx.query.id}`
    ).then((res) => res.json());
  } catch (error) {
    data = [];
  }
  return {
    props: {
      data,
    },
  };
}
