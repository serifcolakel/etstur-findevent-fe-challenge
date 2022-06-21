import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { BsCalendarWeekFill } from "react-icons/bs";
import { AutoComplete } from "primereact/autocomplete";
import Card from "../Card";
import { Toast } from "primereact/toast";

export default function Search({ data }) {
  const [filteredEvents, setFilteredEvents] = React.useState([]);
  const [searchByName, setSearchByName] = React.useState("");
  const [searchByCategory, setSearchByCategory] = React.useState("");
  const [searchByLocation, setSearchByLocation] = React.useState("");
  const [searchByDate, setSearchByDate] = React.useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const [filteredTypes, setFilteredTypes] = useState(null);
  async function getFilterEvent() {
    let data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/search?name=${searchByName}&category=${searchByCategory}&location=${searchByLocation}&date=${searchByDate}`
    ).then((res) => res.json());
    showInfo();
    console.log(data);
    setFilteredEvents(data);
  }

  const showInfo = (
    severity = "info",
    summary = "Bilgilendirme",
    detail = "Veritabanına ulaşamadık."
  ) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 2000,
    });
  };

  const getParams = async (key) => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/params/${key}`
      ).then((res) => res.json());

      return res;
    } catch (error) {
      showInfo("error", "Something went wrong", "Veritabanına ulaşamadık");
    }
  };
  const searchItems = async (event) => {
    let items = await getParams("location");
    let query = event.query;
    let _filteredItems = [];
    if (items) {
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          _filteredItems.push(item);
        }
      }
      showInfo(
        "info",
        "Bilgilendirme",
        "Verileri listeliyoruz, size uygun olanı seçip devam edebilirsiniz."
      );
      setFilteredItems(_filteredItems);
    }
  };

  const searchTypes = async (event) => {
    let types = await getParams("eventType");
    let query = event.query;
    let _filteredTypes = [];
    if (types) {
      for (let i = 0; i < types.length; i++) {
        let item = types[i];
        if (item.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          _filteredTypes.push(item);
        }
      }

      setFilteredTypes(_filteredTypes);
    }
  };
  const searchName = async (event) => {
    //console.log(event.originalEvent.target.ariaLabel);
    let names = await getParams("name");
    let query = event.query;
    let _filteredTypes = [];
    if (names) {
      for (let i = 0; i < names.length; i++) {
        let name = names[i];
        if (name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          _filteredTypes.push(name);
        }
      }
      setFilteredTypes(_filteredTypes);
    }
  };
  const toast = useRef(null);
  return (
    <>
      <div className="py-8 !w-full xl:px-40 !grid md:!grid-cols-5 gap-4 md:px-0 px-8 md:w-full">
        <Toast
          ref={toast}
          className="!absolute !top-0 md:!top-8 md:!right-8 !right-0 md:!w-auto !w-[90%]"
        />

        <span className="p-float-label">
          <AutoComplete
            value={searchByName}
            suggestions={filteredTypes}
            completeMethod={searchName}
            dropdownMode="dropdown"
            virtualScrollerOptions={{ itemSize: 38 }}
            className="w-full"
            id="setSearchByName"
            dropdown
            onChange={(e) => setSearchByName(e.value)}
            aria-label="name"
          />

          <label htmlFor="setSearchByName">
            Etkinlik Adına göre arama yapın
          </label>
        </span>
        <span className="p-float-label">
          <AutoComplete
            value={searchByCategory}
            suggestions={filteredTypes}
            completeMethod={searchTypes}
            dropdownMode="dropdown"
            virtualScrollerOptions={{ itemSize: 38 }}
            className="w-full"
            id="eventType"
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
            aria-label="location"
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
          disabled={
            !searchByDate &&
            !searchByLocation &&
            !searchByName &&
            !searchByCategory
          }
          onClick={() => getFilterEvent()}
          label="Search"
          className="!bg-violet-600 !px-12 !py-4"
        />
      </div>

      {filteredEvents.length > 0 ? (
        <>
          <p className="text-center w-full py-4 text-bold text-gray-500">
            Arama sonucunda{" "}
            <span className="text-violet-600">
              {`${filteredEvents.length} adet evente`.toUpperCase()}
            </span>{" "}
            ulaştık aşağıdan event detaylarına erişebilirsiniz.
          </p>
          <Card data={filteredEvents} />
        </>
      ) : (
        <Card data={data} />
      )}
    </>
  );
}
