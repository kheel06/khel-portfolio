"use client";

import {
  Eye,
  Users,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

/* ============================================================================
   TYPES
   ============================================================================ */

type VisitorData = {
  totalVisitors: number;
  liveViewers: number;
};

/* ============================================================================
   STATUS DOT
   ============================================================================ */

function StatusDot() {
  return (
    <span
      className="relative inline-flex h-2 w-2 shrink-0"
      aria-hidden="true"
    >
      <span
        className="
          absolute
          inset-0
          animate-ping
          rounded-full
          bg-emerald-400/40
        "
      />

      <span
        className="
          relative
          block
          h-2
          w-2
          rounded-full
          bg-emerald-400

          shadow-[0_0_12px_rgba(52,211,153,0.9)]
        "
      />
    </span>
  );
}

/* ============================================================================
   VISITOR STATS
   ============================================================================ */

export function VisitorStats() {
  const [data, setData] =
    useState<VisitorData>({
      totalVisitors: 0,
      liveViewers: 0,
    });

  const [connected, setConnected] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    /* ========================================================================
       GET CURRENT COUNTS
       ======================================================================== */

    async function fetchStats() {
      try {
        const response =
          await fetch(
            "/api/api/visitors",
            {
              method: "GET",

              cache: "no-store",

              headers: {
                "Cache-Control":
                  "no-cache",
              },
            },
          );

        if (!response.ok) {
          throw new Error(
            "Visitor stats unavailable",
          );
        }

        const result =
          (await response.json()) as VisitorData;

        if (cancelled) {
          return;
        }

        setData({
          totalVisitors:
            Number(
              result.totalVisitors,
            ) || 0,

          liveViewers:
            Number(
              result.liveViewers,
            ) || 0,
        });

        setConnected(true);
      } catch {
        if (!cancelled) {
          setConnected(false);
        }
      }
    }

    /* ========================================================================
       SEND PRESENCE
       ======================================================================== */

    async function sendPresence(
      action:
        | "enter"
        | "heartbeat"
        | "leave",
    ) {
      try {
        const response =
          await fetch(
            "/api/api/visitors",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                action,
              }),

              /*
               * Helps the browser finish the request
               * during page shutdown where supported.
               */
              keepalive:
                action === "leave",

              cache: "no-store",
            },
          );

        if (!response.ok) {
          throw new Error(
            "Presence request failed",
          );
        }

        /*
         * Leave requests don't need to update the
         * visible UI because the page is disappearing.
         */
        if (action === "leave") {
          return;
        }

        const result =
          (await response.json()) as VisitorData;

        if (cancelled) {
          return;
        }

        setData({
          totalVisitors:
            Number(
              result.totalVisitors,
            ) || 0,

          liveViewers:
            Number(
              result.liveViewers,
            ) || 0,
        });

        setConnected(true);
      } catch {
        if (!cancelled) {
          setConnected(false);
        }
      }
    }

    /* ========================================================================
       ENTER
       ======================================================================== */

    void sendPresence("enter");

    /* ========================================================================
       INITIAL FETCH
       ======================================================================== */

    void fetchStats();

    /* ========================================================================
       HEARTBEAT
       ======================================================================== */

    const heartbeatInterval =
      window.setInterval(
        () => {
          /*
           * Do not keep hidden tabs in the live
           * viewer count forever.
           */
          if (
            document.visibilityState ===
            "visible"
          ) {
            void sendPresence(
              "heartbeat",
            );
          }
        },
        20_000,
      );

    /* ========================================================================
       LIVE COUNT REFRESH
       ======================================================================== */

    /*
     * This is what makes the number feel realtime.
     *
     * Heartbeat = keep OUR visitor alive.
     * Polling = see OTHER visitors arrive/leave.
     */
    const pollingInterval =
      window.setInterval(
        () => {
          if (
            document.visibilityState ===
            "visible"
          ) {
            void fetchStats();
          }
        },
        4_000,
      );

    /* ========================================================================
       TAB VISIBILITY
       ======================================================================== */

    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          void sendPresence(
            "heartbeat",
          );

          void fetchStats();
        }
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    /* ========================================================================
       PAGE LEAVE
       ======================================================================== */

    const handlePageHide =
      () => {
        /*
         * Do not rely on this as the only way
         * to remove the visitor.
         *
         * Redis expiration is the fallback.
         */
        void sendPresence("leave");
      };

    window.addEventListener(
      "pagehide",
      handlePageHide,
    );

    /* ========================================================================
       CLEANUP
       ======================================================================== */

    return () => {
      cancelled = true;

      window.clearInterval(
        heartbeatInterval,
      );

      window.clearInterval(
        pollingInterval,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      window.removeEventListener(
        "pagehide",
        handlePageHide,
      );
    };
  }, []);

  return (
    <article
      data-hero-stats
      aria-label="Portfolio visitor statistics"
      className="
        relative
        w-full
        overflow-hidden
        rounded-[1.2rem]

        border
        border-cyan-500/20

        bg-white/90

        px-4
        py-4

        shadow-[0_18px_55px_rgba(15,23,42,0.08)]

        backdrop-blur-xl

        dark:border-cyan-400/20
        dark:bg-[#07111e]/92
        dark:shadow-[0_18px_55px_rgba(0,0,0,0.30)]
      "
    >
      {/* TOP STATUS */}

      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center gap-2">
          <StatusDot />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]

              text-slate-400

              dark:text-white/35
            "
          >
            Live visitor activity
          </span>
        </div>

        <span
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.12em]

            text-slate-300

            dark:text-white/20
          "
        >
          {connected
            ? "Connected"
            : "Reconnecting"}
        </span>
      </div>

      {/* STATS */}

      <div
        className="
          grid
          grid-cols-2

          divide-x
          divide-slate-200

          dark:divide-white/[0.08]
        "
      >
        {/* VIEWING NOW */}

        <div className="pr-4">
          <div className="flex items-center gap-2">
            <StatusDot />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]

                text-slate-400

                dark:text-white/35
              "
            >
              Viewing now
            </span>
          </div>

          <div
            className="
              mt-2
              flex
              items-end
              gap-2
            "
          >
            <span
              className="
                tabular-nums

                text-2xl
                font-semibold
                tracking-tight

                text-slate-950

                dark:text-white
              "
            >
              {data.liveViewers}
            </span>

            <Eye
              className="
                mb-1
                h-3.5
                w-3.5

                text-cyan-500/70

                dark:text-cyan-300/60
              "
            />
          </div>

          <p
            className="
              mt-1

              text-[8px]

              text-slate-400

              dark:text-white/25
            "
          >
            Active visitors
          </p>
        </div>

        {/* TOTAL VISITORS */}

        <div className="pl-4">
          <div className="flex items-center gap-2">
            <Users
              className="
                h-3
                w-3

                text-cyan-500/70

                dark:text-cyan-300/60
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]

                text-slate-400

                dark:text-white/35
              "
            >
              Total visitors
            </span>
          </div>

          <div
            className="
              mt-2

              tabular-nums

              text-2xl
              font-semibold
              tracking-tight

              text-slate-950

              dark:text-white
            "
          >
            {data.totalVisitors.toLocaleString()}
          </div>

          <p
            className="
              mt-1

              text-[8px]

              text-slate-400

              dark:text-white/25
            "
          >
            Unique browsers
          </p>
        </div>
      </div>
    </article>
  );
}

export default VisitorStats;