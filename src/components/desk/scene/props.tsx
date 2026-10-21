"use client";

import { Instance, Instances, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { mix } from "../daylight";
import { C, Flat, Ink, Toon } from "./toon";

/** Eases a value toward a target each frame (or snaps there with reduced motion). */
export function ease(current: number, target: number, dt: number, reduceMotion: boolean, speed = 6) {
  return reduceMotion ? target : current + (target - current) * (1 - Math.exp(-dt * speed));
}

export type OpenProps = { glow: boolean; open: boolean; reduceMotion: boolean };

/* -------------------------------------------------------------------------- */
/* Laptop                                                                      */
/* -------------------------------------------------------------------------- */

const KEYS: [number, number, number][] = [];
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 13; c++) KEYS.push([-0.63 + c * 0.105, 0.046, -0.4 + r * 0.1]);
}
const CODE: [number, number, string][] = [
  [-0.2, 0.3, C.matcha],
  [-0.12, 0.22, C.lamp],
  [-0.12, 0.38, "#9fb7ff"],
  [-0.04, 0.26, "#9fb7ff"],
  [-0.12, 0.18, C.lamp],
  [-0.2, 0.34, C.matcha],
  [-0.12, 0.24, "#ffb3c7"],
];

export function Laptop({ glow, open }: OpenProps) {
  return (
    <group rotation={[0, 0.35, 0]}>
      <RoundedBox args={[1.7, 0.07, 1.15]} radius={0.03}>
        <Toon color={C.metalLight} glow={glow} />
        <Ink t={0.014} />
      </RoundedBox>
      {/* keyboard well, keys, trackpad */}
      <mesh position={[0, 0.036, -0.25]}>
        <boxGeometry args={[1.44, 0.004, 0.46]} />
        <Toon color="#262a3b" />
      </mesh>
      <Instances limit={KEYS.length}>
        <boxGeometry args={[0.085, 0.02, 0.08]} />
        <Toon color="#e9ebf3" />
        {KEYS.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>
      <mesh position={[0, 0.046, -0.01]}>
        <boxGeometry args={[0.52, 0.02, 0.07]} />
        <Toon color="#e9ebf3" />
      </mesh>
      <RoundedBox args={[0.5, 0.008, 0.26]} radius={0.003} position={[0, 0.036, 0.3]}>
        <Toon color="#4a5170" />
      </RoundedBox>
      {/* a leaf sticker on the palm rest */}
      <mesh position={[0.6, 0.0365, 0.38]} rotation={[-Math.PI / 2, 0, 0.6]} scale={[1, 0.55, 1]}>
        <circleGeometry args={[0.05, 20]} />
        <Flat color={C.matcha} />
      </mesh>
      {/* hinge */}
      <mesh position={[0, 0.05, -0.56]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 1.4, 12]} />
        <Toon color={C.metal} />
      </mesh>
      {/* lid */}
      <group position={[0, 0.03, -0.56]} rotation={[-0.32, 0, 0]}>
        <RoundedBox args={[1.7, 1.08, 0.05]} radius={0.03} position={[0, 0.54, 0]}>
          <Toon color={C.metalLight} glow={glow} />
          <Ink t={0.014} />
        </RoundedBox>
        <mesh position={[0, 0.54, 0.027]}>
          <planeGeometry args={[1.56, 0.94]} />
          <Toon color={C.screen} emissive={C.screenGlow} emissiveIntensity={open ? 0.2 : glow ? 0.55 : 0.35} />
        </mesh>
        {/* a little editor on the screen: title bar, file sidebar, code */}
        <mesh position={[0, 0.975, 0.029]}>
          <planeGeometry args={[1.56, 0.07]} />
          <Flat color="#13223d" />
        </mesh>
        {[C.red, C.lamp, C.matcha].map((c, i) => (
          <mesh key={c} position={[-0.72 + i * 0.05, 0.975, 0.031]}>
            <circleGeometry args={[0.014, 12]} />
            <Flat color={c} layer={1} />
          </mesh>
        ))}
        <mesh position={[-0.62, 0.5, 0.029]}>
          <planeGeometry args={[0.32, 0.8]} />
          <Flat color="#173055" />
        </mesh>
        {[0.78, 0.7, 0.62, 0.54, 0.46].map((y, i) => (
          <mesh key={y} position={[-0.66 + (i % 2) * 0.03, y, 0.031]}>
            <planeGeometry args={[0.16, 0.03]} />
            <Flat color={i === 1 ? C.lamp : "#5d7bb0"} layer={1} />
          </mesh>
        ))}
        {CODE.map(([x, w, c], i) => (
          <mesh key={i} position={[x + w / 2 - 0.25, 0.84 - i * 0.085, 0.031]}>
            <planeGeometry args={[w, 0.035]} />
            <Flat color={c} />
          </mesh>
        ))}
        <mesh position={[0, 1.05, 0.027]}>
          <circleGeometry args={[0.012, 10]} />
          <Flat color={C.ink} />
        </mesh>
        {/* The camera flies to this point, facing the screen, when you open the laptop. */}
        <group name="focus-laptop" position={[0, 0.54, 0.03]} />
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Notebook                                                                    */
/* -------------------------------------------------------------------------- */

export function Notebook({ glow, open, reduceMotion }: OpenProps) {
  const cover = useRef<THREE.Group>(null);

  // The cover swings open on its spine when you zoom in.
  useFrame((_, dt) => {
    const c = cover.current;
    if (!c) return;
    c.rotation.z = ease(c.rotation.z, open ? Math.PI * 0.985 : 0, dt, reduceMotion, 5);
  });

  return (
    <group rotation={[0, -0.25, 0]}>
      {/* pages, with a darker stripe so the edge reads as a stack of paper */}
      <RoundedBox args={[0.93, 0.08, 1.21]} radius={0.012} position={[0.01, 0.04, 0]}>
        <Toon color={C.paper} glow={glow} />
        <Ink t={0.01} />
      </RoundedBox>
      <mesh position={[0.01, 0.04, 0.607]}>
        <planeGeometry args={[0.9, 0.012]} />
        <Flat color="#d8cbb0" />
      </mesh>
      {[-0.4, -0.25, -0.1, 0.05, 0.2, 0.35].map((z) => (
        <mesh key={z} position={[0.05, 0.0805, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.72, 0.008]} />
          <Flat color="#b9c6e4" />
        </mesh>
      ))}
      {/* ribbon bookmark poking out of the bottom */}
      <mesh position={[0.25, 0.05, 0.66]} rotation={[-Math.PI / 2, 0, 0.1]}>
        <planeGeometry args={[0.035, 0.14]} />
        <Toon color={C.red} side={THREE.DoubleSide} />
      </mesh>
      {/* spiral binding */}
      {Array.from({ length: 11 }, (_, i) => -0.55 + i * 0.11).map((z) => (
        <mesh key={z} position={[-0.47, 0.06, z]}>
          <torusGeometry args={[0.055, 0.009, 6, 16]} />
          <Toon color={C.silver} />
        </mesh>
      ))}
      {/* cover, hinged on the left edge */}
      <group ref={cover} position={[-0.475, 0.09, 0]}>
        <RoundedBox args={[0.95, 0.018, 1.25]} radius={0.008} position={[0.475, 0, 0]}>
          <Toon color="#c4524a" glow={glow} />
          <Ink t={0.01} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.004, 0.24]} radius={0.002} position={[0.5, 0.011, -0.22]}>
          <Toon color={C.paper} />
        </RoundedBox>
        {[-0.25, -0.19].map((z) => (
          <mesh key={z} position={[0.5, 0.0135, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.36, 0.014]} />
            <Flat color="#8a7d64" />
          </mesh>
        ))}
        {/* elastic band */}
        <mesh position={[0.82, 0.011, 0]}>
          <boxGeometry args={[0.035, 0.006, 1.26]} />
          <Toon color={C.ink} />
        </mesh>
        {/* inside of the cover, seen once it's open */}
        <mesh position={[0.475, -0.0095, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 1.2]} />
          <Toon color="#efe3c8" />
        </mesh>
      </group>
      {/* The camera looks down at the middle of the open spread. */}
      <group name="focus-notebook" position={[-0.475, 0.09, 0]} />
      {/* pencil */}
      <group position={[0.64, 0.035, 0.1]} rotation={[0, 0.5, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
          <Toon color={C.lamp} />
          <Ink t={0.006} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <coneGeometry args={[0.03, 0.1, 6]} />
          <Toon color="#f2d3a8" />
        </mesh>
        <mesh position={[0, -0.43, 0]}>
          <cylinderGeometry args={[0.031, 0.031, 0.06, 8]} />
          <Toon color="#f2a3b4" />
        </mesh>
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Matcha tin, whisk, and a bowl of matcha                                     */
/* -------------------------------------------------------------------------- */

export function MatchaJar({ glow, open, reduceMotion }: OpenProps) {
  const lid = useRef<THREE.Group>(null);
  // The lid pops up and tips back when you zoom in.
  useFrame((_, dt) => {
    const l = lid.current;
    if (!l) return;
    l.position.y = ease(l.position.y, open ? 0.92 : 0.68, dt, reduceMotion);
    l.rotation.x = ease(l.rotation.x, open ? -0.45 : 0, dt, reduceMotion);
  });
  return (
    <group>
      {/* tin */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.64, 32]} />
        <Toon color={C.matcha} glow={glow} />
        <Ink t={0.014} />
      </mesh>
      {[0.02, 0.62].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.022, 8, 32]} />
          <Toon color={C.matchaDark} />
        </mesh>
      ))}
      {/* paper label wrapped round the front, with a leaf on it */}
      <mesh position={[0, 0.33, 0]} rotation={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.304, 0.304, 0.28, 32, 1, true, 0, 1.8]} />
        <Toon color={C.paper} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.34, 0.307]} rotation={[0, 0, 0.6]} scale={[1, 0.5, 1]}>
        <circleGeometry args={[0.07, 20]} />
        <Flat color={C.matchaDark} />
      </mesh>
      <mesh position={[0, 0.34, 0.308]} rotation={[0, 0, 0.6]}>
        <planeGeometry args={[0.12, 0.008]} />
        <Flat color={C.matchaFoam} layer={1} />
      </mesh>
      {[0.25, 0.42].map((y) => (
        <mesh key={y} position={[0, y, 0.306]}>
          <planeGeometry args={[0.2, 0.012]} />
          <Flat color="#a99d84" />
        </mesh>
      ))}
      {/* powder inside, seen when the lid lifts */}
      <mesh position={[0, 0.645, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.01, 32]} />
        <Toon color={C.matchaFoam} />
      </mesh>
      <group ref={lid} position={[0, 0.68, 0]}>
        <mesh>
          <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
          <Toon color={C.matchaDark} />
          <Ink t={0.012} />
        </mesh>
        <mesh position={[0, 0.07, 0]} scale={[1, 0.6, 1]}>
          <sphereGeometry args={[0.07, 16, 12]} />
          <Toon color={C.woodLight} />
          <Ink t={0.008} />
        </mesh>
      </group>
      {/* bamboo whisk, standing on its handle */}
      <group position={[0.46, 0, -0.12]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.035, 0.04, 0.2, 10]} />
          <Toon color="#c9a46a" />
          <Ink t={0.006} />
        </mesh>
        {Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2).map((a) => (
          <mesh
            key={a}
            position={[Math.cos(a) * 0.07, 0.28, Math.sin(a) * 0.07]}
            rotation={[Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35]}
          >
            <cylinderGeometry args={[0.008, 0.006, 0.18, 4]} />
            <Toon color="#e6d3a3" />
          </mesh>
        ))}
      </group>
      {/* a bowl of matcha, foam on top */}
      <group position={[0.62, 0, 0.5]}>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.2, 28, 14, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <Toon color="#e7e0d1" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.04, 20]} />
          <Toon color="#d2c8b3" />
        </mesh>
        {/* rim, so the bowl still has an inked edge */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.012, 6, 32]} />
          <Toon color="#d2c8b3" />
        </mesh>
        <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.175, 28]} />
          <Flat color={C.matcha} />
        </mesh>
        {[
          [0.04, 0.03],
          [-0.06, -0.02],
          [0.01, -0.07],
          [-0.03, 0.07],
        ].map(([x, z]) => (
          <mesh key={`${x}${z}`} position={[x, 0.166, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.025, 12]} />
            <Flat color={C.matchaFoam} layer={1} />
          </mesh>
        ))}
      </group>
      <group name="focus-matcha" position={[0.25, 0.5, 0.15]} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Phone                                                                       */
