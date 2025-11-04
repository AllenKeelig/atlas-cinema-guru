"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already logged in, redirect to home
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#00003c] text-white">
      <h1 className="text-3xl mb-6">Welcome to Cinema Guru</h1>
      <button
        onClick={() => signIn("github")}
        className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
