import React, { useRef } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Toast } from "primereact/toast";

export default function Header() {
  const [show, setShow] = React.useState(false);
  const toast = useRef(null);
  const showInfo = () => {
    toast.current.show({
      severity: "info",
      summary: "Bilgilendirme",
      detail: "Diğer sayfalara şuan erişemiyoruz.",
      life: 2000,
    });
  };
  return (
    <>
      <Toast
        ref={toast}
        className="!absolute !top-0 md:!top-8 md:!right-8 !right-0 md:!w-auto !w-[90%]"
      />
      <header className="flex flex-row items-center justify-between w-full bg-[#F6F9FD] text-black xl:px-40 px-4 relative">
        <Link href="/">
          <a className="hover:text-violet-600">
            <img
              src="https://i.hizliresim.com/23w0u9s.png"
              alt="Find Event"
              className="md:h-32 h-20 w-40 object-contain"
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
        {show && window.innerWidth < 1224 && (
          <nav className="xl:hidden flex flex-col absolute top-20 right-8 bg-[#F6F9FD] w-[80%] rounded-lg p-4 border border-violet-600 shadow-xl z-50">
            <MenuItems setShow={setShow} />
          </nav>
        )}
        <nav className="hidden xl:flex flex-row justify-end xl:justify-center gap-x-8">
          <MenuItems setShow={showInfo} />
        </nav>
      </header>
      <h1 className="hidden xl:block text-2xl font-semibold text-center bg-[#F6F9FD] text-gray-500 pb-4 w-full">
        Katılmak isteyeceğiniz{" "}
        <span className="text-violet-600 font-bold">Sonraki Etkinliği</span>{" "}
        bulun.
      </h1>
    </>
  );
}
function MenuItems({ setShow }) {
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
