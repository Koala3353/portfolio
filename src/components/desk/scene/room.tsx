"use client";

import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { C, Flat, Ink, Toon } from "./toon";

/* -------------------------------------------------------------------------- */
/* Desk: planked top, tapered legs, a drawer unit                              */
/* -------------------------------------------------------------------------- */

const PLANKS = [C.wood, C.woodLight, C.wood, "#b3784b"];

export function Desk() {
  return (
    <group>
      {/* the top surface sits at y = 0 */}
      <RoundedBox args={[6.4, 0.16, 3.2]} radius={0.05} position={[0, -0.14, 0]}>
        <Toon color={C.woodDark} />
        <Ink t={0.016} />
      </RoundedBox>
      {PLANKS.map((c, i) => (
        <RoundedBox key={i} args={[6.36, 0.07, 0.785]} radius={0.02} position={[0, -0.035, -1.2 + i * 0.8]}>
          <Toon color={c} />
        </RoundedBox>
      ))}
      {/* a few knots in the wood */}
      {[
        [-1.2, 1.25],
        [2.0, -0.2],
        [-2.6, 0.5],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.001, z]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.6, 1, 1]}>
          <ringGeometry args={[0.03, 0.05, 16]} />
          <Flat color="#9a653f" />
        </mesh>
      ))}
      {[
        [-2.95, -1.4],
        [2.95, -1.4],
        [-2.95, 1.4],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, -1.22, z]}>
          <cylinderGeometry args={[0.1, 0.075, 2, 12]} />
          <Toon color={C.woodDark} />
          <Ink t={0.012} />
        </mesh>
      ))}
      {/* drawer unit under the right-hand side */}
      <RoundedBox args={[1.3, 1.95, 2.9]} radius={0.04} position={[2.4, -1.2, 0]}>
        <Toon color={C.wood} />
        <Ink t={0.014} />
      </RoundedBox>
      {[-0.6, -1.25, -1.9].map((y) => (
        <group key={y} position={[2.4, y, 1.455]}>
          <RoundedBox args={[1.14, 0.56, 0.03]} radius={0.02}>
            <Toon color={C.woodLight} />
            <Ink t={0.008} />
          </RoundedBox>
          <mesh position={[0, 0.06, 0.03]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.025, 0.22, 4, 10]} />
            <Toon color={C.ink} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Room: wall, window, string lights, pennant, rug, floor                      */
/* -------------------------------------------------------------------------- */

/** String lights sag between hooks along the top of the wall. */
const HOOKS = [-5.2, -2.6, 0, 2.6, 5.2];
const LIGHT_CURVE = new THREE.CatmullRomCurve3(
  HOOKS.flatMap((x, i) => {
    const pts = [new THREE.Vector3(x, 3.75, -1.8)];
    if (i < HOOKS.length - 1) pts.push(new THREE.Vector3(x + 1.3, 3.42, -1.75));
    return pts;
  }),
);
const BULBS = Array.from({ length: 22 }, (_, i) => LIGHT_CURVE.getPointAt((i + 0.5) / 22));
const BULB_COLORS = [C.lamp, "#ffb3c7", "#a7e3c4", "#bfdcff"];

const PENNANT = (() => {
  const s = new THREE.Shape();
  s.moveTo(0, 0.22);
  s.lineTo(0.95, 0);
  s.lineTo(0, -0.22);
  s.closePath();
  return s;
})();

const STARS: [number, number, number][] = [
  [-0.45, 0.55, 0.025],
  [0.35, 0.65, 0.018],
  [0.5, 0.15, 0.02],
  [-0.2, 0.05, 0.015],
  [-0.5, -0.35, 0.02],
  [0.15, -0.5, 0.016],
];

export function Room() {
  return (
    <group>
      {/* back wall, with a darker lower half and a trim line */}
      <mesh position={[0, 2.2, -1.85]}>
        <planeGeometry args={[24, 4.6]} />
        <meshLambertMaterial color={C.wall} />
      </mesh>
      <mesh position={[0, -1.05, -1.85]}>
        <planeGeometry args={[24, 2.1]} />
        <meshLambertMaterial color={C.wallLow} />
      </mesh>
      <mesh position={[0, -0.05, -1.84]}>
        <boxGeometry args={[24, 0.08, 0.04]} />
        <Toon color={C.trim} />
      </mesh>

      {/* window: night sky, moon, stars */}
      <group position={[-3.45, 2.25, -1.82]}>
        <RoundedBox args={[1.55, 1.8, 0.08]} radius={0.04}>
          <Toon color={C.paper} />
          <Ink t={0.014} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.35, 1.6]} />
          <Flat color="#121a3e" />
        </mesh>
        <mesh position={[0.3, 0.42, 0.05]}>
          <circleGeometry args={[0.2, 28]} />
          <Flat color="#fff3c4" layer={1} />
        </mesh>
        <mesh position={[0.38, 0.47, 0.051]}>
          <circleGeometry args={[0.17, 28]} />
          <Flat color="#121a3e" layer={2} />
        </mesh>
        {STARS.map(([x, y, r]) => (
          <mesh key={`${x}${y}`} position={[x, y, 0.05]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[r * 2, r * 2]} />
            <Flat color="#fff3c4" layer={1} />
          </mesh>
        ))}
        {/* a city skyline along the bottom */}
        {[-0.5, -0.32, -0.1, 0.1, 0.3, 0.5].map((x, i) => (
          <mesh key={x} position={[x, -0.6 + (i % 3) * 0.05, 0.05]}>
            <planeGeometry args={[0.18, 0.4 + (i % 3) * 0.12]} />
            <Flat color="#1d2a5c" layer={1} />
          </mesh>
        ))}
        {[-0.5, -0.1, 0.3].map((x) => (
          <mesh key={x} position={[x, -0.55, 0.052]}>
            <planeGeometry args={[0.04, 0.05]} />
            <Flat color={C.lamp} layer={2} />
          </mesh>
        ))}
        {/* mullions and sill */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[0.05, 1.6, 0.03]} />
          <Toon color={C.paper} />
        </mesh>
        <mesh position={[0, 0.05, 0.06]}>
          <boxGeometry args={[1.35, 0.05, 0.03]} />
          <Toon color={C.paper} />
        </mesh>
        <RoundedBox args={[1.75, 0.07, 0.24]} radius={0.02} position={[0, -0.92, 0.1]}>
          <Toon color={C.paper} />
          <Ink t={0.01} />
        </RoundedBox>
      </group>

      {/* string lights */}
      <mesh>
        <tubeGeometry args={[LIGHT_CURVE, 120, 0.008, 5, false]} />
        <Flat color="#0e1230" />
      </mesh>
      {BULBS.map((p, i) => (
        <mesh key={i} position={[p.x, p.y - 0.05, p.z + 0.02]}>
          <sphereGeometry args={[0.045, 10, 8]} />
          <Flat color={BULB_COLORS[i % BULB_COLORS.length]} />
        </mesh>
      ))}

      {/* a school pennant */}
      <group position={[3.2, 3.0, -1.82]} rotation={[0, 0, -0.08]} scale={0.8}>
        <mesh>
          <shapeGeometry args={[PENNANT]} />
          <Toon color="#1f3a8a" side={THREE.DoubleSide} />
          <Ink t={0.01} />
        </mesh>
        <mesh position={[0.05, 0, 0.002]}>
          <planeGeometry args={[0.08, 0.42]} />
          <Flat color={C.white} />
        </mesh>
        <mesh position={[0.4, 0, 0.002]}>
          <planeGeometry args={[0.32, 0.03]} />
          <Flat color={C.white} />
        </mesh>
      </group>

      {/* floor and a round rug */}
      <mesh position={[0, -2.2, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 12]} />
        <meshLambertMaterial color="#171b38" />
      </mesh>
      <mesh position={[0, -2.19, 0.8]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.3, 1, 1]}>
        <circleGeometry args={[2.6, 48]} />
        <Toon color="#34407e" />
      </mesh>
      <mesh position={[0, -2.185, 0.8]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.3, 1, 1]}>
        <ringGeometry args={[2.1, 2.22, 48]} />
        <Flat color={C.lamp} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Desk clutter: a plant, books, and a mug of pens                             */
