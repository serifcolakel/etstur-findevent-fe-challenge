import React from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
export default function Header() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <header className="flex flex-row items-center justify-between w-full bg-[#F6F9FD] text-black xl:px-40 px-4 relative">
        <Link href="/">
          <a className="hover:text-violet-600">
            <img
              src="https://i.hizliresim.com/h0i09k2.png"
              alt="Find Event"
              className="md:h-48 h-20 w-40 object-contain"
            />
          </a>
        </Link>

        {show ? (
          <MdClose
            className="xl:hidden block text-4xl"
            onClick={() => setShow(!show)}
          />
        ) : (
          <FiMenu
            className="xl:hidden block text-4xl"
            onClick={() => setShow(!show)}
          />
        )}
        {show && window.innerWidth < 768 && (
          <nav className="xl:hidden flex flex-col absolute top-20 right-8 bg-[#F6F9FD] w-[80%] rounded-lg p-4 border border-violet-600 shadow-xl z-50">
            <MenuItems setShow={setShow} />
          </nav>
        )}
        <nav className="hidden xl:flex flex-row justify-end xl:justify-center gap-x-8">
          <MenuItems />
        </nav>
      </header>
      <h1 className="hidden xl:block text-2xl font-bold text-center bg-[#F6F9FD] text-black pb-4 w-full">
        Find The <span className="text-violet-600">Next Event</span> you will
        want to attend.
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
            <button className="border text-white rounded-lg my-2 py-2 px-4 border-violet-600 bg-violet-600 hover:bg-white hover:text-violet-600 hover:border-violet-600 font-bold">
              {text}
            </button>
          ) : (
            <Link href="/">
              <a
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                className="hover:text-violet-600 my-2 font-semibold"
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
