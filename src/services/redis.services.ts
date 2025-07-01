import { createClient } from "redis";

const redis = createClient({ url: "redis://localhost:6379" });

redis.on("connect", () => console.log("🔗 Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));

export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}

export async function pushToQueue(queue: string, payload: object) {
  await redis.lPush(queue, JSON.stringify(payload));
}

export async function popFromQueue(queue: string): Promise<any | null> {
  const raw = await redis.rPop(queue);
  return raw ? JSON.parse(raw) : null;
}

export async function setStatus(key: string, value: string) {
  await redis.set(key, value);
}

export async function getStatus(key: string): Promise<string | null> {
  return redis.get(key);
}
