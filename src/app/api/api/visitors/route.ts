import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

/* ============================================================================
   REDIS KEYS
   ============================================================================ */

const TOTAL_VISITORS_KEY =
  "khel:portfolio:total-visitors";

const LIVE_VIEWERS_KEY =
  "khel:portfolio:live-viewers";

/* ============================================================================
   COOKIE
   ============================================================================ */

const VISITOR_COOKIE =
  "khel_visitor_id";

/*
 * A browser is treated as the same visitor for one year.
 *
 * This is not a perfect human-identification system:
 * clearing cookies, using another browser, private browsing,
 * or another device can create another visitor ID.
 */
const VISITOR_COOKIE_MAX_AGE =
  60 * 60 * 24 * 365;

/* ============================================================================
   LIVE PRESENCE
   ============================================================================ */

/*
 * Visitor sends a heartbeat every 20 seconds.
 *
 * If no heartbeat arrives for 60 seconds,
 * that visitor is considered inactive.
 */
const PRESENCE_TTL_SECONDS = 60;

type VisitorAction =
  | "enter"
  | "heartbeat"
  | "leave";

/* ============================================================================
   HELPERS
   ============================================================================ */

function createVisitorId() {
  return crypto.randomUUID();
}

async function getOrCreateVisitorId() {
  const cookieStore = await cookies();

  let visitorId =
    cookieStore.get(
      VISITOR_COOKIE,
    )?.value;

  const isNewVisitor =
    !visitorId;

  if (!visitorId) {
    visitorId =
      createVisitorId();
  }

  return {
    visitorId,
    isNewVisitor,
  };
}

/* ============================================================================
   CLEANUP OLD PRESENCE
   ============================================================================ */

async function cleanupPresence() {
  const redis = getRedis();

  if (!redis) {
    return;
  }

  const now =
    Math.floor(
      Date.now() / 1000,
    );

  const cutoff =
    now -
    PRESENCE_TTL_SECONDS;

  await redis.zremrangebyscore(
    LIVE_VIEWERS_KEY,
    0,
    cutoff,
  );
}

/* ============================================================================
   GET CURRENT COUNTS
   ============================================================================ */

async function getCurrentCounts() {
  const redis = getRedis();

  if (!redis) {
    return {
      configured: false,
      totalVisitors: 0,
      liveViewers: 0,
    };
  }

  await cleanupPresence();

  const [
    totalVisitors,
    liveViewers,
  ] = await Promise.all([
    redis.get<number>(
      TOTAL_VISITORS_KEY,
    ),

    redis.zcard(
      LIVE_VIEWERS_KEY,
    ),
  ]);

  return {
    configured: true,

    totalVisitors:
      Number(totalVisitors) || 0,

    liveViewers:
      Number(liveViewers) || 0,
  };
}

/* ============================================================================
   GET
   ============================================================================ */

export async function GET() {
  try {
    const counts =
      await getCurrentCounts();

    return NextResponse.json(
      counts,
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",

          Pragma: "no-cache",

          Expires: "0",
        },
      },
    );
  } catch (error) {
    console.error(
      "Visitor GET error:",
      error,
    );

    return NextResponse.json(
      {
        configured: false,
        totalVisitors: 0,
        liveViewers: 0,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }
}

/* ============================================================================
   POST
   ============================================================================ */

export async function POST(
  request: Request,
) {
  try {
    const redis = getRedis();

    const {
      visitorId,
      isNewVisitor,
    } =
      await getOrCreateVisitorId();

    let body: {
      action?: VisitorAction;
    } = {};

    try {
      body =
        (await request.json()) as {
          action?: VisitorAction;
        };
    } catch {
      body = {};
    }

    const action =
      body.action ??
      "heartbeat";

    /* ========================================================================
       REDIS NOT CONFIGURED
       ======================================================================== */

    if (!redis) {
      const response =
        NextResponse.json(
          {
            configured: false,
            totalVisitors: 0,
            liveViewers: 0,
          },
          {
            status: 200,

            headers: {
              "Cache-Control":
                "no-store",
            },
          },
        );

      /*
       * Still create the cookie locally so that
       * development behaviour resembles production.
       */
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
              VISITOR_COOKIE_MAX_AGE,

            path: "/",
          },
        );
      }

      return response;
    }

    /* ========================================================================
       CURRENT TIMESTAMP
       ======================================================================== */

    const now =
      Math.floor(
        Date.now() / 1000,
      );

    /* ========================================================================
       ENTER
       ======================================================================== */

    if (action === "enter") {
      /*
       * Count a new browser visitor once.
       */
      if (isNewVisitor) {
        await redis.incr(
          TOTAL_VISITORS_KEY,
        );
      }

      /*
       * Mark visitor as currently active.
       */
      await redis.zadd(
        LIVE_VIEWERS_KEY,
        {
          score: now,
          member: visitorId,
        },
      );
    }

    /* ========================================================================
       HEARTBEAT
       ======================================================================== */

    if (action === "heartbeat") {
      /*
       * Refresh current visitor's presence.
       */
      await redis.zadd(
        LIVE_VIEWERS_KEY,
        {
          score: now,
          member: visitorId,
        },
      );

      /*
       * This protects against a browser that somehow
       * sends a heartbeat before its first "enter"
       * request has completed.
       */
      if (isNewVisitor) {
        await redis.incr(
          TOTAL_VISITORS_KEY,
        );
      }
    }

    /* ========================================================================
       LEAVE
       ======================================================================== */

    if (action === "leave") {
      /*
       * Remove immediately when possible.
       *
       * If the browser disappears without sending leave,
       * cleanupPresence() will remove it after 60 seconds.
       */
      await redis.zrem(
        LIVE_VIEWERS_KEY,
        visitorId,
      );
    }

    /* ========================================================================
       CLEANUP
       ======================================================================== */

    await cleanupPresence();

    /* ========================================================================
       COUNTS
       ======================================================================== */

    const counts =
      await getCurrentCounts();

    /* ========================================================================
       RESPONSE
       ======================================================================== */

    const response =
      NextResponse.json(
        counts,
        {
          status: 200,

          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );

    /* ========================================================================
       COOKIE
       ======================================================================== */

    if (
      isNewVisitor &&
      action !== "leave"
    ) {
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
            VISITOR_COOKIE_MAX_AGE,

          path: "/",
        },
      );
    }

    return response;
  } catch (error) {
    console.error(
      "Visitor POST error:",
      error,
    );

    return NextResponse.json(
      {
        configured: false,
        totalVisitors: 0,
        liveViewers: 0,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }
}