/* -------------------------------------------------------------------------- */

const APP_COLORS = [C.red, C.lamp, C.matcha, C.screenGlow, "#ffb3c7", "#b9a4ff", C.lamp, C.matcha, "#ff8a5c"];

export function Phone({ glow, open }: OpenProps) {
  return (
    <group rotation={[0, 0.5, 0]}>
      <RoundedBox args={[0.38, 0.04, 0.72]} radius={0.018}>
        <Toon color={C.matchaDark} glow={glow} />
        <Ink t={0.01} />
      </RoundedBox>
      <mesh position={[0, 0.0215, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.33, 0.66]} />
        <Toon color="#20304a" emissive="#ff8a5c" emissiveIntensity={open ? 0.9 : glow ? 0.6 : 0.3} />
      </mesh>
      {/* app icons and the notch */}
      {APP_COLORS.map((c, i) => (
        <mesh
          key={i}
          position={[-0.09 + (i % 3) * 0.09, 0.023, -0.2 + Math.floor(i / 3) * 0.09]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.06, 0.06]} />
          <Flat color={c} />
        </mesh>
      ))}
      <mesh position={[0, 0.023, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 0.022]} />
        <Flat color={C.ink} />
      </mesh>
      <mesh position={[0, 0.023, 0.29]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.12, 0.012]} />
        <Flat color="#f5d3c4" />
      </mesh>
      <group name="focus-phone" position={[0, 0.03, 0]} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Printer                                                                     */
