import { BlockType, Shape } from "./types";

export const DEFAULTROWS = 20;
export const DEFAULTCOLS = 10;
export const DEFAULTROWSCORE = 100;
export const BLOCKTYPES: BlockType[] = ["I", "O", "T", "S", "Z", "J", "L"];
export const Shapes: Record<BlockType, Shape[][]> = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
};
