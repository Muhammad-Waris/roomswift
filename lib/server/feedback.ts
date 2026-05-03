import { ObjectId } from "mongodb";

import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";
import { FeedbackEntry, FeedbackSummary, ServiceMode } from "@/types";

const FEEDBACK_COLLECTION = "feedback";

export interface CreateFeedbackInput {
  requestId: string;
  itemName: string;
  rating: number;
  comment?: string | null;
  mode: ServiceMode;
  roomId?: string | null;
  tableId?: string | null;
}

interface FeedbackDocument extends Omit<FeedbackEntry, "id" | "createdAt"> {
  _id: ObjectId;
  createdAt: Date;
}

function mapFeedback(document: FeedbackDocument): FeedbackEntry {
  return {
    id: document._id.toString(),
    requestId: document.requestId,
    itemName: document.itemName,
    rating: document.rating,
    comment: document.comment ?? null,
    mode: document.mode,
    roomId: document.roomId ?? null,
    tableId: document.tableId ?? null,
    createdAt: document.createdAt.toISOString()
  };
}

export async function createFeedback(input: CreateFeedbackInput): Promise<FeedbackEntry> {
  if (!isMongoConfigured()) {
    throw new Error("MONGODB_URI is not configured.");
  }

  const db = await getMongoDb();
  const createdAt = new Date();
  const document = {
    requestId: input.requestId,
    itemName: input.itemName,
    rating: input.rating,
    comment: input.comment?.trim() || null,
    mode: input.mode,
    roomId: input.roomId ?? null,
    tableId: input.tableId ?? null,
    createdAt
  };

  const result = await db.collection(FEEDBACK_COLLECTION).insertOne(document);

  return mapFeedback({
    _id: result.insertedId,
    ...document
  });
}

export async function getFeedbackSummary(limit = 5): Promise<FeedbackSummary> {
  if (!isMongoConfigured()) {
    return {
      averageRating: 0,
      totalFeedback: 0,
      latestFeedback: []
    };
  }

  const db = await getMongoDb();
  const collection = db.collection<FeedbackDocument>(FEEDBACK_COLLECTION);

  const [summary] = await collection
    .aggregate<{ averageRating: number; totalFeedback: number }>([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalFeedback: { $sum: 1 }
        }
      }
    ])
    .toArray();

  const latestFeedback = await collection
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return {
    averageRating: summary?.averageRating ? Number(summary.averageRating.toFixed(1)) : 0,
    totalFeedback: summary?.totalFeedback ?? 0,
    latestFeedback: latestFeedback.map(mapFeedback)
  };
}
