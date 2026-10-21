"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { objectById, type DeskObjectId } from "../objects";
import { C, Flat, Ink, Toon } from "./toon";

/** Where Kobi sits on the desk. */
const BASE = new THREE.Vector3(0.55, 0.15, -0.35);

/**
 * Kobi the koala. Follows the pointer, turns toward whatever's hovered, blinks, and breathes.
 * The speech bubble is a DOM layer (.kobi-anchor) that this component pins above Kobi's head.
 */
export default function Kobi({ hovered, reduceMotion }: { hovered: DeskObjectId | null; reduceMotion: boolean }) {
  const anchor = useRef<HTMLElement | null>(null);
  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const leafArm = useRef<THREE.Group>(null);
  const blink = useRef({ next: 2.5, t: 0 });
  const tmp = useRef(new THREE.Vector3());
  const screen = useRef(new THREE.Vector3());

  useFrame((state, dt) => {
    if (!head.current || !body.current || !eyes.current) return;

    // Pin the DOM speech bubble just above Kobi's head.
    anchor.current ??= document.querySelector<HTMLElement>(".kobi-anchor");
    const el = anchor.current;
    if (el) {
      const p = head.current.getWorldPosition(screen.current);
      p.y += 0.6;
      p.project(state.camera);
      const bubbleWidth = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      // Keep the whole bubble on screen (it sits 16px left of the anchor point).
      const x = THREE.MathUtils.clamp(
        (p.x * 0.5 + 0.5) * state.size.width,
        28,
        Math.max(28, state.size.width - bubbleWidth + 4),
      );
      const y = (-p.y * 0.5 + 0.5) * state.size.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = "1";
    }
    let yaw = 0;
    let pitch = 0;
    if (hovered) {
      // Turn to look at the hovered object.
      const target = tmp.current.set(...objectById[hovered].lookAt).sub(BASE);
      yaw = Math.atan2(target.x, target.z) * 0.9;
      pitch = -Math.atan2(target.y - 0.7, Math.hypot(target.x, target.z)) * 0.6;
    } else {
      // Follow the pointer.
      yaw = state.pointer.x * 0.7 + 0.25;
      pitch = -state.pointer.y * 0.3;
    }
    // Kobi only glances, so its face always stays toward the viewer.
    yaw = THREE.MathUtils.clamp(yaw, -0.55, 0.85);
    pitch = THREE.MathUtils.clamp(pitch, -0.45, 0.35);

    if (reduceMotion) {
      head.current.rotation.set(pitch, yaw, 0);
      return;
    }
    const k = 1 - Math.exp(-dt * 6);
    head.current.rotation.y += (yaw - head.current.rotation.y) * k;
    head.current.rotation.x += (pitch - head.current.rotation.x) * k;

    // Breathing, a happy wiggle while something is hovered, and a little leaf wave.
    const t = state.clock.elapsedTime;
    body.current.scale.y = 1 + Math.sin(t * 2) * 0.015;
    head.current.rotation.z = hovered ? Math.sin(t * 9) * 0.06 : Math.sin(t * 0.8) * 0.03;
    if (leafArm.current) leafArm.current.rotation.z = -0.9 + Math.sin(t * 1.6) * 0.12;

    // Blink every few seconds.
    const b = blink.current;
    b.t += dt;
    let open = 1;
    if (b.t > b.next) {
      const p = (b.t - b.next) / 0.16;
      open = p < 1 ? Math.abs(1 - p * 2) : 1;
      if (p >= 1) {
        b.t = 0;
        b.next = 2 + Math.random() * 3;
      }
    }
    eyes.current.scale.y = Math.max(0.1, open);
  });

  return (
    <group position={BASE.toArray()}>
      {/* a matcha-green cushion to sit on */}
      <mesh position={[0, -0.03, 0.02]} scale={[1, 0.24, 0.9]}>
        <sphereGeometry args={[0.52, 28, 16]} />
        <Toon color={C.matcha} />
        <Ink t={0.04} />
      </mesh>
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 0.0, 0.3]} scale={[1, 0.6, 1]}>
          <sphereGeometry args={[0.05, 10, 8]} />
          <Toon color={C.matchaDark} />
        </mesh>
      ))}

      <group ref={body}>
        {/* body and belly */}
        <mesh position={[0, 0.42, 0]} scale={[1, 1.05, 0.95]}>
          <sphereGeometry args={[0.42, 32, 24]} />
          <Toon color={C.koala} />
          <Ink t={0.016} />
        </mesh>
        <mesh position={[0, 0.38, 0.27]} scale={[1, 1.15, 0.55]}>
          <sphereGeometry args={[0.27, 24, 18]} />
          <Toon color={C.koalaLight} />
        </mesh>
        {/* chest fluff */}
        {[-0.08, 0, 0.08].map((x, i) => (
          <mesh key={x} position={[x, 0.6 - (i % 2) * 0.03, 0.33]}>
            <sphereGeometry args={[0.06, 10, 8]} />
            <Toon color={C.koalaLight} />
          </mesh>
        ))}
        {/* feet with pink pads */}
        {[-0.22, 0.22].map((x) => (
          <group key={x} position={[x, 0.09, 0.3]}>
            <mesh scale={[1, 0.7, 1.2]}>
              <sphereGeometry args={[0.13, 16, 12]} />
              <Toon color={C.koala} />
              <Ink t={0.01} />
            </mesh>
            <mesh position={[0, 0.01, 0.15]} scale={[1, 0.8, 0.4]}>
              <sphereGeometry args={[0.065, 12, 10]} />
              <Toon color={C.koalaPink} />
            </mesh>
          </group>
        ))}
        {/* left arm resting on the belly */}
        <mesh position={[-0.32, 0.42, 0.18]} rotation={[0.5, 0, 0.7]}>
          <capsuleGeometry args={[0.08, 0.2, 6, 12]} />
          <Toon color={C.koala} />
          <Ink t={0.01} />
        </mesh>
        {/* right arm holding up a eucalyptus sprig */}
        <group ref={leafArm} position={[0.3, 0.5, 0.12]} rotation={[0.3, 0, -0.9]}>
          <mesh position={[0, 0.14, 0]}>
            <capsuleGeometry args={[0.08, 0.2, 6, 12]} />
            <Toon color={C.koala} />
            <Ink t={0.01} />
          </mesh>
          <group position={[0, 0.3, 0.04]}>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.26, 5]} />
              <Toon color={C.woodDark} />
            </mesh>
            {[
              [0.05, 0.08, -0.6],
              [-0.05, 0.14, 0.6],
              [0.04, 0.2, -0.5],
              [0, 0.25, 0],
            ].map(([x, y, r]) => (
              <mesh key={y} position={[x, y, 0]} rotation={[0, 0, r]} scale={[0.55, 1, 0.2]}>
                <sphereGeometry args={[0.05, 10, 8]} />
                <Toon color="#8fbf88" />
                <Ink t={0.005} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* head */}
      <group ref={head} position={[0, 1.0, 0]}>
        <mesh scale={[1.05, 0.95, 0.95]}>
          <sphereGeometry args={[0.4, 32, 24]} />
          <Toon color={C.koala} />
          <Ink t={0.016} />
        </mesh>
        {/* a tuft of fur on top */}
        {[-0.05, 0.04].map((x, i) => (
          <mesh key={x} position={[x, 0.39, 0.02]} rotation={[0, 0, i ? -0.4 : 0.3]} scale={[0.6, 1, 0.6]}>
            <sphereGeometry args={[0.06, 10, 8]} />
            <Toon color={C.koala} />
          </mesh>
        ))}
        {/* big fluffy ears with white tufts */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.37, 0.22, -0.02]}>
            <mesh scale={[1, 1, 0.55]}>
              <sphereGeometry args={[0.23, 24, 18]} />
              <Toon color={C.koala} />
              <Ink t={0.014} />
            </mesh>
            <mesh position={[0, 0, 0.07]} scale={[1, 1, 0.4]}>
              <sphereGeometry args={[0.15, 20, 16]} />
              <Toon color={C.koalaPink} />
            </mesh>
            {[
              [0.08, 0.05],
              [0.1, -0.06],
              [0.02, -0.12],
            ].map(([x, y]) => (
              <mesh key={y} position={[s * x, y, 0.1]}>
                <sphereGeometry args={[0.05, 10, 8]} />
                <Toon color={C.koalaLight} />
              </mesh>
            ))}
          </group>
        ))}
        {/* nose, with a shine */}
        <mesh position={[0, -0.04, 0.36]} scale={[0.8, 1.05, 0.6]}>
          <sphereGeometry args={[0.13, 24, 18]} />
          <Toon color={C.ink} />
          <Ink t={0.006} />
        </mesh>
        <mesh position={[-0.035, 0.03, 0.43]} scale={[1, 0.6, 1]}>
          <sphereGeometry args={[0.02, 8, 6]} />
          <Flat color="#ffffff" />
        </mesh>
        {/* smile */}
        <mesh position={[0, -0.2, 0.33]} rotation={[0.3, 0, Math.PI]}>
          <torusGeometry args={[0.04, 0.008, 6, 12, Math.PI]} />
          <Flat color={C.ink} />
        </mesh>
        {/* eyes */}
        <group ref={eyes} position={[0, 0.08, 0.34]}>
          {[-0.16, 0.16].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.058, 16, 12]} />
                <Toon color={C.ink} />
              </mesh>
              <mesh position={[0.02, 0.022, 0.045]}>
                <sphereGeometry args={[0.018, 8, 6]} />
                <Flat color="#ffffff" />
              </mesh>
              <mesh position={[-0.015, -0.02, 0.05]}>
                <sphereGeometry args={[0.008, 6, 5]} />
                <Flat color="#ffffff" />
              </mesh>
            </group>
          ))}
        </group>
        {/* cheeks */}
        {[-0.25, 0.25].map((x) => (
          <mesh key={x} position={[x, -0.1, 0.3]} scale={[1, 0.6, 0.3]}>
            <sphereGeometry args={[0.065, 12, 10]} />
            <Flat color={C.koalaPink} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
