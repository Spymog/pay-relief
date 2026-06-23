"use client";

import { useUser } from "@/context/UserProvider";

export default function ProfileCard() {
  const currentUser = useUser();

  return (
    <div>
      {currentUser ? <h1>{currentUser?.email}</h1> : <p>No current user</p>}
    </div>
  );
}
