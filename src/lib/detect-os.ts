import type { OsPlatform } from "@/lib/releases.types";

export function detectOs(): OsPlatform | null {
  if (typeof navigator === "undefined") return null;

  const platform = navigator.platform?.toLowerCase() ?? "";
  const userAgent = navigator.userAgent?.toLowerCase() ?? "";

  if (platform.includes("win") || userAgent.includes("windows")) {
    return "windows";
  }
  if (
    platform.includes("mac") ||
    userAgent.includes("macintosh") ||
    userAgent.includes("mac os")
  ) {
    return "macos";
  }
  if (platform.includes("linux") || userAgent.includes("linux")) {
    return "linux";
  }

  return null;
}
