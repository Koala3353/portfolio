"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "@phosphor-icons/react";

const GRID = 20;
const TICK_MS = 120;
const STORAGE_KEY = "snakeHighScore";

type Point = { x: number; y: number };
type Status = "ready" | "playing" | "over";

const START: Point[] = [{ x: 10, y: 10 }];
const UP: Point = { x: 0, y: -1 };
const DOWN: Point = { x: 0, y: 1 };
const LEFT: Point = { x: -1, y: 0 };
const RIGHT: Point = { x: 1, y: 0 };

const KEYS: Record<string, Point> = {
  ArrowUp: UP, w: UP, W: UP,
  ArrowDown: DOWN, s: DOWN, S: DOWN,
  ArrowLeft: LEFT, a: LEFT, A: LEFT,
  ArrowRight: RIGHT, d: RIGHT, D: RIGHT,
};

/* High score store (localStorage), read lazily via useSyncExternalStore. */
const listeners = new Set<() => void>();
function readHighScore() {
  try {
    return parseInt(window.localStorage.getItem(STORAGE_KEY) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}
function writeHighScore(v: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(v));
  } catch {}
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Random free cell, or null when the board is full. */
function generateFood(snake: Point[]): Point | null {
  const taken = new Set(snake.map((p) => p.y * GRID + p.x));
  const free: number[] = [];
  for (let i = 0; i < GRID * GRID; i++) if (!taken.has(i)) free.push(i);
  if (free.length === 0) return null;
  const i = free[Math.floor(Math.random() * free.length)];
  return { x: i % GRID, y: Math.floor(i / GRID) };
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(START);
  const [food, setFood] = useState<Point | null>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<Status>("ready");
  const highScore = useSyncExternalStore(subscribe, readHighScore, () => 0);

  const snakeRef = useRef<Point[]>(START);
  const foodRef = useRef<Point | null>({ x: 5, y: 5 });
  const dirRef = useRef<Point>(UP); // direction applied on the last tick
  const nextDirRef = useRef<Point>(UP); // queued direction for the next tick
  const scoreRef = useRef(0);

  const endGame = useCallback(() => {
    setStatus("over");
    if (scoreRef.current > readHighScore()) writeHighScore(scoreRef.current);
  }, []);

  const tick = useCallback(() => {
    const dir = nextDirRef.current;
    dirRef.current = dir;
    const body = snakeRef.current;
    const head = { x: body[0].x + dir.x, y: body[0].y + dir.y };

    const eats = foodRef.current !== null && head.x === foodRef.current.x && head.y === foodRef.current.y;
    // Tail moves away this tick unless we eat, so it doesn't count as a collision.
    const obstacles = eats ? body : body.slice(0, -1);
    const hitWall = head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID;
    if (hitWall || obstacles.some((p) => p.x === head.x && p.y === head.y)) {
      endGame();
      return;
    }

    const next = [head, ...obstacles];
    snakeRef.current = next;
    setSnake(next);

    if (eats) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      const f = generateFood(next);
      foodRef.current = f;
      setFood(f);
      if (f === null) endGame(); // board full
    }
  }, [endGame]);

  const start = useCallback(() => {
    const f = generateFood(START);
    snakeRef.current = START;
    foodRef.current = f;
    dirRef.current = UP;
    nextDirRef.current = UP;
    scoreRef.current = 0;
    setSnake(START);
    setFood(f);
    setScore(0);
    setStatus("playing");
  }, []);

  const steer = useCallback((d: Point) => {
    const cur = dirRef.current;
    if (d.x === -cur.x && d.y === -cur.y) return; // no 180-degree reversal
    nextDirRef.current = d;
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [status, tick]);

  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const d = KEYS[e.key];
      if (!d) return;
      e.preventDefault(); // only while playing
      steer(d);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, steer]);

  const press = (d: Point) => {
    if (status !== "playing") start();
    steer(d);
  };

  const cells = new Map<number, "head" | "body" | "food">();
  if (food) cells.set(food.y * GRID + food.x, "food");
  snake.forEach((p, i) => cells.set(p.y * GRID + p.x, i === 0 ? "head" : "body"));

  return (
    <div className="flex flex-col items-center font-mono text-sm">
      <div className="mb-3 flex w-full justify-between text-subtle" aria-live="polite">
        <span>
          Score <span className="tabular font-semibold text-fg">{score}</span>
        </span>
        <span>
          Best <span className="tabular font-semibold text-fg">{Math.max(highScore, status === "over" ? score : 0)}</span>
        </span>
      </div>

      <div className="surface relative w-full overflow-hidden p-2">
        <div
          role="img"
          aria-label={`Snake board, ${GRID} by ${GRID}. Snake length ${snake.length}.`}
          className="grid aspect-square w-full rounded-lg border border-line bg-surface-2"
          style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
        >
          {Array.from({ length: GRID * GRID }, (_, i) => {
            const c = cells.get(i);
            return (
              <div
                key={i}
                className={
                  c === "head"
                    ? "m-px rounded-[3px] bg-fg"
                    : c === "body"
                      ? "m-[2px] rounded-[3px] bg-fg/75"
                      : c === "food"
                        ? "m-[3px] rounded-full bg-accent"
                        : ""
                }
              />
            );
          })}
        </div>

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/85 p-6 text-center">
            <p className="font-sans text-2xl font-semibold text-fg">
              {status === "over" ? "Game over" : "Snake"}
            </p>
            <p className="mt-2 text-muted">
              {status === "over" ? `You scored ${score} points.` : "Arrow keys or WASD to move."}
            </p>
            <button type="button" onClick={start} className="btn btn-primary mt-6 font-sans">
              {status === "over" ? "Play again" : "Start game"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden" aria-label="Direction controls" role="group">
        <span />
        <DirButton label="Up" onPress={() => press(UP)} icon={<ArrowUp size={20} aria-hidden />} />
        <span />
        <DirButton label="Left" onPress={() => press(LEFT)} icon={<ArrowLeft size={20} aria-hidden />} />
        <DirButton label="Down" onPress={() => press(DOWN)} icon={<ArrowDown size={20} aria-hidden />} />
        <DirButton label="Right" onPress={() => press(RIGHT)} icon={<ArrowRight size={20} aria-hidden />} />
      </div>
      <p className="mt-4 hidden text-subtle md:block">Arrow keys or WASD to move.</p>
    </div>
  );
}

function DirButton({ label, icon, onPress }: { label: string; icon: React.ReactNode; onPress: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPress();
        }
      }}
      className="flex size-14 touch-none items-center justify-center rounded-2xl border border-line bg-surface text-fg transition-colors active:bg-surface-2"
    >
      {icon}
    </button>
  );
}
