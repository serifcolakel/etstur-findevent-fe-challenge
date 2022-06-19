import React from "react";
import Link from "next/link";
import { FaInstagram, FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-y-4 border-t py-4 border-gray w-full md:px-40 px-4 bg-[#323232] text-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-y-8 text-center md:pl-10 py-4">
        <img src="/favicon.ico" alt="Find Event" className="h-28 w-28" />
        <div className="flex flex-row  gap-x-8 text-2xl">
          {["Home", "About", "Contact"].map((text, idx) => (
            <Link key={idx} href="/">
              <a className=" hover:text-red-600">{text}</a>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-y-8 md:text-left text-center border-t pt-4">
        <div className="md:w-1/4 text-sm flex flex-col gap-y-4 px-4">
          <p>
            Copyright © 2022 <span className="text-red-600">FindEvent</span>
          </p>
          <p>
            <span className="text-red-600">FindEvent </span>
            web sitesinde her türlü bilgiyi ve görseli değiştirme, düzeltme ve
            yayınlama hakkını saklı tutar.
          </p>
        </div>
        <div className="flex flex-row justify-center gap-x-8">
          {[<FaInstagram />, <FaGithub />, <FaTwitter />, <FaLinkedinIn />].map(
            (icon, idx) => (
              <Link key={idx} href="https://github.com/serifcolakel">
                <a target="blank" className="text-3xl hover:text-red-600">
                  {icon}
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
