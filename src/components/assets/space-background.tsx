"use client";

import { BackgroundStars } from "./background-stars";
import { ShootingStars } from "./shooting-stars";

export function SpaceBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <BackgroundStars />
      <ShootingStars />
    </div>
  );
}
