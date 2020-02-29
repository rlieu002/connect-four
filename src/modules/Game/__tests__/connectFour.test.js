import {
  isStateValid,
  winner,
  getCurrentPlayer,
  figureNextMove,
  play,
  getRow,
  isHorizontalMatch,
  countHorizontalMatch,
  countVerticalMatch,
  isDiagonalMatch,
  countDiagonalMatch,
} from "../utils";

test("vertical column wins identified", () => {
  const gameStateBefore = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, "r", null, null, null],
    [null, null, "y", "r", "y", null, null],
    [null, null, "y", "r", "y", null, null]
  ];

  const gameStateAfter = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, "r", null, null, null],
    [null, null, null, "r", null, null, null],
    [null, null, "y", "r", "y", null, null],
    [null, null, "y", "r", "y", null, null]
  ];

  const validStateBefore = isStateValid(gameStateBefore);
  expect(validStateBefore).toBe(true);

  const winnerExistsBefore = winner(gameStateBefore);
  expect(winnerExistsBefore).toBe(false);

  const currentPlayer = getCurrentPlayer(gameStateBefore);
  expect(currentPlayer).toBe("r");

  const nextMove = figureNextMove(gameStateBefore, currentPlayer);
  expect(nextMove).toBe(3);

  const row = getRow(gameStateBefore, nextMove);
  expect(row).toBe(2);

  const newGameState = play(gameStateBefore, nextMove, currentPlayer);
  expect(newGameState).toEqual(gameStateAfter);

  const validStateAfter = isStateValid(newGameState);
  expect(validStateAfter).toBe(true);

  const verticalMatch = countVerticalMatch(newGameState, row, nextMove, currentPlayer, 4);
  expect(verticalMatch).toBe(4);

  const winnerExistsAfter = winner(gameStateAfter);
  expect(winnerExistsAfter).toBe(true);
});

test("backward diagonal (top down) column wins identified", () => {
  const gameStateBefore = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, "r", "y", null, null],
    [null, null, "r", "y", "y", null, null],
    [null, "r", "y", "y", "r", null, null]
  ];

  const gameStateAfter = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, "r", null, null],
    [null, null, null, "r", "y", null, null],
    [null, null, "r", "y", "y", null, null],
    [null, "r", "y", "y", "r", null, null]
  ];

  const validStateBefore = isStateValid(gameStateBefore);
  expect(validStateBefore).toBe(true);

  const winnerExistsBefore = winner(gameStateBefore);
  expect(winnerExistsBefore).toBe(false);

  const currentPlayer = getCurrentPlayer(gameStateBefore);
  expect(currentPlayer).toBe("r");

  const nextMove = figureNextMove(gameStateBefore, currentPlayer);
  expect(nextMove).toBe(4);

  const row = getRow(gameStateBefore, nextMove);
  expect(row).toBe(2);

  const newGameState = play(gameStateBefore, nextMove, currentPlayer);
  expect(newGameState).toEqual(gameStateAfter);

  const validStateAfter = isStateValid(newGameState);
  expect(validStateAfter).toBe(true);

  const numberDiagonal = countDiagonalMatch(newGameState, row, nextMove, currentPlayer, 4);
  expect(numberDiagonal).toBe(4);

  const diagonalMatch = isDiagonalMatch(newGameState, row, nextMove, currentPlayer, 4);
  expect(diagonalMatch).toBe(true);

  const winnerExistsAfter = winner(gameStateAfter);
  expect(winnerExistsAfter).toBe(true);
});

test("forward diagonal (top down) column wins identified", () => {
  const gameStateBefore = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, "y", "r", null, null, null],
    [null, null, "y", "y", "r", null, null],
    [null, null, "y", "y", "r", "r", null]
  ];

  const gameStateAfter = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, "r", null, null, null, null],
    [null, null, "y", "r", null, null, null],
    [null, null, "y", "y", "r", null, null],
    [null, null, "y", "y", "r", "r", null]
  ];

  const validStateBefore = isStateValid(gameStateBefore);
  expect(validStateBefore).toBe(true);

  const winnerExistsBefore = winner(gameStateBefore);
  expect(winnerExistsBefore).toBe(false);

  const currentPlayer = getCurrentPlayer(gameStateBefore);
  expect(currentPlayer).toBe("r");

  const nextMove = figureNextMove(gameStateBefore, currentPlayer);
  expect(nextMove).toBe(2);

  const row = getRow(gameStateBefore, nextMove);
  expect(row).toBe(2);

  const newGameState = play(gameStateBefore, nextMove, currentPlayer);
  expect(newGameState).toEqual(gameStateAfter);

  const validStateAfter = isStateValid(newGameState);
  expect(validStateAfter).toBe(true);

  const numberDiagonal = countDiagonalMatch(newGameState, row, nextMove, currentPlayer, 4, "forward");
  expect(numberDiagonal).toBe(4);

  const diagonalMatch = isDiagonalMatch(newGameState, row, nextMove, currentPlayer, 4);
  expect(diagonalMatch).toBe(true);

  const winnerExistsAfter = winner(gameStateAfter);
  expect(winnerExistsAfter).toBe(true);
});

test("horizontal wins identified", () => {
  const gameStateBefore = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, "r", null, null, null],
    [null, null, "r", "r", null, null, null],
    [null, null, "y", "y", "y", null, null]
  ];

  const gameStateAfter = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, "r", null, null, null],
    [null, null, "r", "r", null, null, null],
    [null, "y", "y", "y", "y", null, null]
  ];

  const validStateBefore = isStateValid(gameStateBefore);
  expect(validStateBefore).toBe(true);

  const winnerExistsBefore = winner(gameStateBefore);
  expect(winnerExistsBefore).toBe(false);

  const currentPlayer = getCurrentPlayer(gameStateBefore);
  expect(currentPlayer).toBe("y");

  const nextMove = figureNextMove(gameStateBefore, currentPlayer);
  expect(nextMove).toBe(1);

  const row = getRow(gameStateBefore, nextMove);
  expect(row).toBe(5);

  const newGameState = play(gameStateBefore, nextMove, currentPlayer);
  expect(newGameState).toEqual(gameStateAfter);

  const validStateAfter = isStateValid(newGameState);
  expect(validStateAfter).toBe(true);

  const numberHorizontal = countHorizontalMatch(newGameState, row, 1, currentPlayer, 4);
  expect(numberHorizontal).toBe(4);

  const horizontalMatch = isHorizontalMatch(newGameState, row, 1, currentPlayer, 4);
  expect(horizontalMatch).toBe(true);

  const winnerExistsAfter = winner(gameStateAfter);
  expect(winnerExistsAfter).toBe(true);
});
