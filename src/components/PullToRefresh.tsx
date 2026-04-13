"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

const PULL_THRESHOLD = 72;

export default function PullToRefresh() {
  const router = useRouter();
  const [pullDelta, setPullDelta] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const refreshingRef = useRef(false);
  const pullDeltaRef = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = window.scrollY === 0 ? e.touches[0].clientY : 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current || refreshingRef.current) return;
      const delta = e.touches[0].clientY - touchStartY.current;
      if (delta > 0) {
        const clamped = Math.min(delta * 0.55, PULL_THRESHOLD + 24);
        pullDeltaRef.current = clamped;
        setPullDelta(clamped);
      }
    };

    const onTouchEnd = () => {
      if (pullDeltaRef.current >= PULL_THRESHOLD && !refreshingRef.current) {
        refreshingRef.current = true;
        setRefreshing(true);
        router.refresh();
        // Give the router time to re-render before hiding the indicator
        setTimeout(() => {
          refreshingRef.current = false;
          setRefreshing(false);
        }, 1200);
      }
      pullDeltaRef.current = 0;
      touchStartY.current = 0;
      setPullDelta(0);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [router]);

  const visible = refreshing || pullDelta > 0;
  const ready = pullDelta >= PULL_THRESHOLD;
  const translateY = refreshing
    ? 20
    : pullDelta > 0
    ? Math.min(pullDelta - 36, 20)
    : -48;

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-50"
      style={{
        transform: `translateY(${translateY}px)`,
        transition: pullDelta > 0 ? "none" : "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div
        className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-lg text-sm font-medium transition-colors duration-200
          ${ready || refreshing ? "bg-[#2547a0] text-white" : "bg-white text-gray-600 border"}`}
      >
        <RefreshCw
          className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          style={
            refreshing
              ? undefined
              : { transform: `rotate(${(pullDelta / PULL_THRESHOLD) * 240}deg)` }
          }
        />
        {refreshing ? "Actualizando..." : ready ? "Soltar para actualizar" : "Jalar para actualizar"}
      </div>
    </div>
  );
}
