import { useCallback, useState } from "react";
import "./App.css";
import { useComputerMove } from "./hooks/useComputerMove";
import type { Player } from "./types";

const initialState = {
  heapSize: 13,
  player: "Player 1" as Player,
  winner: "" as Player,
  waitingForComputer: false,
};

function App() {
  const [heapSize, setHeapSize] = useState(initialState.heapSize);
  const [player, setPlayer] = useState<Player>(initialState.player);
  const [winner, setWinner] = useState<Player>(initialState.winner);
  const [waitingForComputer, setWaitingForComputer] = useState(
    initialState.waitingForComputer
  );

  const resetGame = useCallback(() => {
    setHeapSize(initialState.heapSize);
    setPlayer(initialState.player);
    setWinner(initialState.winner);
    setWaitingForComputer(initialState.waitingForComputer);
  }, []);

  const makeMove = useCallback(
    (amount: number) => {
      const newSize = Math.max(heapSize - amount, 0);
      const isGameOver = newSize === 0;
      const newPlayer = isGameOver
        ? ""
        : player === "Player 1"
        ? "Computer"
        : "Player 1";
      const newWinner = isGameOver
        ? player === "Computer"
          ? "Player 1"
          : "Computer"
        : "";

      setHeapSize(newSize);
      setPlayer(newPlayer);
      setWinner(newWinner);
      setWaitingForComputer(newPlayer === "Computer");
    },
    [heapSize, player]
  );

  useComputerMove(player, heapSize, waitingForComputer, makeMove);

  const isButtonDisabled = (amount: number): boolean =>
    !!winner || player === "Computer" || heapSize < amount;

  return (
    <>
      <header>
        <h1>Nim Game</h1>
      </header>
      <main>
        <section className="game-info">
          <p className="message">
            {winner ? (
              <>
                <span>{winner} wins! </span>
                <span role="img" aria-label="trophy">
                  🏆
                </span>
              </>
            ) : player === "Computer" ? (
              "Computer is thinking..."
            ) : (
              `It's your turn, ${player}.`
            )}
          </p>
          <p>Current heap size: {heapSize}</p>
        </section>

        <section className="heap-controls">
          {[1, 2, 3].map((amount) => (
            <button
              key={amount}
              type="button"
              disabled={isButtonDisabled(amount)}
              onClick={() => makeMove(amount)}
            >
              {amount}
            </button>
          ))}
        </section>

        <section className="game-controls">
          <button
            type="button"
            onClick={resetGame}
            disabled={heapSize === initialState.heapSize}
          >
            Reset game
          </button>
        </section>
      </main>
    </>
  );
}

export default App;
