import EditContent from "@/app/(dashboard)/components/EditContent";
import React from "react";

export default function EditPage({ params }: { params: { id: string } }) {
  const id = params.id;
  return <EditContent id={+id} />;
}
