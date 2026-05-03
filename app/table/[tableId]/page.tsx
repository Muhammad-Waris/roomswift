import { RoomPageClient } from "@/components/room-page-client";

export default async function TablePage({
  params
}: {
  params: Promise<{ tableId: string }>;
}) {
  const { tableId } = await params;
  return <RoomPageClient mode="restaurant" tableId={tableId} />;
}
