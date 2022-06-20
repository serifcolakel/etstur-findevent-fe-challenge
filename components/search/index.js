import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { BsCalendarWeekFill } from "react-icons/bs";
import { AutoComplete } from "primereact/autocomplete";
import Card from "../Card";
import { Toast } from "primereact/toast";

export default function Search() {
  const [filteredEvents, setFilteredEvents] = React.useState([]);
  const [searchByName, setSearchByName] = React.useState("");
  const [searchByCategory, setSearchByCategory] = React.useState("");
  const [searchByLocation, setSearchByLocation] = React.useState("");
  const [searchByDate, setSearchByDate] = React.useState("");
  const [searchByPrice, setSearchByPrice] = React.useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const [filteredTypes, setFilteredTypes] = useState(null);
  async function getFilterEvent() {
    let data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/search?name=${searchByName}&category=${searchByCategory}&location=${searchByLocation}&date=${searchByDate}&price=${searchByPrice}`
    ).then((res) => res.json());
    console.log(data);
    showInfo();
    // setFilteredEvents(data);
  }

  const items = ["Antalya", "İstanbul", "İzmir", "Bursa", "Ankara", "Hatay"];
  const showInfo = () => {
    toast.current.show({
      severity: "info",
      summary: "Bilgilendirme",
      detail: "Veritabanına ulaşamadık.",
      life: 2000,
    });
  };
  const searchItems = (event) => {
    let query = event.query;
    let _filteredItems = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }

    setFilteredItems(_filteredItems);
  };
  const types = [
    "Konser",
    "Tiyatro",
    "Kültür",
    "Sinema",
    "Muzikal",
    "Spor",
    "Eğitim",
    "Seminer",
  ];
  const searchTypes = (event) => {
    let query = event.query;
    let _filteredTypes = [];

    for (let i = 0; i < types.length; i++) {
      let item = types[i];
      if (item.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredTypes.push(item);
      }
    }

    setFilteredTypes(_filteredTypes);
  };
  const toast = useRef(null);
  return (
    <article className="py-8 w-full xl:px-40 !grid md:!grid-cols-5 gap-4 md:px-0 px-8">
      <Toast
        ref={toast}
        className="!absolute !top-0 md:!top-8 md:!right-8 !right-0 md:!w-auto !w-[90%]"
      />
      <span className="p-float-label">
        <InputText
          id="setSearchByName"
          value={searchByName}
          className="w-full"
          onChange={(e) => setSearchByName(e.target.value)}
        />
        <label htmlFor="setSearchByName">Etkinlik Adına göre arama yapın</label>
      </span>
      <span className="p-float-label">
        <AutoComplete
          value={searchByCategory}
          suggestions={filteredTypes}
          completeMethod={searchTypes}
          dropdownMode="dropdown"
          virtualScrollerOptions={{ itemSize: 38 }}
          className="w-full"
          id="searchByCategory"
          dropdown
          onChange={(e) => setSearchByCategory(e.value)}
          aria-label="Items"
        />

        <label htmlFor="searchByCategory">
          Etkinlik Türüne göre arama yapın
        </label>
      </span>
      <span className="p-float-label">
        <AutoComplete
          value={searchByLocation}
          suggestions={filteredItems}
          completeMethod={searchItems}
          dropdownMode="dropdown"
          scrollHeight={80}
          virtualScrollerOptions={{ itemSize: 38 }}
          className="w-full"
          id="searchByLocation"
          dropdown
          onChange={(e) => setSearchByLocation(e.value)}
          aria-label="Items"
        />
        <label htmlFor="searchByLocation">
          Etkinlik Konuma göre arama yapın
        </label>
      </span>
      <span className="p-float-label relative">
        <Calendar
          id="date"
          value={searchByDate}
          onChange={(e) => setSearchByDate(e.value)}
          selectionMode="range"
          className="w-full"
          readOnlyInput
        />
        <label htmlFor="date">Etkinlik Tarihe göre arama yapın</label>
        <BsCalendarWeekFill className="absolute right-0 top-0 mt-4 text-violet-600 mr-2 text-2xl" />
      </span>
      <Button
        onClick={() => getFilterEvent()}
        label="Search"
        className="!bg-violet-600 !px-12 !py-4"
      />
      {filteredEvents.map((event) => (
        <div>
          {event.name}:{event.location.city}:{event.eventType}
        </div>
      ))}
      {filteredEvents.length > 0 && <Card data={filteredEvents} />}
    </article>
  );
}
