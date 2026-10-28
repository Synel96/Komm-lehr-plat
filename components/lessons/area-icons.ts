import { PackageSearch, ScanLine } from "lucide-react";
import type { AreaId } from "@/src/content/lessons";

export const AREA_ICONS: Record<AreaId, typeof ScanLine> = {
  scanner: ScanLine,
  kommissionierung: PackageSearch,
};
