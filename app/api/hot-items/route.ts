import { NextRequest, NextResponse } from "next/server";

import { getHotItems } from "@/lib/server/orders";
import { ServiceMode } from "@/types";

export const dynamic = "force-dynamic";

function normalizeLimit(value: string | null) {
  const parsed = Number(value ?? "10");
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 5), 10) : 10;
}

function normalizeMode(value: string | null): ServiceMode | undefined {
  return value === "hotel" || value === "restaurant" ? value : undefined;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const items = await getHotItems({
    limit: normalizeLimit(searchParams.get("limit")),
    mode: normalizeMode(searchParams.get("mode"))
  });

  return NextResponse.json({ items });
}
