import React from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
export default function Header() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <header className="flex flex-row items-center justify-between  py-4 w-full bg-[#323232] text-white md:px-40 px-4 relative">
        <Link href="/">
          <a className="hover:text-red-600">
            <img src="/favicon.ico" alt="Find Event" className="h-16 w-16" />
          </a>
        </Link>

        {show ? (
          <MdClose
            className="md:hidden block text-4xl"
            onClick={() => setShow(!show)}
          />
        ) : (
          <FiMenu
            className="md:hidden block text-4xl"
            onClick={() => setShow(!show)}
          />
        )}
        {show && window.innerWidth < 768 && (
          <nav className="md:hidden flex flex-col absolute top-20 right-8 bg-[#323232] w-[80%] rounded-lg p-4 border border-white shadow-xl">
            <MenuItems setShow={setShow} />
          </nav>
        )}
        <nav className="hidden md:flex flex-row justify-end md:justify-center gap-x-8">
          <MenuItems />
        </nav>
      </header>
      <h1 className="hidden md:block text-2xl font-bold text-center bg-[#323232] text-white py-4 w-full">
        Find The <span className="text-red-600">Next Event</span> you will want
        to attend.
      </h1>
    </>
  );
}
function MenuItems({
  setShow = () => {
    console.log("Link clicked");
  },
}) {
  const items = [
    "Home",
    "About",
    "Contact",
    "How it Works",
    "Support",
    "Login",
    "Get Listed Today",
  ];
  return (
    <>
      {items.map((text, idx) => (
        <span className="flex items-center" key={`${text}-${idx}`}>
          {text === "Login" || text === "Get Listed Today" ? (
            <button className="border rounded-lg my-2 py-2 px-4 border-red-600 bg-red-600 hover:bg-white hover:text-red-600 hover:border-white font-bold">
              {text}
            </button>
          ) : (
            <Link href="/">
              <a
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                className="hover:text-red-600 my-2 font-semibold"
              >
                {text}
              </a>
            </Link>
          )}
        </span>
      ))}
    </>
  );
}
