import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useComputerMove } from "./useComputerMove";

vi.mock("../helpers/math", () => ({
  getRandomInteger: vi.fn(() => 2),
}));

describe("useComputerMove", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("calls onComputerMove after delay", () => {
    const onComputerMove = vi.fn();

    renderHook(() =>
      useComputerMove("Computer", 10, true, onComputerMove, 1000)
    );

    expect(onComputerMove).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onComputerMove).toHaveBeenCalledWith(2);
  });

  it("does not call onComputerMove if player is not Computer", () => {
    const onComputerMove = vi.fn();

    renderHook(() =>
      useComputerMove("Player 1", 10, true, onComputerMove, 1000)
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onComputerMove).not.toHaveBeenCalled();
  });

  it("does not call onComputerMove if waitingForComputer is false", () => {
    const onComputerMove = vi.fn();

    renderHook(() =>
      useComputerMove("Computer", 10, false, onComputerMove, 1000)
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onComputerMove).not.toHaveBeenCalled();
  });
});
