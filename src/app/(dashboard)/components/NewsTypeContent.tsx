"use client";

import { Button, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

interface INewstype {
  id: number;
  title: string;
  createdAt: string;
}
const baseApi = process.env.NEXT_PUBLIC_BASE_API as string;

export default function NewsTypeContent({}: Props) {
  const [nt, setNT] = useState<INewstype[]>([]);
  const router = useRouter();
  const getNewsType = async () => {
    const url = `${baseApi}/newstype`;
    const data = await fetch(url);
    if (data.ok) {
      const json = await data.json();
      setNT(json.data);
    }
  };

  const deleteNewsType = async (id: number) => {
    const url = `${baseApi}/newstype/${id}`;
    const info = await fetch(url, {
      method: "DELETE",
    });
    if (info.ok) {
      getNewsType();
    }
  };

  useEffect(() => {
    getNewsType();
  }, []);

  return (
    <>
      <Link href="/dashboard/newstype/create">Add NewsType</Link>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>News</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {nt &&
            nt.map((item: INewstype) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.createdAt}</td>
                <td>
                  <Button
                    rightIcon={<IconPencil />}
                    variant="white"
                    color="green"
                    onClick={() => router.push(`newstype/${item.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    rightIcon={<IconTrash />}
                    variant="white"
                    color="red"
                    onClick={() => {
                      const isConfirm = window.confirm("your want to delete");
                      if (isConfirm) {
                        deleteNewsType(item.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
