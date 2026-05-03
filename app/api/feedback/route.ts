import { NextRequest, NextResponse } from "next/server";

import { createFeedback, getFeedbackSummary } from "@/lib/server/feedback";
import { isMongoConfigured } from "@/lib/mongodb";
import { ServiceMode } from "@/types";

export const dynamic = "force-dynamic";

function normalizeRating(value: unknown) {
  const rating = Number(value);
  return Number.isFinite(rating) ? Math.min(Math.max(Math.round(rating), 1), 5) : 0;
}

function normalizeMode(value: unknown): ServiceMode {
  return value === "restaurant" ? "restaurant" : "hotel";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "5");
  const summary = await getFeedbackSummary(Number.isFinite(limit) ? limit : 5);

  return NextResponse.json({
    ...summary,
    configured: isMongoConfigured()
  });
}

export async function POST(request: NextRequest) {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MONGODB_URI is not configured." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const rating = normalizeRating(body?.rating);

  if (!body?.requestId || !body?.itemName || rating === 0) {
    return NextResponse.json(
      { error: "requestId, itemName, and a 1-5 rating are required." },
      { status: 400 }
    );
  }

  const feedback = await createFeedback({
    requestId: String(body.requestId),
    itemName: String(body.itemName),
    rating,
    comment: body.comment ? String(body.comment).slice(0, 1000) : null,
    mode: normalizeMode(body.mode),
    roomId: body.roomId ? String(body.roomId) : null,
    tableId: body.tableId ? String(body.tableId) : null
  });

  return NextResponse.json({ feedback }, { status: 201 });
}
