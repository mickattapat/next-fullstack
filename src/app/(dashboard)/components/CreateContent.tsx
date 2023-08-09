"use client";

import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required("please input your title"),
});

interface ICreate {
  title: string;
}
const baseApi = process.env.NEXT_PUBLIC_BASE_API as string;

export default function CreateNewsType() {
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      title: "",
    },
  });

  const createNewsType = async (values: ICreate) => {
    const url = `${baseApi}/newstype`;
    const info = await fetch(url, {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (info.ok) {
      alert("created success !");
    }
  };

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
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
