/**
 * Time of day for the desk, from the visitor's own clock.
 * A handful of keyframes (night, sunrise, day, sunset) are blended by hour, so the room
 * drifts from one to the next instead of switching.
 */

export type Daylight = {
  /** Window sky, top and horizon. */
  skyTop: string;
  skyBottom: string;
  wall: string;
  wallLow: string;
  floor: string;
  /** Ambient light from above and bounce from below. */
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  /** Sun (or moon) light. */
  sunColor: string;
  sunIntensity: number;
  /** 0 = off, 1 = on: the desk lamp. */
  lamp: number;
  /** 0 = day, 1 = full night: moon, stars, lit windows, string lights. */
  night: number;
  /** 0 = dark room, 1 = bright room: picks light or dark text over the scene. */
  bright: number;
  /** Page background around the scene. */
  bgA: string;
  bgB: string;
};

const NIGHT: Daylight = {
  skyTop: "#0e1534",
  skyBottom: "#1d2a5c",
  wall: "#2c3566",
  wallLow: "#222a55",
  floor: "#171b38",
  hemiSky: "#aab8ff",
  hemiGround: "#2a1e18",
  hemiIntensity: 0.55,
  sunColor: "#b9c6ff",
  sunIntensity: 0.9,
  lamp: 1,
  night: 1,
  bright: 0,
  bgA: "#252c52",
  bgB: "#1b2140",
};

const SUNRISE: Daylight = {
  skyTop: "#7c93d8",
  skyBottom: "#ffb48c",
  wall: "#9b8fc2",
  wallLow: "#8279ae",
  floor: "#3d3560",
  hemiSky: "#ffd6b8",
  hemiGround: "#4a3428",
  hemiIntensity: 0.85,
  sunColor: "#ffc49a",
  sunIntensity: 1.3,
  lamp: 0.15,
  night: 0,
  bright: 0.6,
  bgA: "#a497c8",
  bgB: "#857bb0",
};

const DAY: Daylight = {
  skyTop: "#5fb0f0",
  skyBottom: "#c4e8ff",
  wall: "#cdd6f1",
  wallLow: "#b5c1e6",
  floor: "#8578a6",
  hemiSky: "#ffffff",
  hemiGround: "#8a6a50",
  hemiIntensity: 1.05,
  sunColor: "#fff6e6",
  sunIntensity: 1.6,
  lamp: 0,
  night: 0,
  bright: 1,
  bgA: "#dbe2f6",
  bgB: "#c6d0ef",
};

const SUNSET: Daylight = {
  skyTop: "#57489a",
  skyBottom: "#ff985a",
  wall: "#8c71a0",
  wallLow: "#715b8b",
  floor: "#3a2e52",
  hemiSky: "#ffc08a",
  hemiGround: "#3a2620",
  hemiIntensity: 0.8,
  sunColor: "#ff9f6b",
  sunIntensity: 1.2,
  lamp: 0.85,
  night: 0.25,
  bright: 0.35,
  bgA: "#8e72a6",
  bgB: "#6c5690",
};

/** Hour of day → look. Between keyframes the values blend linearly. */
const KEYS: [number, Daylight][] = [
  [0, NIGHT],
  [5, NIGHT],
  [6.25, SUNRISE],
  [8, DAY],
  [16.5, DAY],
  [18.25, SUNSET],
  [19.5, NIGHT],
  [24, NIGHT],
];

function mixHex(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (shift: number) => {
    const x = (pa >> shift) & 255;
    const y = (pb >> shift) & 255;
    return Math.round(x + (y - x) * t);
  };
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}

export function mix(a: string, b: string, t: number) {
  return mixHex(a, b, Math.min(1, Math.max(0, t)));
}

export function daylight(hour: number): Daylight {
  const h = ((hour % 24) + 24) % 24;
  let i = 0;
  while (i < KEYS.length - 2 && h >= KEYS[i + 1][0]) i++;
  const [h0, a] = KEYS[i];
  const [h1, b] = KEYS[i + 1];
  const t = h1 === h0 ? 0 : (h - h0) / (h1 - h0);
  const out = {} as Daylight;
  for (const k of Object.keys(a) as (keyof Daylight)[]) {
    const va = a[k];
    const vb = b[k];
    (out as Record<string, string | number>)[k] =
      typeof va === "number" ? va + ((vb as number) - va) * t : mixHex(va, vb as string, t);
  }
  return out;
}

/**
 * Where the sun sits in the window (x and y within the pane, -1..1), or null at night.
 * It rises bottom-left around 6:00, peaks at midday, and sets bottom-right around 19:00.
 */
export function sunInWindow(hour: number): { x: number; y: number } | null {
  const t = (hour - 5.5) / (19.5 - 5.5);
  if (t <= 0 || t >= 1) return null;
  return { x: -0.75 + t * 1.5, y: -0.75 + Math.sin(t * Math.PI) * 1.4 };
}

/** What Kobi says first, by time of day. */
export function greeting(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  if (h < 5) return "Keene's still up? Me too. This is Keene's desk. Click anything on it.";
  if (h < 12) return "Good morning! I'm Kobi. This is Keene's desk. Click anything on it.";
  if (h < 18) return "Good afternoon! I'm Kobi. This is Keene's desk. Click anything on it.";
  return "Good evening! I'm Kobi. This is Keene's desk. Click anything on it.";
}