/* -------------------------------------------------------------------------- */

export function Printer({ glow, open, reduceMotion }: OpenProps) {
  const sheet = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshBasicMaterial>(null);
  // A fresh page slides out of the front while you look at it, and the light blinks.
  useFrame((state, dt) => {
    if (sheet.current) sheet.current.position.z = ease(sheet.current.position.z, open ? 0.62 : 0.2, dt, reduceMotion, 2.2);
    if (led.current) {
      const blink = open && !reduceMotion ? Math.sin(state.clock.elapsedTime * 10) > 0 : true;
      led.current.color.set(blink ? C.matcha : "#2f4a28");
    }
  });
  return (
    <group rotation={[0, -0.4, 0]}>
      <RoundedBox args={[0.95, 0.42, 0.75]} radius={0.07} position={[0, 0.21, 0]}>
        <Toon color="#e6e8f0" glow={glow} />
        <Ink t={0.014} />
      </RoundedBox>
      {/* darker top lid */}
      <RoundedBox args={[0.9, 0.05, 0.5]} radius={0.02} position={[0, 0.43, 0.08]}>
        <Toon color="#c9cdd9" />
        <Ink t={0.008} />
      </RoundedBox>
      {/* paper tray at the back, with a little stack of paper */}
      <mesh position={[0, 0.5, -0.32]} rotation={[-0.55, 0, 0]}>
        <boxGeometry args={[0.66, 0.02, 0.4]} />
        <Toon color="#b9bdc9" />
        <Ink t={0.006} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.005 * i, 0.52 + i * 0.008, -0.32 + i * 0.004]} rotation={[-0.55, 0, 0.01 * i]}>
          <boxGeometry args={[0.56, 0.004, 0.36]} />
          <Toon color={C.white} />
        </mesh>
      ))}
      {/* output slot and tray */}
      <mesh position={[0, 0.24, 0.376]}>
        <planeGeometry args={[0.62, 0.04]} />
        <Flat color={C.ink} />
      </mesh>
      <mesh position={[0, 0.16, 0.45]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.62, 0.012, 0.22]} />
        <Toon color="#b9bdc9" />
        <Ink t={0.006} />
      </mesh>
      <group ref={sheet} position={[0, 0.2, 0.2]} rotation={[0.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.004, 0.62]} />
          <Toon color={C.white} />
        </mesh>
        {[0.2, 0.12, 0.04, -0.04, -0.12].map((z, i) => (
          <mesh key={z} position={[-0.04 + (i % 2) * 0.03, 0.003, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.32 - (i % 3) * 0.06, 0.02]} />
            <Flat color={i === 0 ? C.ink : "#9aa0b2"} />
          </mesh>
        ))}
      </group>
      {/* control panel: a tiny screen, buttons, and the status light */}
      <mesh position={[0.18, 0.33, 0.377]}>
        <planeGeometry args={[0.16, 0.07]} />
        <Flat color="#2a4a6e" />
      </mesh>
      <mesh position={[0.18, 0.33, 0.378]}>
        <planeGeometry args={[0.1, 0.015]} />
        <Flat color={C.screenGlow} layer={1} />
      </mesh>
      {[-0.3, -0.22].map((x) => (
        <mesh key={x} position={[x, 0.33, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.012, 14]} />
          <Toon color={x < -0.25 ? C.red : C.metalLight} />
        </mesh>
      ))}
      <mesh position={[0.34, 0.33, 0.377]}>
        <circleGeometry args={[0.025, 16]} />
        <meshBasicMaterial ref={led} color={C.matcha} toneMapped={false} />
      </mesh>
      {/* side vents */}
      {[0.12, 0.17, 0.22, 0.27].map((y) => (
        <mesh key={y} position={[0.476, y, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.4, 0.015]} />
          <Flat color="#a7acba" />
        </mesh>
      ))}
      <group name="focus-printer" position={[0, 0.3, 0.15]} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Whiteboard                                                                  */
