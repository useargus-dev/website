import { useEffect, useState } from "react";
import type { ReleasesData } from "@/lib/releases.types";
import bakedReleases from "@/generated/releases.json";
import { fetchLiveReleases } from "@/lib/releases";

const initialData = bakedReleases as ReleasesData;

export function useReleases() {
  const [data, setData] = useState<ReleasesData>(initialData);
  const [loading, setLoading] = useState(initialData.releases.length === 0);

  useEffect(() => {
    let cancelled = false;

    void fetchLiveReleases()
      .then((live) => {
        if (cancelled) return;
        setData(live);
      })
      .catch(() => {
        // Keep baked fallback when live APIs fail.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}
