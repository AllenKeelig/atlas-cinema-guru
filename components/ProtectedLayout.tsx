import { requireAuth } from "@/lib/session";
import { Header } from "./Header";
import Sidebar from "./Sidebar";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { session } = await requireAuth();

  return (
    <div className="flex flex-col h-screen bg-[#00003c] text-white">
      <Header email={session.user?.email ?? ""} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
