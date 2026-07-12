export type Cell = number | null;
export type Position = {
  row: number;
  col: number;
};
export type Shape = 1 | 0 | null;
export type BlockType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
export type BlockProps = {
  position: Position;
  shape: Shape[][];
};
export type GameState = {
  grid: Cell[][];
  block: BlockProps;
  score: number;
  isGameOver: boolean;
  isPause: boolean;
};
export type Action = {
  type: "TICK" | "LEFT" | "RIGHT" | "UP" | "DOWN" | "PAUSE" | "RESTART";
};
