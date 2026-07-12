import { Action, GameState } from "./types";
import {
  createBlock,
  createEmptyGrid,
  isCollide,
  mergeBlockAndClearRows,
  moveBlock,
  rotateShape,
} from "./utils";

export function gameReducer(state: GameState, action: Action): GameState {
  if (action.type === "PAUSE")
    return {
      ...state,
      isPause: !state.isPause,
    };

  if (action.type === "RESTART") {
    return {
      grid: createEmptyGrid(),
      block: createBlock(),
      score: 0,
      isGameOver: false,
      isPause: false,
    };
  }

  if (state.isGameOver || state.isPause) return state;

  switch (action.type) {
    case "TICK": {
      // Next location of block after drop
      const nextBlock = moveBlock(state.block, 1, 0);
      // Check collision
      if (isCollide(nextBlock, state.grid)) {
        const result = mergeBlockAndClearRows(state.grid, state.block);
        const newBlock = createBlock();

        if (isCollide(newBlock, result.grid)) {
          // Game over
          return {
            ...state,
            block: newBlock,
            grid: result.grid,
            score: state.score + result.score,
            isGameOver: true,
          };
        }

        return {
          ...state,
          grid: result.grid,
          block: newBlock,
          score: state.score + result.score,
        };
      }
      return {
        ...state,
        block: nextBlock,
      };
    }
    case "UP": {
      const currentBlock = { ...state.block };
      let nextBlock = currentBlock;

      nextBlock.shape = rotateShape(state.block.shape);
      if (isCollide(nextBlock, state.grid)) {
        return state;
      }
      return { ...state, block: nextBlock };
    }
    case "DOWN": {
      const nextBlock = moveBlock(state.block, 1, 0);
      if (isCollide(nextBlock, state.grid)) {
        return state;
      }
      return { ...state, block: nextBlock };
    }

    case "LEFT": {
      const nextBlock = moveBlock(state.block, 0, -1);
      if (isCollide(nextBlock, state.grid)) {
        return state;
      }
      return { ...state, block: nextBlock };
    }

    case "RIGHT": {
      const nextBlock = moveBlock(state.block, 0, 1);
      if (isCollide(nextBlock, state.grid)) {
        return state;
      }
      return {
        ...state,
        block: nextBlock,
      };
    }

    default:
      return state;
  }
}
