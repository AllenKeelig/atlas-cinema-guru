import ProtectedLayout from "@/components/ProtectedLayout";

export default async function Page() {
  return (
    <ProtectedLayout>
      <div className="flex items-center justify-center h-screen">
        Hello Cinema Guru
      </div>
    </ProtectedLayout>
  );
}
