"use client";

import {
  Check,
  Eye,
  Loader2,
  Users,
  WifiOff,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type VisitorData = {
  configured?: boolean;
  totalVisitors: number;
  liveViewers: number;
};

type ConnectionState =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "offline";

const VISITOR_API = "/api/api/visitors";

const EMPTY_DATA: VisitorData = {
  configured: false,
  totalVisitors: 0,
  liveViewers: 0,
};

function StatusIndicator({
  state,
}: {
  state: ConnectionState;
}) {
  const isConnected = state === "connected";
  const isConnecting =
    state === "connecting" || state === "reconnecting";

  return (
    <span
      className="relative flex h-2 w-2 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      {isConnected && (
        <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/30 motion-reduce:animate-none" />
      )}

      <span
        className={[
          "relative block h-1.5 w-1.5 rounded-full transition-colors duration-300",
          isConnected
            ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            : isConnecting
              ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.65)]"
              : "bg-slate-400",
        ].join(" ")}
      />
    </span>
  );
}

function ConnectionLabel({
  state,
}: {
  state: ConnectionState;
}) {
  const labels: Record<ConnectionState, string> = {
    connecting: "Connecting",
    connected: "Live",
    reconnecting: "Reconnecting",
    offline: "Offline",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "rounded-full border px-2 py-1",
        "text-[8px] font-semibold uppercase tracking-[0.14em]",
        "transition-all duration-300",
        state === "connected"
          ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-600 dark:text-emerald-300"
          : state === "offline"
            ? "border-slate-300 bg-slate-100 text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/35"
            : "border-amber-400/20 bg-amber-400/[0.06] text-amber-600 dark:text-amber-300",
      ].join(" ")}
    >
      <StatusIndicator state={state} />
      {labels[state]}
    </span>
  );
}

