import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
export default function Spikers() {
  return (
    <div className="flex flex-col gap-y-4 w-full mx-auto text-center">
      <section className="flex flex-col gap-y-4 w-full md:py-8 md:w-[80%] mx-auto">
        <h1 className="font-bold text-violet-600 text-3xl">
          Find Event Speakers
        </h1>
        <h3 className="font-bold text-3xl text-gray-500">Serif COLAKEL</h3>
        <p className="font-bold text-violet-400 text-2xl">
          ETKİNLİK KONUŞMACISI
        </p>
      </section>
      <section className="bg-gradient-to-r from-violet-300 to-violet-400 flex flex-col md:flex-row md:gap-20 gap-4 items-center mx-auto justify-center w-full p-4 md:py-20 md:px-40">
        <img
          src="https://i.hizliresim.com/5h20dz6.jpg"
          className="w-full md:w-[30%] h-full object-contain rounded-full md:rounded-none"
          alt="Find Event Staff - Serif Colakel"
        />
        <div className="w-auto flex flex-col  items-center justify-center gap-y-8 ">
          <p className="text-4xl font-bold text-white">Find Event Staff</p>
          <p className="text-3xl font-bold text-white">Professional Speakers</p>
          <p className="text-xl font-bold text-white">
            Serif Colakel |{" "}
            <span className="font-bold text-white">1 Years Experince</span>
          </p>
          <p className="md:w-[30%] text-white">
            Lorem ipsum orem ipsum orem ipsum orem ipsum orem ipsumorem ipsum
            orem ipsum orem ipsum{" "}
          </p>
          <p className="text-xl font-bold text-white">Social Network</p>
          <div className="flex flex-row gap-x-4 items-center text-3xl">
            <FaGithub />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
      </section>
    </div>
  );
}
