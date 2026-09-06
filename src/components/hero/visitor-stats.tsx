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
  configured?: boolean;
  totalVisitors: number;
  liveViewers: number;
};

/* ============================================================================
   STATUS DOT
   ============================================================================ */

function StatusDot() {
  return (
    <span
      className="
        relative
        inline-flex
        h-2
        w-2
        shrink-0
      "
      aria-hidden="true"
    >
      <span
        className="
          absolute
          inset-0
          rounded-full
          bg-emerald-400/30
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

          shadow-[0_0_10px_rgba(52,211,153,0.75)]
        "
      />
    </span>
  );
}

/* ============================================================================
   VISITOR STATS
   ============================================================================ */

export default function VisitorStats() {
  const [data, setData] =
    useState<VisitorData>({
      configured: false,
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
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to fetch visitor stats"
          );
        }

        const result =
          (await response.json()) as VisitorData;

        if (cancelled) {
          return;
        }

        setData({
          configured:
            Boolean(
              result.configured
            ),

          totalVisitors:
            Number(
              result.totalVisitors
            ) || 0,

          liveViewers:
            Number(
              result.liveViewers
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
        | "leave"
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

              cache: "no-store",

              keepalive:
                action ===
                "leave",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to update visitor presence"
          );
        }

        /*
         * A leave request happens while
         * the page is disappearing.
         */
        if (
          action ===
          "leave"
        ) {
          return;
        }

        const result =
          (await response.json()) as VisitorData;

        if (cancelled) {
          return;
        }

        setData({
          configured:
            Boolean(
              result.configured
            ),

          totalVisitors:
            Number(
              result.totalVisitors
            ) || 0,

          liveViewers:
            Number(
              result.liveViewers
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
       REGISTER CURRENT VISITOR
    ======================================================================== */

    void sendPresence("enter");

    /* ========================================================================
       INITIAL DATA
    ======================================================================== */

    void fetchStats();

    /* ========================================================================
       HEARTBEAT
       
       Every 20 seconds we tell Redis:
       
       "This browser is still active."
    ======================================================================== */

    const heartbeatInterval =
      window.setInterval(
        () => {
          if (
            document.visibilityState ===
            "visible"
          ) {
            void sendPresence(
              "heartbeat"
            );
          }
        },
        20_000
      );

    /* ========================================================================
       LIVE COUNT POLLING

       Every 4 seconds we ask:
       
       "How many visitors are active right now?"
    ======================================================================== */

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
        4_000
      );

    /* ========================================================================
       VISIBILITY
    ======================================================================== */

    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          void sendPresence(
            "heartbeat"
          );

          void fetchStats();
        }
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    /* ========================================================================
       PAGE LEAVE
    ======================================================================== */

    const handlePageHide =
      () => {
        void sendPresence(
          "leave"
        );
      };

    window.addEventListener(
      "pagehide",
      handlePageHide
    );

    /* ========================================================================
       CLEANUP
    ======================================================================== */

    return () => {
      cancelled = true;

      window.clearInterval(
        heartbeatInterval
      );

      window.clearInterval(
        pollingInterval
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "pagehide",
        handlePageHide
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

        shadow-[0_18px_55px_rgba(15,23,42,0.07)]

        backdrop-blur-xl

        dark:border-cyan-400/20
        dark:bg-[#07111e]/94
        dark:shadow-[0_18px_55px_rgba(0,0,0,0.28)]
      "
    >
      {/* ======================================================================
          STATUS HEADER
      ====================================================================== */}

      <div
        className="
          mb-3

          flex
          items-center
          justify-between

          gap-3
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-2
          "
        >
          <StatusDot />

          <span
            className="
              truncate

              text-[8px]

              font-semibold

              uppercase

              tracking-[0.15em]

              text-slate-400

              dark:text-white/35
            "
          >
            Live visitor activity
          </span>
        </div>

        <span
          className="
            shrink-0

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

      {/* ======================================================================
          STATS
      ====================================================================== */}

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
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
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
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
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