function StatIcon({
  type,
}: {
  type: "viewers" | "visitors";
}) {
  const Icon = type === "viewers" ? Eye : Users;

  return (
    <span
      className="
        flex h-8 w-8 shrink-0 items-center justify-center
        rounded-lg
        border border-cyan-500/10
        bg-cyan-500/[0.05]
        text-cyan-600
        dark:border-cyan-300/10
        dark:bg-cyan-300/[0.05]
        dark:text-cyan-300
      "
      aria-hidden="true"
    >
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}

function StatBlock({
  label,
  value,
  description,
  type,
}: {
  label: string;
  value: number;
  description: string;
  type: "viewers" | "visitors";
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2.5">
        <StatIcon type={type} />

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
          {label}
        </span>
      </div>

      <div
        className="
          mt-3
          flex
          items-baseline
          gap-2
        "
      >
        <span
          className="
            tabular-nums
            text-[1.7rem]
            font-semibold
            leading-none
            tracking-[-0.04em]
            text-slate-950
            dark:text-white
          "
          aria-label={`${value} ${label.toLowerCase()}`}
        >
          {value.toLocaleString()}
        </span>

        {type === "viewers" && (
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-emerald-400
              shadow-[0_0_8px_rgba(52,211,153,0.7)]
            "
            aria-hidden="true"
          />
        )}
      </div>

      <p
        className="
          mt-1.5
          text-[8px]
          leading-relaxed
          text-slate-400
          dark:text-white/25
        "
      >
        {description}
      </p>
    </div>
  );
}

export default function VisitorStats() {
  const [data, setData] =
    useState<VisitorData>(EMPTY_DATA);

  const [connection, setConnection] =
    useState<ConnectionState>("connecting");

  const cancelledRef = useRef(false);

  const updateData = useCallback(
    (result: VisitorData) => {
      if (cancelledRef.current) {
        return;
      }

      setData({
        configured: Boolean(result.configured),
        totalVisitors:
          Number(result.totalVisitors) || 0,
        liveViewers:
          Number(result.liveViewers) || 0,
      });
    },
    [],
  );

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(
        VISITOR_API,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          "Unable to fetch visitor statistics.",
        );
      }

      const result =
        (await response.json()) as VisitorData;

      updateData(result);

      setConnection("connected");
    } catch {
      if (!cancelledRef.current) {
        setConnection("reconnecting");
      }
    }
  }, [updateData]);

  const sendPresence = useCallback(
    async (
      action:
        | "enter"
        | "heartbeat"
        | "leave",
    ) => {
      try {
        const response = await fetch(
          VISITOR_API,
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
              action === "leave",
          },
        );

        if (!response.ok) {
          throw new Error(
            "Unable to update visitor presence.",
          );
        }

        if (action === "leave") {
          return;
        }

        const result =
          (await response.json()) as VisitorData;

        updateData(result);

        setConnection("connected");
      } catch {
        if (!cancelledRef.current) {
          setConnection(
            action === "enter"
              ? "offline"
              : "reconnecting",
          );
        }
      }
    },
    [updateData],
  );

  useEffect(() => {
    cancelledRef.current = false;

    void sendPresence("enter");

    const heartbeatInterval =
      window.setInterval(() => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          void sendPresence("heartbeat");
        }
      }, 20_000);

    const pollingInterval =
      window.setInterval(() => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          void fetchStats();
        }
      }, 5_000);

    const handleVisibilityChange = () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        void sendPresence("heartbeat");
        void fetchStats();
      }
    };

    const handlePageHide = () => {
      void sendPresence("leave");
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    window.addEventListener(
      "pagehide",
      handlePageHide,
    );

    return () => {
      cancelledRef.current = true;

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
  }, [
    fetchStats,
    sendPresence,
  ]);

  const isConnected =
    connection === "connected";

  const isOffline =
    connection === "offline";

  return (
    <article
      data-hero-stats
      aria-label="Live portfolio visitor statistics"
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[1.25rem]

        border
        border-slate-200/80
        bg-white/90

        shadow-[0_18px_60px_rgba(15,23,42,0.08)]

        backdrop-blur-2xl

        transition-all
        duration-300

        hover:border-cyan-400/30
        hover:shadow-[0_20px_70px_rgba(15,23,42,0.11)]

        dark:border-white/[0.08]
        dark:bg-[#07111e]/90
        dark:shadow-[0_18px_60px_rgba(0,0,0,0.3)]

        dark:hover:border-cyan-300/20
        dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.38)]
      "
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400/60
          to-transparent
          opacity-70
        "
      />

      <div className="p-4 sm:p-5">
        {/* Header */}
        <header
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-cyan-500/10
                bg-cyan-500/[0.06]
                dark:border-cyan-300/10
                dark:bg-cyan-300/[0.05]
              "
            >
              <Eye
                className="
                  h-3.5
                  w-3.5
                  text-cyan-600
                  dark:text-cyan-300
                "
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-slate-700
                  dark:text-white/70
                "
              >
                Portfolio Activity
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                  dark:text-white/25
                "
              >
                Live audience
              </p>
            </div>
          </div>

          <ConnectionLabel
            state={connection}
          />
        </header>

        {/* Divider */}
        <div
          className="
            my-4
            h-px
            bg-slate-200/80
            dark:bg-white/[0.06]
          "
          aria-hidden="true"
        />

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-2
            gap-0
          "
          aria-live="polite"
          aria-atomic="false"
        >
          <div className="pr-4">
            <StatBlock
              label="Viewing now"
              value={data.liveViewers}
              description="Active visitors"
              type="viewers"
            />
          </div>

          <div
            className="
              border-l
              border-slate-200
              pl-4
              dark:border-white/[0.07]
            "
          >
            <StatBlock
              label="Total visitors"
              value={data.totalVisitors}
              description="Unique browsers"
              type="visitors"
            />
          </div>
        </div>

        {/* Footer */}
        <footer
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-slate-200/80
            pt-3
            dark:border-white/[0.06]
          "
        >
          <div className="flex min-w-0 items-center gap-2">
            {isConnected ? (
              <Check
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-500
                "
                aria-hidden="true"
              />
            ) : isOffline ? (
              <WifiOff
                className="
                  h-3
                  w-3
                  shrink-0
                  text-slate-400
                "
                aria-hidden="true"
              />
            ) : (
              <Loader2
                className="
                  h-3
                  w-3
                  shrink-0
                  animate-spin
                  text-amber-500
                  motion-reduce:animate-none
                "
                aria-hidden="true"
              />
            )}

            <span
              className="
                truncate
                text-[7px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-slate-400
                dark:text-white/25
              "
            >
              {isConnected
                ? "Real-time activity enabled"
                : isOffline
                  ? "Live activity unavailable"
                  : "Updating live activity"}
            </span>
          </div>

          <span
            className="
              shrink-0
              text-[7px]
              font-medium
              uppercase
              tracking-[0.1em]
              text-slate-300
              dark:text-white/15
            "
          >
            5s sync
          </span>
        </footer>
      </div>
    </article>
  );
}