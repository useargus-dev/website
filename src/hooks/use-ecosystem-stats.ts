import { useEffect, useState } from "react";
import type { EcosystemStats } from "@/lib/ecosystem-stats.types";
import bakedStats from "@/generated/ecosystem-stats.json";
import {
  fetchLiveEcosystemStats,
  hasAnyStats,
  mergeEcosystemStats,
} from "@/lib/ecosystem-stats";

const initialStats = bakedStats as EcosystemStats;

export function useEcosystemStats() {
  const [stats, setStats] = useState<EcosystemStats>(initialStats);
  const [loading, setLoading] = useState(!hasAnyStats(initialStats));

  useEffect(() => {
    let cancelled = false;

    void fetchLiveEcosystemStats()
      .then((live) => {
        if (cancelled) return;
        setStats((current) => mergeEcosystemStats(current, live));
      })
      .catch(() => {
        // Keep baked fallback when live APIs fail (offline, CORS, rate limit).
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading };
}
