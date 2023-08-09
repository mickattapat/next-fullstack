"use client";
import { Container, Title, Text, Divider, Space } from "@mantine/core";

type Props = {
  data: any;
};

export default function AboutContent({ data }: Props) {
  return (
    <Container size="lg">
      <Title>เกี่ยวกับเรา</Title>
      <Divider mt={2} />
      <Text fz={"sm"}>{JSON.stringify(data)}</Text>
      <Space h={"md"} />
    </Container>
  );
}
