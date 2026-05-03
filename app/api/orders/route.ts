import { NextRequest, NextResponse } from "next/server";

import { recordOrder } from "@/lib/server/orders";
import { ServiceMode } from "@/types";

export const dynamic = "force-dynamic";

function normalizeMode(value: unknown): ServiceMode {
  return value === "restaurant" ? "restaurant" : "hotel";
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body?.requestId || !body?.itemName) {
    return NextResponse.json(
      { error: "requestId and itemName are required." },
      { status: 400 }
    );
  }

  const result = await recordOrder({
    requestId: String(body.requestId),
    itemId: body.itemId ? String(body.itemId) : null,
    itemName: String(body.itemName),
    mode: normalizeMode(body.mode),
    roomId: body.roomId ? String(body.roomId) : null,
    tableId: body.tableId ? String(body.tableId) : null,
    guestNote: body.guestNote ? String(body.guestNote) : null
  });

  return NextResponse.json({
    ok: true,
    stored: Boolean(result)
  });
}
