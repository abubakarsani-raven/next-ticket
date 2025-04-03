"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";

const SyncUserWithConvex = () => {
  const { user } = useUser();
  // update user \

  const updatedUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await updatedUser({
          userId: user?.id,
          name: user?.fullName?.trim() ?? "",
          email: user?.emailAddresses[0]?.emailAddress ?? "",
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };
    syncUser();
  }, [user, updatedUser]);

  return null;
};

export default SyncUserWithConvex;
