"use client";

import { User } from "@supabase/supabase-js";

type EmailPasswordProps = {
  user: User | null;
};

export default function EmailPassword({ user }: EmailPasswordProps) {
  return (
    <div>
      <h1>EmailPassword</h1>
    </div>
  );
}
