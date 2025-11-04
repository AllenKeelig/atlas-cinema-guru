import { requireAuth } from "@/lib/session";

export default async function Page() {
  const { session } = await requireAuth();
  return (
    <div className="flex items-center justify-center h-screen">
      Hello Cinema Guru
    </div>
  );
}