/* -------------------------------------------------------------------------- */

export function Whiteboard({ glow }: OpenProps) {
  return (
    <group>
      <RoundedBox args={[2.4, 1.45, 0.06]} radius={0.03}>
        <Toon color="#c3c7d4" glow={glow} />
        <Ink t={0.016} />
      </RoundedBox>
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[2.25, 1.3]} />
        <Toon color={C.white} />
      </mesh>
      {/* a timeline drawn in marker */}
      <mesh position={[-0.2, -0.05, 0.034]}>
        <planeGeometry args={[1.5, 0.025]} />
        <Flat color={C.blue} />
      </mesh>
      {[-0.85, -0.45, -0.05, 0.35].map((x, i) => (
        <group key={x} position={[x, -0.05, 0.035]}>
          <mesh>
            <circleGeometry args={[0.05, 16]} />
            <Flat color={i === 3 ? C.matchaDark : C.blue} layer={1} />
          </mesh>
          <mesh position={[0, i % 2 ? -0.24 : 0.24, 0]}>
            <planeGeometry args={[0.32, 0.13]} />
            <Flat color={i === 3 ? "#d7ecd0" : "#dbe5fb"} />
          </mesh>
          <mesh position={[0, i % 2 ? -0.24 : 0.24, 0.001]}>
            <planeGeometry args={[0.22, 0.018]} />
            <Flat color={i === 3 ? C.matchaDark : C.blue} layer={1} />
          </mesh>
        </group>
      ))}
      {/* a little bar chart in red marker, with an arrow going up */}
      <group position={[0.8, -0.2, 0.035]}>
        {[0.12, 0.22, 0.36].map((h, i) => (
          <mesh key={h} position={[-0.12 + i * 0.12, h / 2, 0]}>
            <planeGeometry args={[0.07, h]} />
            <Flat color={C.red} />
          </mesh>
        ))}
        <mesh position={[0, -0.01, 0]}>
          <planeGeometry args={[0.42, 0.015]} />
          <Flat color={C.ink} layer={1} />
        </mesh>
        <mesh position={[0.02, 0.42, 0]} rotation={[0, 0, -0.5]}>
          <planeGeometry args={[0.3, 0.015]} />
          <Flat color={C.matchaDark} />
        </mesh>
      </group>
      {/* magnets holding up a photo */}
      <mesh position={[0.82, 0.38, 0.036]} rotation={[0, 0, 0.06]}>
        <planeGeometry args={[0.34, 0.26]} />
        <Flat color="#fff" />
      </mesh>
      <mesh position={[0.82, 0.39, 0.037]} rotation={[0, 0, 0.06]}>
        <planeGeometry args={[0.28, 0.18]} />
        <Flat color="#8fb6e8" layer={1} />
      </mesh>
      <mesh position={[0.86, 0.36, 0.038]}>
        <circleGeometry args={[0.04, 14]} />
        <Flat color={C.lamp} layer={2} />
      </mesh>
      {[
        [0.68, 0.5, C.red],
        [0.96, 0.52, C.matcha],
      ].map(([x, y, c]) => (
        <mesh key={String(x)} position={[x as number, y as number, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.03, 14]} />
          <Toon color={c as string} />
          <Ink t={0.005} />
        </mesh>
      ))}
      {/* marker tray, markers, eraser */}
      <mesh position={[0, -0.76, 0.07]}>
        <boxGeometry args={[1.6, 0.04, 0.14]} />
        <Toon color="#9aa0b2" />
        <Ink t={0.008} />
      </mesh>
      {[
        [-0.5, C.blue],
        [-0.36, C.red],
        [-0.22, C.matchaDark],
      ].map(([x, c]) => (
        <group key={String(x)} position={[x as number, -0.72, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.022, 0.022, 0.18, 10]} />
            <Toon color={C.white} />
            <Ink t={0.005} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.05, 10]} />
            <Toon color={c as string} />
          </mesh>
        </group>
      ))}
      <RoundedBox args={[0.24, 0.08, 0.1]} radius={0.02} position={[0.4, -0.7, 0.08]}>
        <Toon color={C.ink} />
        <Ink t={0.006} />
      </RoundedBox>
      <group name="focus-whiteboard" position={[0, 0, 0.03]} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Trophy shelf                                                                */
