"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { daylight } from "./daylight";
import { reportDeskCrash } from "./homeMode";
import type { DeskObjectId } from "./objects";
import Kobi from "./scene/Kobi";
import { Laptop, Lamp, MatchaJar, Notebook, Phone, Printer, StickyNotes, Trophies, Whiteboard } from "./scene/props";
import { Clutter, Desk, Room } from "./scene/room";

export type SceneProps = {
  hovered: DeskObjectId | null;
  onHover: (id: DeskObjectId | null) => void;
  onSelect: (id: DeskObjectId) => void;
  reduceMotion: boolean;
  /** The object the camera is zoomed into, if any. Objects ignore the pointer while zoomed. */
  focus: DeskObjectId | null;
  /** Called once the first frame has been drawn. */
  onReady: () => void;
  /** The visitor's local time of day, in hours; sets sunrise, day, sunset, or night. */
  hour: number;
};

/* -------------------------------------------------------------------------- */
/* Interactive wrapper: lifts and glows on hover, opens a section on click     */
/* -------------------------------------------------------------------------- */

function Interactive({
  id,
  hovered,
  onHover,
  onSelect,
  reduceMotion,
  children,
  position,
  lift = 0.12,
  locked,
}: {
  id: DeskObjectId;
  position: [number, number, number];
  lift?: number;
  locked: boolean;
  children: ReactNode;
} & Pick<SceneProps, "hovered" | "onHover" | "onSelect" | "reduceMotion">) {
  const group = useRef<THREE.Group>(null);
  const active = hovered === id;

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const targetY = position[1] + (active ? lift : 0);
    const targetS = active ? 1.04 : 1;
    if (reduceMotion) {
      g.position.y = targetY;
      g.scale.setScalar(targetS);
      return;
    }
    const k = 1 - Math.exp(-dt * 12);
    g.position.y += (targetY - g.position.y) * k;
    g.scale.setScalar(g.scale.x + (targetS - g.scale.x) * k);
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        if (locked) return;
        e.stopPropagation();
        onHover(id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        if (locked) return;
        onHover(null);
        document.body.style.cursor = "";
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        if (locked) return;
        e.stopPropagation();
        document.body.style.cursor = "";
        onSelect(id);
      }}
    >
      {children}
    </group>
  );
}

/** Half the camera's vertical field of view (fov 32), as a tangent. */
const HALF_FOV = Math.tan(THREE.MathUtils.degToRad(16));

/**
 * How the camera frames each object up close. `dir` points from the object toward the camera,
 * in the object's own space; `w`/`h` is the area to fit, in scene units.
 * `full` objects (laptop, notebook) fill the screen; the rest leave room for their panel,
 * which sits on the right on wide screens and along the bottom on tall ones.
 */
const FRAMES: Record<DeskObjectId, { dir: [number, number, number]; w: number; h: number; pad: number; full?: boolean }> = {
  laptop: { dir: [0, 0, 1], w: 1.56, h: 0.94, pad: 1.02, full: true },
  notebook: { dir: [0, 1, 0.14], w: 1.9, h: 1.25, pad: 1.05, full: true },
  whiteboard: { dir: [0.1, 0, 1], w: 2.4, h: 1.45, pad: 1.12 },
  sticky: { dir: [0, 0, 1], w: 0.8, h: 0.8, pad: 1.25 },
  trophies: { dir: [-0.1, 0.25, 1], w: 1.6, h: 0.75, pad: 1.15 },
  printer: { dir: [0, 0.8, 1], w: 1.2, h: 1.1, pad: 1.15 },
  matcha: { dir: [0.15, 0.3, 1], w: 1.6, h: 1.5, pad: 1.25 },
  phone: { dir: [0, 1, 0.3], w: 0.45, h: 0.8, pad: 1.3 },
};

/**
 * Frames the desk for any aspect ratio, with a little pointer parallax.
 * When something is picked up, flies in to frame it.
 */
