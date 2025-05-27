import { useEffect } from "react";
import { getRandomInteger } from "../helpers/math";
import type { Player } from "../types";

const useComputerMove = (
  player: Player,
  heapSize: number,
  waitingForComputer: boolean,
  onComputerMove: (amount: number) => void,
  delay = 1000
) => {
  useEffect(() => {
    if (player === "Computer" && waitingForComputer) {
      const timeout = setTimeout(() => {
        const amount = Math.min(getRandomInteger(1, 3), heapSize);
        onComputerMove(amount);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [player, heapSize, waitingForComputer, onComputerMove, delay]);
};

export { useComputerMove };
