import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ROWS = 15;
const COLS = 20;

const getRandomColor = () => {
  const colors = ["#00FFFF", "#FF69B4", "#7FFF00", "#FFA500", "#9400D3"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const createInitialGrid = () => {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ active: false, color: "" }))
  );
};

export default function FallingRainGrid() {
  const [grid, setGrid] = useState(createInitialGrid());

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prev) => {
        const newGrid = createInitialGrid();
        for (let col = 0; col < COLS; col++) {
          if (Math.random() < 0.3) {
            let dropLength = Math.floor(Math.random() * (ROWS / 2)) + 1;
            for (let i = 0; i < dropLength; i++) {
              const row = i;
              if (row < ROWS) {
                newGrid[row][col] = { active: true, color: getRandomColor() };
              }
            }
          }
        }
        return newGrid;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="grid" style={{
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gap: "2px",
        width: "80vw",
        height: "80vh",
      }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={cn("w-full h-full transition-all duration-200", cell.active ? "opacity-100" : "opacity-10")}
              style={{ backgroundColor: cell.active ? cell.color : "#1f1f1f" }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
