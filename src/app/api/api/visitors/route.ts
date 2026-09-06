import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

const TOTAL_VISITORS_KEY = "khel:portfolio:total-visitors";
const LIVE_VIEWERS_KEY = "khel:portfolio:live-viewers";

const VISITOR_COOKIE = "khel_visitor_id";

const PRESENCE_TTL_SECONDS = 45;

type VisitorAction = "enter" | "heartbeat" | "leave";

function createVisitorId() {
  return crypto.randomUUID();
}

async function cleanupPresence() {
  const redis = getRedis();

  if (!redis) {
    return;
  }

  const cutoff =
    Math.floor(Date.now() / 1000) -
    PRESENCE_TTL_SECONDS;

  await redis.zremrangebyscore(
    LIVE_VIEWERS_KEY,
    0,
    cutoff,
  );
}

async function getLiveViewerCount() {
  const redis = getRedis();

  if (!redis) {
    return 0;
  }

  await cleanupPresence();

  return await redis.zcard(
    LIVE_VIEWERS_KEY,
  );
}

export async function GET() {
  const redis = getRedis();

  if (!redis) {
    return NextResponse.json(
      {
        configured: false,
        totalVisitors: 0,
        liveViewers: 0,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  await cleanupPresence();

  const total =
    (await redis.get<number>(
      TOTAL_VISITORS_KEY,
    )) ?? 0;

  const liveViewers =
    await redis.zcard(
      LIVE_VIEWERS_KEY,
    );

  return NextResponse.json(
    {
      configured: true,
      totalVisitors: total,
      liveViewers,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(
  request: Request,
) {
  const redis = getRedis();
  const cookieStore = await cookies();

  let body: {
    action?: VisitorAction;
  } = {};

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const action =
    body.action ?? "heartbeat";

  let visitorId =
    cookieStore.get(
      VISITOR_COOKIE,
    )?.value;

  const isNewVisitor =
    !visitorId;

  if (!visitorId) {
    visitorId = createVisitorId();
  }

  if (!redis) {
    const response =
      NextResponse.json(
        {
          configured: false,
          totalVisitors: 0,
          liveViewers: 0,
        },
        {
          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );

    if (isNewVisitor) {
      response.cookies.set(
        VISITOR_COOKIE,
        visitorId,
        {
          httpOnly: true,
          sameSite: "lax",
          secure:
            process.env.NODE_ENV ===
            "production",
          maxAge:
            60 * 60 * 24 * 30,
          path: "/",
        },
      );
    }

    return response;
  }

  const now =
    Math.floor(Date.now() / 1000);

  if (action === "enter") {
    if (isNewVisitor) {
      await redis.incr(
        TOTAL_VISITORS_KEY,
      );
    }

    await redis.zadd(
      LIVE_VIEWERS_KEY,
      {
        score: now,
        member: visitorId,
      },
    );
  }

  if (action === "heartbeat") {
    await redis.zadd(
      LIVE_VIEWERS_KEY,
      {
        score: now,
        member: visitorId,
      },
    );
  }

  if (action === "leave") {
    await redis.zrem(
      LIVE_VIEWERS_KEY,
      visitorId,
    );
  }

  await cleanupPresence();

  const total =
    (await redis.get<number>(
      TOTAL_VISITORS_KEY,
    )) ?? 0;

  const liveViewers =
    await redis.zcard(
      LIVE_VIEWERS_KEY,
    );

  const response =
    NextResponse.json(
      {
        configured: true,
        totalVisitors: total,
        liveViewers,
      },
      {
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );

  if (isNewVisitor) {
    response.cookies.set(
      VISITOR_COOKIE,
      visitorId,
      {
        httpOnly: true,
        sameSite: "lax",
        secure:
          process.env.NODE_ENV ===
          "production",
        maxAge:
          60 * 60 * 24 * 30,
        path: "/",
      },
    );
  }

  return response;
}