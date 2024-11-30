"use client"

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const SyncUserWithConvex = () => {
  const { user } = useUser();
  const updateUser = useMutation(api.users.updateUser)

  // Sync user with Convex
  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await updateUser({
          clerkId: user.id,
          name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
          imageUrl: user.imageUrl ?? '',
          email: user.emailAddresses[0]?.emailAddress ?? '',
        })
      } catch (error) {
        console.error("Error syncing user: ", error)
      }
    };
    syncUser();
  }, [user, updateUser])



  return null;
}

export default SyncUserWithConvex