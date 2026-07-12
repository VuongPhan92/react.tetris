import {
  BLOCKTYPES,
  DEFAULTCOLS,
  DEFAULTROWS,
  DEFAULTROWSCORE,
  Shapes,
} from "./constanst";
import { BlockProps, BlockType, Cell, Shape } from "./types";

export function createEmptyGrid(): Cell[][] {
  // read later
  return Array.from({ length: DEFAULTROWS }, () =>
    Array(DEFAULTCOLS).fill(null),
  );
}

export function moveBlock(
  block: BlockProps,
  moveRow: number,
  moveCol: number,
): BlockProps {
  return {
    ...block,
    position: {
      col: block.position.col + moveCol,
      row: block.position.row + moveRow,
    },
  };
}

export function randomBlock(): BlockType {
  var randomIndex = Math.floor(Math.random() * BLOCKTYPES.length);

  return BLOCKTYPES[randomIndex];
}

export function showBlockInGrid(grid: Cell[][], block: BlockProps): Cell[][] {
  // Copy to next state of grid
  const nextGrid = grid.map((row) => [...row]);
  // Get current block position after drop
  const blockRow = block.position.row;
  const blockCol = block.position.col;
  // Set value
  for (let i = 0; i < block.shape.length; i++) {
    for (let j = 0; j < block.shape[i].length; j++) {
      if (block.shape[i][j] === 1) {
        nextGrid[blockRow + i][blockCol + j] = block.shape[i][j];
      }
    }
  }
  // Bước 4: return newGrid
  return nextGrid;
}

export function mergeBlockAndClearRows(
  grid: Cell[][],
  block: BlockProps,
): { grid: Cell[][]; score: number } {
  const mergedBlockInGrid = showBlockInGrid(grid, block);
  return clearFullRowInGrid(mergedBlockInGrid);
}

export function clearFullRowInGrid(grid: Cell[][]): {
  grid: Cell[][];
  score: number;
} {
  const remainingRow = grid.filter((row) => !row.every((col) => col === 1));
  const rowToClear = DEFAULTROWS - remainingRow.length;
  const score = DEFAULTROWSCORE * rowToClear;

  const rowToAdd: Cell[][] = Array.from({ length: rowToClear }, () =>
    Array.from({ length: DEFAULTCOLS }, () => null),
  );

  return { grid: [...rowToAdd, ...remainingRow], score: score };

  // let startIndex = grid.length;
  // for (let i = grid.length - 1; i >= 0; i--) {
  //   if (grid[i].every((col) => col === 1)) {
  //     startIndex = i;
  //   }
  // }
  // const rowToModified = grid.length - startIndex;
  // const rowToAdd = Array.from({ length: rowToModified }).fill(null);
  // let nextGrid: Cell[][] = Array.from(grid.splice(startIndex, rowToModified));
  // return [...rowToAdd, nextGrid] as Cell[][];
}

export function createBlock(): BlockProps {
  const newBlock = randomBlock();
  return {
    position: { row: 0, col: 4 },
    shape: Shapes[newBlock].map((row) => [...row]),
  };
}

export function rotateShape(shape: Shape[][]): Shape[][] {
  const row = shape.length;
  const col = shape[0].length;

  const newShape: Shape[][] = Array.from({ length: col }, (_, colIndex) =>
    Array(row).fill(0),
  );

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      newShape[j][row - 1 - i] = shape[i][j];
    }
  }

  return newShape;
}

export function isCollide(block: BlockProps, grid: Cell[][]): boolean {
  const currentRow = block.position.row;
  const currentCol = block.position.col;

  for (let i = 0; i < block.shape.length; i++) {
    for (let j = 0; j < block.shape[i].length; j++) {
      if (block.shape[i][j] === 1) {
        const lastRow = currentRow + i;
        const lastCol = currentCol + j;

        // Check collided with borders
        if (lastRow >= DEFAULTROWS || lastCol < 0 || lastCol >= DEFAULTCOLS)
          return true;
        // Collided
        if (grid[lastRow][lastCol] !== null) return true;
      }
    }
  }
  return false;
}