/* -------------------------------------------------------------------------- */

export function Clutter() {
  return (
    <group>
      {/* potted plant */}
      <group position={[-2.95, 0, -0.2]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.19, 0.14, 0.3, 20]} />
          <Toon color="#d9774f" />
          <Ink t={0.01} />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.19, 0.03, 8, 20]} />
          <Toon color="#e48a62" />
        </mesh>
        {Array.from({ length: 7 }, (_, i) => (i / 7) * Math.PI * 2).map((a, i) => (
          <mesh
            key={a}
            position={[Math.cos(a) * 0.08, 0.48 + (i % 2) * 0.06, Math.sin(a) * 0.08]}
            rotation={[Math.sin(a) * 0.6, a, -Math.cos(a) * 0.6]}
            scale={[0.55, 1.25, 0.25]}
          >
            <sphereGeometry args={[0.14, 12, 10]} />
            <Toon color={i % 2 ? C.matcha : C.matchaDark} />
            <Ink t={0.01} />
          </mesh>
        ))}
      </group>

      {/* a stack of books */}
      <group position={[-1.6, 0, -1.25]} rotation={[0, 0.15, 0]}>
        {[
          [0.7, 0.12, C.blue, 0],
          [0.62, 0.1, "#ffb3c7", 0.08],
          [0.66, 0.11, C.matcha, -0.05],
        ].map(([w, h, c, r], i) => (
          <RoundedBox
            key={i}
            args={[w as number, h as number, 0.46]}
            radius={0.015}
            position={[0, 0.06 + i * 0.115, 0]}
            rotation={[0, r as number, 0]}
          >
            <Toon color={c as string} />
            <Ink t={0.008} />
          </RoundedBox>
        ))}
      </group>

      {/* mug of pens */}
      <group position={[-0.85, 0, -1.3]}>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.32, 20]} />
          <Toon color={C.white} />
          <Ink t={0.008} />
        </mesh>
        <mesh position={[0.15, 0.17, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.07, 0.02, 8, 16, Math.PI]} />
          <Toon color={C.white} />
        </mesh>
        <mesh position={[0, 0.18, 0.131]}>
          <circleGeometry args={[0.05, 16]} />
          <Flat color={C.matcha} />
        </mesh>
        {[
          [-0.04, C.red, 0.15],
          [0.04, C.blue, -0.12],
          [0, C.lamp, 0.02],
        ].map(([x, c, r]) => (
          <mesh key={String(x)} position={[x as number, 0.38, 0]} rotation={[0, 0, r as number]}>
            <cylinderGeometry args={[0.018, 0.018, 0.34, 8]} />
            <Toon color={c as string} />
            <Ink t={0.004} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
