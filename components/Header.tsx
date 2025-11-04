import { signOut } from "next-auth/react";

export function Header({ email }: { email: string }) {
  return (
    <header className="flex justify-between items-center p-4 bg-[#000050] text-white">
      <h1 className="font-bold text-xl">Cinema Guru</h1>
      <div className="flex items-center gap-4">
        <span>{email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-3 py-1 border rounded hover:bg-white hover:text-black transition"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
