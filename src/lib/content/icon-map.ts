import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  ClipboardCheck,
  Clock,
  Factory,
  FileCheck2,
  Flame,
  Gauge,
  Globe2,
  HardHat,
  Headset,
  LayoutDashboard,
  Leaf,
  Mountain,
  Plane,
  Recycle,
  ShieldCheck,
  Siren,
  Sprout,
  Truck,
  Users,
  Zap,
} from "lucide-react";

import type { ContentIconKey } from "@/lib/content/schema";

export const CONTENT_ICONS: Record<ContentIconKey, LucideIcon> = {
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  Recycle,
  HardHat,
  Siren,
  BarChart3,
  Activity,
  Factory,
  Sprout,
  Building2,
  Truck,
  Mountain,
  Zap,
  Users,
  LayoutDashboard,
  Globe2,
  AlertTriangle,
  Clock,
  Headset,
  Leaf,
  Plane,
  Gauge,
  Flame,
};

/** @deprecated use CONTENT_ICONS */
export const SOLUCAO_ICONS = CONTENT_ICONS;
