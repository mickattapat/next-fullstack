"use client";

import { IUser } from "@/app/model/user.model";
import { useAuthStore } from "@/lib/zustand/store";
import { Session } from "next-auth";
import React from "react";

type Props = {};

export default function DashboardContent({}: Props) {
  const { userProfile, setUserProfile } = useAuthStore((state) => state);
  const changeUserProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const user: IUser = { ...userProfile! };
    user.name = event.target.value as string;
    setUserProfile({ ...user });
  };

  return (
    <div>
      <input
        type="text"
        value={userProfile?.name || ""}
        onChange={changeUserProfile}
      />
    </div>
  );
}
