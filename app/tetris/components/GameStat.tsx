type GameStateProp = {
  score: number;
  isGameOver: boolean;
  isPause: boolean;
  handleRestart: () => void;
};

export default function GameStat({
  isPause,
  isGameOver,
  score,
  handleRestart,
}: GameStateProp) {
  return (
    <div className="gameStat">
      <div>
        <div className="gameStat-score">Score</div>
        <div className="gameStat-score-value">{score}</div>
      </div>

      {isGameOver && (
        <div>
          <div className="gameStat-status gameover">Game Over</div>
          <button
            className="gameStat-status paused margin-top-5"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
      )}

      {!isGameOver && isPause && (
        <div className="gameStat-status paused">Paused</div>
      )}
    </div>
  );
}
