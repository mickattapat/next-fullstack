import { findAllnewsType } from "@/services/newtype.service";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "news",
  description: "news system",
};

type Props = {};

export default async function NewsTypePage({}: Props) {
  const data = await findAllnewsType();

  return <>{JSON.stringify(data)}</>;
}