/* -------------------------------------------------------------------------- */

/** A goblet-shaped cup, as a profile spun around its axis. */
const CUP = [
  [0.0, 0.0],
  [0.1, 0.0],
  [0.1, 0.025],
  [0.045, 0.045],
  [0.028, 0.07],
  [0.028, 0.13],
  [0.05, 0.15],
  [0.028, 0.17],
  [0.05, 0.2],
  [0.12, 0.25],
  [0.16, 0.33],
  [0.165, 0.36],
  [0.145, 0.36],
  [0.135, 0.31],
  [0.0, 0.26],
].map(([x, y]) => new THREE.Vector2(x, y));

const STAR = (() => {
  const s = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 0.035 : 0.08;
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  return s;
})();

export function Trophies({ glow, open, reduceMotion }: OpenProps) {
  const cupRefs = useRef<(THREE.Group | null)[]>([]);
  const cups: [string, number, number][] = [
    [C.gold, -0.48, 1.2],
    [C.silver, 0, 1.05],
    [C.bronze, 0.46, 0.92],
  ];
  // Up close, the cups turn slowly so they catch the lamp light.
  useFrame((state) => {
    cupRefs.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.y = open && !reduceMotion ? Math.sin(state.clock.elapsedTime * 1.2 + i) * 0.5 : 0;
    });
  });
  return (
    <group>
      {/* shelf and its brackets */}
      <RoundedBox args={[1.6, 0.07, 0.42]} radius={0.015}>
        <Toon color={C.woodDark} glow={glow} />
        <Ink t={0.01} />
      </RoundedBox>
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, -0.12, -0.1]} rotation={[0.8, 0, 0]}>
          <boxGeometry args={[0.05, 0.26, 0.05]} />
          <Toon color={C.woodDark} />
          <Ink t={0.006} />
        </mesh>
      ))}
      {cups.map(([color, x, s], i) => (
        <group key={x} position={[x, 0.035, 0]}>
          {/* plinth with a gold name plate */}
          <RoundedBox args={[0.26, 0.09, 0.22]} radius={0.015} position={[0, 0.045, 0]}>
            <Toon color={C.ink} />
            <Ink t={0.006} />
          </RoundedBox>
          <mesh position={[0, 0.045, 0.111]}>
            <planeGeometry args={[0.16, 0.04]} />
            <Flat color="#d9a441" />
          </mesh>
          <group
            ref={(el) => {
              cupRefs.current[i] = el;
            }}
            position={[0, 0.09, 0]}
            scale={s}
          >
            <mesh>
              <latheGeometry args={[CUP, 28]} />
              <Toon color={color} emissive={color} emissiveIntensity={open ? 0.35 : glow ? 0.3 : 0.12} side={THREE.DoubleSide} />
              <Ink t={0.008} />
            </mesh>
            {[-1, 1].map((side) => (
              <mesh key={side} position={[side * 0.16, 0.28, 0]} rotation={[0, 0, side * -Math.PI / 2]}>
                <torusGeometry args={[0.05, 0.012, 6, 14, Math.PI]} />
                <Toon color={color} />
              </mesh>
            ))}
            {i === 0 ? (
              <mesh position={[0, 0.43, -0.01]}>
                <extrudeGeometry args={[STAR, { depth: 0.02, bevelEnabled: false }]} />
                <Toon color={C.gold} emissive={C.gold} emissiveIntensity={0.3} />
                <Ink t={0.006} />
              </mesh>
            ) : null}
          </group>
        </group>
      ))}
      {/* a medal hanging off the front edge */}
      <group position={[0.74, -0.04, 0.22]}>
        <mesh position={[-0.03, -0.06, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.04, 0.14, 0.005]} />
          <Toon color={C.blue} />
        </mesh>
        <mesh position={[0.03, -0.06, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.04, 0.14, 0.005]} />
          <Toon color={C.red} />
        </mesh>
        <mesh position={[0, -0.16, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.015, 20]} />
          <Toon color={C.gold} emissive={C.gold} emissiveIntensity={0.2} />
          <Ink t={0.005} />
        </mesh>
      </group>
      <group name="focus-trophies" position={[0, 0.22, 0]} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Sticky notes                                                                */
