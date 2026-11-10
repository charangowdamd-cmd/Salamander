import React from "react";

export interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "backward";
  scale?: number;
  twist?: number;
  softness?: number;
  shine?: number;
  mouseInteractive?: boolean;
  wave?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const Plasma: React.FC<PlasmaProps>;
export default Plasma;

