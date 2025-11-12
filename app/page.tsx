import ProtectedLayout from "@/components/ProtectedLayout";
import HomePage from "@/components/HomePage";

export default async function Page() {
  return (
    <ProtectedLayout>
      <HomePage />
    </ProtectedLayout>
  );
}
