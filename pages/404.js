import Link from "next/link";

export default function NoMatch() {
  return (
    <div className="flex items-center justify-center w-full h-[80vh] bg-gradient-to-r from-violet-600 to-violet-400">
      <div className="px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-violet-600 text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Sayfa Bulunamadı.
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Aradığınız sayfa bulunamıyor.
          </p>
          <Link href="/">
            <a className="px-6 py-2 text-sm font-semibold text-violet-800 bg-violet-100 hover:text-violet-100 hover:bg-violet-600">
              Anasayfaya git
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
