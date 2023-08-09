import React from "react";
import AboutContent from "../components/AboutContent";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "about",
  description: "information system",
};

const getData = async () => {
  // const res = await fetch("https://api.codingthailand.com/api/version");
  // const res = await fetch("https://api.codingthailand.com/api/version", {
  //   next: {
  //     revalidate: 10, // fetch new data always 10second
  //   },
  // });
  const res = await fetch("https://api.codingthailand.com/api/version", {
    cache: "no-store",
  });

  if (res.status == 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error("can't get data");
  }
  return res.json();
};

type Props = {};

export default async function AboutPage({}: Props) {
  const data = await getData();

  return (
    <>
      <AboutContent data={data} />
    </>
  );
}
