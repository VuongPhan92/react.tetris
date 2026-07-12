import type { Cell } from "../types";

type GridProps = {
  grid: Cell[][];
};

export default function Grid({ grid }: GridProps) {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${col === 1 ? "filled" : ""}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
