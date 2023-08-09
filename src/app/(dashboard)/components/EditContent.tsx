"use client";

import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { type } from "os";
import { useEffect } from "react";
import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required("please input your title"),
});

type Props = {
  id: number;
};

interface IUpdate {
  title: string;
}
const baseApi = process.env.NEXT_PUBLIC_BASE_API as string;

export default function EditContent({ id }: Props) {
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      title: "",
    },
  });
  const createNewsType = async (values: IUpdate) => {
    const url = `${baseApi}/newstype/${id}`;
    const info = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(values),
    });
    if (info.ok) {
      alert("updated success !");
    }
  };
  const getNewsType = async () => {
    const url = `${baseApi}/newstype/${id}`;
    const info = await fetch(url);
    if (info.ok) {
      const json = await info.json();
      const data = json.data as IUpdate;
      form.setValues({ title: data.title });
    }
  };

  useEffect(() => {
    console.log(111);
    getNewsType();
  }, []);

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => createNewsType(values))}>
        <TextInput
          withAsterisk
          label="title"
          placeholder="title"
          {...form.getInputProps("title")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}