/* -------------------------------------------------------------------------- */

export function StickyNotes({ glow, open, reduceMotion }: OpenProps) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const notes: [number, number, number][] = [
    [0, 0, 0.08],
    [0.36, -0.12, -0.12],
    [0.12, -0.42, 0.05],
  ];
  // Up close, the notes flutter a little, like there's a fan on.
  useFrame((state) => {
    refs.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.x = open && !reduceMotion ? Math.sin(state.clock.elapsedTime * 3 + i * 1.7) * 0.12 : 0;
    });
  });
  return (
    <group>
      {notes.map(([x, y, r], i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[x, y, i * 0.006]}
          rotation={[0, 0, r]}
        >
          <mesh>
            <boxGeometry args={[0.34, 0.34, 0.01]} />
            <Toon color={C.sticky[i]} glow={glow} />
            <Ink t={0.006} />
          </mesh>
          {/* scribbles */}
          {[0.06, 0, -0.06, -0.12].map((ly, j) => (
            <mesh key={ly} position={[-0.02 + (j % 2) * 0.02, ly, 0.0055]}>
              <planeGeometry args={[0.22 - (j % 3) * 0.05, 0.016]} />
              <Flat color="#6b5f4a" />
            </mesh>
          ))}
          {/* push pin */}
          <mesh position={[0, 0.13, 0.03]}>
            <sphereGeometry args={[0.03, 12, 10]} />
            <Toon color={[C.red, C.blue, C.matchaDark][i]} />
            <Ink t={0.004} />
          </mesh>
        </group>
      ))}
      <group name="focus-sticky" position={[0.18, -0.2, 0]} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Desk lamp                                                                   */
