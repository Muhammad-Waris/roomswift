import { Db, MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var roomswiftMongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getMongoDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!global.roomswiftMongoClientPromise) {
    const client = new MongoClient(uri);
    global.roomswiftMongoClientPromise = client.connect();
  }

  const client = await global.roomswiftMongoClientPromise;
  return client.db(process.env.MONGODB_DB ?? "roomswift");
}
