import * as cf from "../connectFour";

test("column wins identified", () => {
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

  const validStateBefore = cf.isStateValid(gameStateBefore);
  expect(validStateBefore).toBe(true);

  const winnerExistsBefore = cf.winner(gameStateBefore);
  expect(winnerExistsBefore).toBe(false);

  const currentPlayer = cf.getCurrentPlayer(gameStateBefore);
  expect(currentPlayer).toBe("r");

  const nextMove = cf.figureNextMove(gameStateBefore, currentPlayer);
  expect(nextMove).toBe(3);

  const newGameState = cf.play(gameStateBefore, nextMove, currentPlayer);
  expect(newGameState).toEqual(gameStateAfter);

  const validStateAfter = cf.isStateValid(newGameState);
  expect(validStateAfter).toBe(true);

  const winnerExistsAfter = cf.winner(gameStateAfter);
  expect(winnerExistsAfter).toBe(true);
});

test("row wins identified", () => {
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
    [null, null, "y", "y", "y", "y", null]
  ];

  const validStateBefore = cf.isStateValid(gameStateBefore);
  expect(validStateBefore).toBe(true);

  const winnerExistsBefore = cf.winner(gameStateBefore);
  expect(winnerExistsBefore).toBe(false);

  const currentPlayer = cf.getCurrentPlayer(gameStateBefore);
  expect(currentPlayer).toBe("y");

  const nextMove = cf.figureNextMove(gameStateBefore, currentPlayer);
  expect(nextMove).toBe(5);

  const newGameState = cf.play(gameStateBefore, nextMove, currentPlayer);
  expect(newGameState).toEqual(gameStateAfter);

  const validStateAfter = cf.isStateValid(newGameState);
  expect(validStateAfter).toBe(true);

  const winnerExistsAfter = cf.winner(gameStateAfter);
  expect(winnerExistsAfter).toBe(true);
});
