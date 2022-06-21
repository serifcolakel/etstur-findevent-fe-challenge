import React, { useRef } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/router";
export default function Header() {
  const [show, setShow] = React.useState(false);
  const router = useRouter();

  let text = ["Katılmak isteyeceğiniz", "Sonraki Etkinliği", "bulun."];

  if (router.pathname !== "/") {
    text = [
      "İncelemek istediğiniz",
      "Etkinlik ",
      "detaylarına aşağıdan erişebilir harita üzerinde görüntüleyebilirsiniz.",
    ];
  }
  if (router.pathname === "/speakers") {
    text = ["Konuşmayıcıya ait", "Detaylara", " aşağıda ulaşabilirsiniz."];
  }
  return (
    <>
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
          <MenuItems />
        </nav>
      </header>
      <h1 className="hidden xl:block text-2xl font-semibold text-center bg-[#F6F9FD] text-gray-500 pb-4 w-full">
        {text[0]} <span className="text-violet-600 font-bold">{text[1]} </span>
        {text[2]}
      </h1>
    </>
  );
}
function MenuItems({
  setShow = () => {
    console.log("setShow");
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
            <Link
              href={
                text === "About"
                  ? "/speakers"
                  : text === "Contact"
                  ? "https://serifcolakel.vercel.app/#contactme"
                  : "/"
              }
            >
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
