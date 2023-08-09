"use client";

import React, { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Group,
  useMantineTheme,
  MediaQuery,
  Burger,
  Title,
  Button,
} from "@mantine/core";
import { MainLinks } from "./_mainLinks";
import { User } from "./_user";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useAuthStore } from "@/lib/zustand/store";

export default function DLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { userProfile, setUserProfile } = useAuthStore((state) => state);

  useEffect(() => {
    const ses = session;
    setUserProfile({
      name: ses?.user?.name || "",
      email: ses?.user?.email || "",
    });
  }, []);

  return (
    <AppShell
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User user={userProfile} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Title order={3}>ระบบจัดการข่าวสาร</Title>

            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                // mr="xl"
              />
            </MediaQuery>

            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Group>
                <Button
                  variant="default"
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                  }}
                >
                  ออกจากระบบ
                </Button>
              </Group>
            </MediaQuery>
          </Group>
        </Header>
      }
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
}