function CameraRig({ focus, reduceMotion }: { focus: DeskObjectId | null; reduceMotion: boolean }) {
  const { camera, size, scene, invalidate } = useThree();
  const look = useRef(new THREE.Vector3(0.1, 0.9, 0));
  const v = useMemo(
    () => ({
      pos: new THREE.Vector3(),
      target: new THREE.Vector3(),
      n: new THREE.Vector3(),
      right: new THREE.Vector3(),
      up: new THREE.Vector3(),
      shift: new THREE.Vector3(),
      worldUp: new THREE.Vector3(0, 1, 0),
    }),
    [],
  );

  // With reduced motion the scene only renders on demand, so ask for a frame when the view changes.
  useEffect(() => invalidate(), [focus, invalidate]);

  useFrame((state, dt) => {
    const aspect = size.width / size.height;
    const portrait = aspect < 0.95;
    const { pos, target, n, right, up, shift, worldUp } = v;
    const marker = focus && scene.getObjectByName(`focus-${focus}`);

    if (focus && marker) {
      const f = FRAMES[focus];
      marker.getWorldPosition(target);
      n.set(...f.dir).transformDirection(marker.matrixWorld);
      shift.set(0, 0, 0);
      let d: number;
      if (f.full) {
        d = Math.max(f.h / 2 / HALF_FOV, f.w / 2 / (HALF_FOV * aspect)) * f.pad;
      } else {
        // Screen-space directions, to slide the object out from under its panel.
        right.crossVectors(n, worldUp).negate().normalize();
        up.crossVectors(right, n).negate().normalize();
        if (portrait) {
          // Object in the top ~40%, panel below.
          d = Math.max(f.h / 2 / (HALF_FOV * 0.4), f.w / 2 / (HALF_FOV * aspect)) * f.pad;
          shift.addScaledVector(up, -0.54 * d * HALF_FOV);
        } else {
          // Object in the left ~55%, panel on the right.
          d = Math.max(f.h / 2 / HALF_FOV, f.w / 2 / (HALF_FOV * aspect * 0.55)) * f.pad;
          shift.addScaledVector(right, 0.44 * d * HALF_FOV * aspect);
        }
      }
      target.add(shift);
      pos.copy(target).addScaledVector(n, d);
    } else {
      // Pull back on narrow screens so the whole desk stays in frame.
      const dist = portrait ? 13 / Math.max(aspect, 0.42) ** 0.85 : aspect < 1.4 ? 11.5 : 10;
      const px = reduceMotion ? 0 : state.pointer.x * 0.6;
      const py = reduceMotion ? 0 : state.pointer.y * 0.35;
      // Tall screens get a more front-on angle, so the desk's width fits.
      const side = portrait ? 1.6 : 4.6;
      target.set(portrait ? 0.75 : 0.1, portrait ? 1.35 : 0.9, 0);
      pos.set(side + px, 4.4 + py, 7.6).normalize().multiplyScalar(dist);
    }

    if (reduceMotion) {
      camera.position.copy(pos);
      look.current.copy(target);
    } else {
      const k = 1 - Math.exp(-dt * 3.2);
      camera.position.lerp(pos, k);
      look.current.lerp(target, k);
    }
    camera.lookAt(look.current);
  });
  return null;
}

export default function DeskScene(props: SceneProps) {
  const { hovered, reduceMotion, focus, onReady, hour } = props;
  const light = daylight(hour);
  // R3F forces a context loss when the canvas unmounts; stop listening first so leaving isn't a "crash".
  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    return () => canvasEl.current?.removeEventListener("webglcontextlost", reportDeskCrash);
  }, []);
  const glow = (id: DeskObjectId) => hovered === id;
  const open = (id: DeskObjectId) => ({ glow: glow(id) && focus !== id, open: focus === id, reduceMotion });
  const common = {
    hovered: props.hovered,
    onHover: props.onHover,
    onSelect: props.onSelect,
    reduceMotion,
    locked: focus !== null,
  };

  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.5]}
      camera={{ fov: 32, position: [6, 6, 9], near: 0.05, far: 60 }}
      frameloop={reduceMotion ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerMissed={() => props.onHover(null)}
      onCreated={({ gl }) => {
        canvasEl.current = gl.domElement;
        gl.domElement.addEventListener("webglcontextlost", reportDeskCrash);
        // onCreated runs before the first frame; two frames later the desk is on screen.
        requestAnimationFrame(() => requestAnimationFrame(onReady));
      }}
      aria-hidden="true"
    >
      <hemisphereLight color={light.hemiSky} groundColor={light.hemiGround} intensity={light.hemiIntensity} />
      <directionalLight position={[3, 7, 5]} color={light.sunColor} intensity={light.sunIntensity} />
      <Lamp reduceMotion={reduceMotion} on={light.lamp} />
      <CameraRig focus={focus} reduceMotion={reduceMotion} />

      <Room light={light} hour={hour} />
      <Desk />
      <Clutter />

      <Interactive id="laptop" position={[-0.9, 0.035, 0.15]} {...common}>
        <Laptop {...open("laptop")} />
      </Interactive>
      <Interactive id="notebook" position={[-2.0, 0.045, 0.95]} {...common}>
        <Notebook {...open("notebook")} />
      </Interactive>
      <Interactive id="matcha" position={[1.7, 0, 0.35]} {...common}>
        <MatchaJar {...open("matcha")} />
      </Interactive>
      <Interactive id="phone" position={[0.75, 0.02, 1.05]} {...common}>
        <Phone {...open("phone")} />
      </Interactive>
      <Interactive id="printer" position={[2.55, 0, -0.75]} {...common}>
        <Printer {...open("printer")} />
      </Interactive>
      <Interactive id="whiteboard" position={[-0.55, 2.45, -1.78]} lift={0.06} {...common}>
        <Whiteboard {...open("whiteboard")} />
      </Interactive>
      <Interactive id="sticky" position={[1.05, 2.75, -1.79]} lift={0.06} {...common}>
        <StickyNotes {...open("sticky")} />
      </Interactive>
      <Interactive id="trophies" position={[2.35, 1.9, -1.6]} lift={0.06} {...common}>
        <Trophies {...open("trophies")} />
      </Interactive>

      <Kobi hovered={hovered} reduceMotion={reduceMotion} />

      <ContactShadows position={[0, 0.002, 0]} opacity={0.35} scale={7} blur={2.4} far={2} frames={1} />
    </Canvas>
  );
}