/* -------------------------------------------------------------------------- */

/** `on` runs from 0 (daytime, lamp off) to 1 (evening and night). */
export function Lamp({ reduceMotion, on }: { reduceMotion: boolean; on: number }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!light.current || reduceMotion) return;
    // A soft warm-up on load.
    light.current.intensity = Math.min(18, state.clock.elapsedTime * 14) * on;
  });
  return (
    <group position={[-2.5, 0, -0.9]}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.36, 0.1, 28]} />
        <Toon color={C.matchaDark} />
        <Ink t={0.012} />
      </mesh>
      <mesh position={[0.2, 0.1, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
        <Toon color={C.lamp} />
      </mesh>
      {/* lower arm, elbow joint, upper arm */}
      <mesh position={[0.12, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 10]} />
        <Toon color={C.metalLight} />
        <Ink t={0.008} />
      </mesh>
      <mesh position={[0.25, 0.92, 0]}>
        <sphereGeometry args={[0.07, 14, 12]} />
        <Toon color={C.matchaDark} />
        <Ink t={0.006} />
      </mesh>
      <mesh position={[0.42, 1.2, 0.1]} rotation={[0.3, 0, -0.65]}>
        <cylinderGeometry args={[0.03, 0.03, 0.66, 10]} />
        <Toon color={C.metalLight} />
        <Ink t={0.008} />
      </mesh>
      {/* Shade hangs off the end of the arm, its opening aimed down at the desk and the laptop. */}
      <group position={[0.72, 1.25, 0.22]} rotation={[-0.2, 0, 0.45]}>
        {/* shade: dark green outside, warm inside */}
        <mesh>
          <coneGeometry args={[0.32, 0.45, 28, 1, true]} />
          <meshLambertMaterial color={C.matchaDark} />
          <Ink t={0.012} />
        </mesh>
        <mesh>
          <coneGeometry args={[0.315, 0.445, 28, 1, true]} />
          <Flat color={mix("#59613f", "#ffe3a3", on)} side={THREE.BackSide} />
        </mesh>
        <mesh position={[0, -0.225, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.018, 8, 28]} />
          <Toon color={C.lamp} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.08, 12, 10]} />
          <Toon color={C.matchaDark} />
        </mesh>
        <mesh position={[0, -0.16, 0]}>
          <sphereGeometry args={[0.1, 16, 14]} />
          <Flat color={mix("#a8a294", "#fff6d8", on)} />
        </mesh>
      </group>
      <pointLight
        ref={light}
        position={[0.95, 0.85, 0.35]}
        color={C.lamp}
        intensity={reduceMotion ? 18 * on : 0}
        distance={9}
        decay={1.6}
      />
    </group>
  );
}
