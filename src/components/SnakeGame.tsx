"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

type Point = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const directionRef = useRef(direction);
  
  // Track high score in local storage if possible
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Make sure food doesn't spawn on the snake
      const onSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      const { x, y } = directionRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (y !== 1) directionRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (y !== -1) directionRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (x !== 1) directionRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (x !== -1) directionRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          handleGameOver();
          return prevSnake;
        }

        // Check self collision
        if (
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          handleGameOver();
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        setDirection(directionRef.current);
        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 120); // Snake speed
    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, food, generateFood]);

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    setHighScore((prev) => {
      const newHigh = Math.max(prev, score);
      localStorage.setItem("snakeHighScore", newHigh.toString());
      return newHigh;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center font-mono">
      {/* Score Board */}
      <div className="flex w-full max-w-[400px] justify-between items-center mb-4 px-2">
        <div className="text-muted">
          Score: <span className="text-accent font-bold text-xl">{score}</span>
        </div>
        <div className="text-muted">
          Best: <span className="text-foreground font-bold">{highScore}</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl p-4">
        <div
          className="grid bg-black/40 border border-white/5"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: "min(90vw, 400px)",
            height: "min(90vw, 400px)",
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.some((segment, idx) => idx !== 0 && segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className={`w-full h-full ${
                  isSnakeHead
                    ? "bg-accent rounded-sm scale-95"
                    : isSnakeBody
                    ? "bg-accent/80 rounded-sm scale-90"
                    : isFood
                    ? "bg-red-500 rounded-full scale-75 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                    : ""
                }`}
              />
            );
          })}
        </div>

        {/* Overlays */}
        {(!isPlaying && !gameOver) && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Terminal Snake</h3>
            <p className="text-muted text-sm mb-6">Use Arrow Keys or WASD to move.</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-red-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-2">Game Over</h3>
            <p className="text-white/80 mb-6">You scored {score} points!</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      {/* Mobile Controls Hint */}
      <p className="mt-6 text-xs text-muted/60 max-w-[300px] text-center">
        Note: Best played on a desktop keyboard. If you are on mobile, an external keyboard is required to play.
      </p>
    </div>
  );
}
