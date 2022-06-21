import React from "react";
import Map from "../components/map";
import NoMatch from "./404";

export default function EventDetails({ data }) {
  if (data.error) {
    return <NoMatch />;
  }
  const mark = [];
  mark.push(data);

  return (
    <div className="w-full overflow-hidden flex flex-1 items-center flex-col justify-center text-center gap-y-4">
      <p className="text-3xl font-bold">Desing Very Soon...</p>
      <p className="text-3xl font-bold">
        Sayfa Detaylarına aşağıdan erişebileceğiniz gibi harita üzerinde de
        görüntüleyebilirsiniz.
      </p>
      <p className="text-xs py-8 border rounded-lg p-8 md:w-[50%] mx-auto w-[90%] overflow-hidden text-violet-500 font-bold">
        {JSON.stringify(mark, null, 2)}
      </p>

      <Map data={mark} eventCard={mark[0]} />
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
