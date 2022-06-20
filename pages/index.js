import Head from "next/head";
import React from "react";
import Map from "../components/map/index";
import styles from "../styles/Home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "primereact/resources/themes/md-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import Search from "../components/search";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Find Event</title>
        <meta name="description" content="Generated by Find Event" />
        <link rel="icon" href="https://i.hizliresim.com/h0i09k2.png" />
      </Head>
      <main className={styles.main}>
        <Search data={data} />
        <Map data={data} />
      </main>
    </div>
  );
}
export async function getStaticProps() {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/location`
  ).then((res) => res.json());
  return {
    props: {
      data,
    },
  };
}
