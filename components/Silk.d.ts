import React from "react";

export interface SilkProps {
  color?: string;
  sheenColor?: string;
  speed?: number;
  scale?: number;
  rotation?: number;
  sheen?: number;
  depth?: number;
  glow?: number;
  noiseIntensity?: number;
  mouseInteraction?: boolean;
  clickRipple?: boolean;
  intro?: boolean;
  ripple?: number;
  wave?: number;
  interactionStrength?: number;
  variation?: number;
  fade?: number;
  lightMode?: boolean;
  paused?: boolean;
  dpr?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const Silk: React.FC<SilkProps>;
export default Silk;

