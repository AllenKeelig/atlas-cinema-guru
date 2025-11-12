import ProtectedLayout from "@/components/ProtectedLayout";
import FavoritesClient from "./FavoritesClient";

export default async function FavoritesPage() {
  return (
    <ProtectedLayout>
      <FavoritesClient />
    </ProtectedLayout>
  );
}
