"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

const SyncUserWithConvex = () => {
  const { user } = useUser();
  // update user \

  // const updatedUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await updateUser({
          userId: user?.id,
          name: user?.fullName.trim() ?? "",
          email: user?.emailAddresses[0]?.emailAddress ?? "",
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };
    syncUser();
  }, [user, updatedUser]);

  return <div>SyncUserWithConvex</div>;
};

export default SyncUserWithConvex;
