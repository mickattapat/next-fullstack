"use client";

import { AppHero } from "./AppHero";
import { AppFeature } from "./AppFeature";

export default function HomeContent() {
  return (
    <>
      <AppHero />
      <AppFeature title="บริการของเรา" description="รายละเอียดสินค้า" />
    </>
  );
}
