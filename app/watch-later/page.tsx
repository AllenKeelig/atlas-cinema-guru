import ProtectedLayout from "@/components/ProtectedLayout";
import WatchLaterClient from "./WatchLaterClient";

export default function WatchLaterPage() {
  return (
    <ProtectedLayout>
      <WatchLaterClient />
    </ProtectedLayout>
  );
}
