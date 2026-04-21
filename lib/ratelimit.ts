import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function makeRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

const redis = makeRedis();

// 10 req/min — interactive endpoints (chat → Anthropic API cost)
export const chatRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 m"), prefix: "rl:chat" })
  : null;

// 5 req/15min — form submissions (contact, leads POST)
export const formRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "rl:form" })
  : null;

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
