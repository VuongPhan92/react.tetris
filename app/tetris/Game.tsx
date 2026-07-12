import { useReducer, useEffect } from "react";
import GameStat from "./components/GameStat";
import Grid from "./components/Grid";
import { gameReducer } from "./reducer";
import { createBlock, createEmptyGrid, showBlockInGrid } from "./utils";

export default function Game() {
  // const [gameState, setGameState] = useState<GameState>(() => ({
  //   grid: createEmptyGrid(),
  //   block: createBlock(OShape),
  // }));

  const [gameState, dispatch] = useReducer(gameReducer, undefined, () => ({
    grid: createEmptyGrid(),
    block: createBlock(),
    score: 0,
    isGameOver: false,
    isPause: false,
  }));

  function handleRestart() {
    dispatch({ type: "RESTART" });
  }

  useEffect(() => {
    // Every 500ms, block drop 1 position
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
      // setGameState((current) => {
      //   const nextBlock = moveBlock(current.block, 1, 0);
      //   //next block Collided
      //   if (isCollide(nextBlock, current.grid)) {
      //     return {
      //       grid: showBlockInGrid(current.grid, current.block), // update grid state with current block position
      //       block: createBlock(IShapeVertical), // create new block
      //     };
      //   }
      //   // update next block loction to UI
      //   return { ...current, block: nextBlock };
      // });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Event move left
  useEffect(() => {
    function HandleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") dispatch({ type: "LEFT" });
      if (e.key === "ArrowRight") dispatch({ type: "RIGHT" });
      if (e.key === "ArrowDown") dispatch({ type: "DOWN" });
      if (e.key === "ArrowUp") dispatch({ type: "UP" });
      if (e.key === "Escape") dispatch({ type: "PAUSE" });
    }

    window.addEventListener("keydown", HandleKeyDown);
    return () => window.removeEventListener("keydown", HandleKeyDown);
  }, []);

  return (
    <div className="body">
      <div className="game">
        <Grid grid={showBlockInGrid(gameState.grid, gameState.block)} />
        <GameStat
          isGameOver={gameState.isGameOver}
          isPause={gameState.isPause}
          score={gameState.score}
          handleRestart={handleRestart}
        />
      </div>
    </div>
  );
}
