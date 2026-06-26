import type { Category } from "@/features/categories/categories.types";
import {
  Armchair,
  BicepsFlexed,
  Birdhouse,
  BrushCleaning,
  Camera,
  Flower,
  HeartPulse,
  MirrorRound,
  MonitorSpeaker,
  Notebook,
  Palette,
  PawPrint,
  ToolCase,
  Van,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const advertConstraints = {
  MIN_PAGE: 1,
  MAX_LIMIT: 20,
  MIN_PRICE: 1,
  MAX_PRICE: 9999,
  MAX_TITLE: 50,
  MAX_DESCRIPTION: 500,
};

type CategoryValue = Category["value"];

export const advertCategoryIcon: Record<CategoryValue, { icon: LucideIcon }> = {
  BEAUTY: { icon: MirrorRound },
  CARE: { icon: HeartPulse },
  CARPENTRY: { icon: Birdhouse },
  CLASSES: { icon: Notebook },
  CLEANING: { icon: BrushCleaning },
  ELECTRICIAN: { icon: Zap },
  GARDENING: { icon: Flower },
  MEDIA: { icon: Camera },
  PAINTING: { icon: Palette },
  PETS: { icon: PawPrint },
  PLUMBING: { icon: Wrench },
  REPAIRS: { icon: ToolCase },
  RESTORATION: { icon: Armchair },
  TECHNOLOGY: { icon: MonitorSpeaker },
  TRAINING: { icon: BicepsFlexed },
  TRANSPORT: { icon: Van },
};
