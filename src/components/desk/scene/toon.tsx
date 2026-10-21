"use client";

import { Outlines } from "@react-three/drei";
import * as THREE from "three";

/** The desk's palette. Night room, warm lamp, matcha green. */
export const C = {
  wall: "#2c3566",
  wallLow: "#222a55",
  trim: "#2e3666",
  wood: "#b97d4f",
  woodLight: "#c98d5c",
  woodDark: "#7d5435",
  paper: "#f3ead8",
  lamp: "#ffcf7a",
  matcha: "#7fb069",
  matchaDark: "#4e7a3d",
  matchaFoam: "#a9cf7e",
  metal: "#3a3f55",
  metalLight: "#545b78",
  screen: "#1e3a5f",
  screenGlow: "#7cc4ff",
  gold: "#f0b83f",
  silver: "#cfd3dd",
  bronze: "#c97a43",
  koala: "#9ea3b0",
  koalaLight: "#e3e5eb",
  koalaPink: "#f0a8b8",
  ink: "#20222b",
  white: "#fbfbfd",
  red: "#e0574f",
  blue: "#3b6fd6",
  sticky: ["#ffe27a", "#ffb3c7", "#a7e3c4"],
} as const;

/** Outline colour: a warm near-black, like a felt-tip line. */
export const INK = "#1b1726";

/** Three flat bands of light, for the cel-shaded look. */
const ramp = (() => {
  const t = new THREE.DataTexture(new Uint8Array([105, 180, 255]), 3, 1, THREE.RedFormat);
  t.minFilter = THREE.NearestFilter;
  t.magFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.needsUpdate = true;
  return t;
})();

type ToonProps = {
  color: string;
  /** Warm up when the object is hovered. */
  glow?: boolean;
  emissive?: string;
  emissiveIntensity?: number;
  side?: THREE.Side;
  transparent?: boolean;
  opacity?: number;
};

/** Cel-shaded material used for almost everything in the room. */
export function Toon({ color, glow = false, emissive, emissiveIntensity, ...rest }: ToonProps) {
  return (
    <meshToonMaterial
      color={color}
      gradientMap={ramp}
      emissive={glow ? C.lamp : (emissive ?? "#000000")}
      emissiveIntensity={glow ? 0.28 : (emissiveIntensity ?? 0)}
      {...rest}
    />
  );
}

/**
 * Flat, unlit colour for things that give off light or are drawn on (screens, marker, labels).
 * Decals sit a hair above the surface they're drawn on; the polygon offset pulls them toward the
 * camera so they never flicker against it from far away. `layer` stacks decals drawn on decals.
 */
export function Flat({
  color,
  layer = 0,
  ...rest
}: { color: string; layer?: number; side?: THREE.Side; transparent?: boolean; opacity?: number }) {
  return (
    <meshBasicMaterial
      color={color}
      toneMapped={false}
      polygonOffset
      polygonOffsetFactor={-2 - layer * 2}
      polygonOffsetUnits={-2 - layer * 2}
      {...rest}
    />
  );
}

/** An ink outline around the parent mesh. Thickness is in scene units. */
export function Ink({ t = 0.012 }: { t?: number }) {
  return <Outlines thickness={t} color={INK} />;
}
