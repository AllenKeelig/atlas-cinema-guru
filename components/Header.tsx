"use client";

import { signOut } from "next-auth/react";

export function Header({ email }: { email: string }) {
  return (
    <header className="flex justify-between items-center p-4 bg-teal-400 text-[#00003c] shadow-md">
      <h1 className="font-bold text-xl">Cinema Guru</h1>
      <div className="flex items-center gap-4">
        <span>{email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-3 py-1 border border-[#00003c] rounded hover:bg-[#00003c] hover:text-white transition"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
