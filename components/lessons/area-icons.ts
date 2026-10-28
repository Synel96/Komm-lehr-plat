import { PackageSearch, ScanLine } from "lucide-react";
import type { AreaId } from "@/src/content/lessons";

export const AREA_ICONS: Record<AreaId, typeof ScanLine> = {
  scanner: ScanLine,
  kommissionierung: PackageSearch,
};

/** Accent colour per area: icon tile and progress bar. */
export const AREA_STYLES: Record<AreaId, { tile: string; bar: string }> = {
  scanner: {
    tile: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    bar: "bg-sky-500",
  },
  kommissionierung: {
    tile: "bg-amber-400/15 text-amber-600 dark:text-amber-400",
    bar: "bg-amber-400",
  },
};
