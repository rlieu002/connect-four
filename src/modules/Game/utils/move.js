import {
  getRow,
  countHorizontalMatch,
  countVerticalMatch,
  countDiagonalMatch,
} from "./index";

/**
 * @param gameState state of the game represented as a two dimensional array
 * @param color color represented by a string
 * @return column represented as a number
 */
export const figureNextMove = (gameState, color) => {
  const move = nextMove(gameState, color, 3);
  if (move !== null) return move;

  const row = getRow(gameState, 3);
  return row !== undefined ? 3 : Math.floor(Math.random() * 6);
};

const nextMove = (gameState, color, numberConnected) => {
  let counter = numberConnected;
  while (counter > 1) {
    const offenseMove = checkMoves(gameState, color, counter);
    if (offenseMove !== null) return offenseMove;
    const defenseMove = checkMoves(gameState, color, counter, "defense");
    if (defenseMove !== null) return defenseMove;
    counter--;
  }
  return null;
};

const checkMoves = (gameState, color, numberConnected, type) => {
  const checkColor = getColor(color, type);
  for (let i = 0; i < gameState.length; i++) {
    const columnRec = checkColumns(gameState, i, checkColor, numberConnected);
    if (columnRec !== null) return columnRec;
  }
  return null;
};

const checkColumns = (gameState, row, color, numberConnected) => {
  for (let i = 0; i < gameState[row].length; i++) {
    if (gameState[row][i] !== null) {
      const horizontalMatch = checkColumnsHorizontal(
        gameState,
        row,
        i,
        color,
        numberConnected
      );
      if (horizontalMatch !== null) return horizontalMatch;
      const verticalMatch = countVerticalMatch(
        gameState,
        row,
        i,
        color,
        numberConnected
      );
      if (verticalMatch === numberConnected && validateMove(gameState, row, i)) return i;
      const diagonalMatch = checkColumnsDiagonal(
        gameState,
        row,
        i,
        color,
        numberConnected
      );
      if (diagonalMatch !== null) return diagonalMatch;
    }
  }
  return null;
};

const checkColumnsHorizontal = (
  gameState,
  row,
  column,
  color,
  numberConnected
) => {
  const horizontalMatch = countHorizontalMatch(
    gameState,
    row,
    column,
    color,
    numberConnected
  );
  const columnRec = validateMove(gameState, row, column - 1, "horizontal") ? column - 1 : column + numberConnected;
  if (horizontalMatch === numberConnected && validateMove(gameState, row, columnRec, "horizontal") && !isEmptyBelow(gameState, row, columnRec)) return columnRec;
  return null;
};

const checkColumnsDiagonal = (
  gameState,
  row,
  column,
  color,
  numberConnected
) => {
  const forwardMatch = countDiagonalMatch(
    gameState,
    row,
    column,
    color,
    numberConnected,
    "forward"
  );
  const columnRecForward = column - 1;
  if (forwardMatch === numberConnected && validateMove(gameState, row, columnRecForward) && !isEmptyBelow(gameState, row, columnRecForward)) return columnRecForward;
  const backwardMatch = countDiagonalMatch(
    gameState,
    row,
    column,
    color,
    numberConnected
  );
  const columnRecBackward = column + 1;
  if (backwardMatch === numberConnected && validateMove(gameState, row, columnRecBackward) && !isEmptyBelow(gameState, row, columnRecBackward)) return columnRecBackward;
  return null;
};

// get color based on offense or defense
const getColor = (color, type) => {
  if (type === "defense") {
    return color === "y" ? "r" : "y";
  } else {
    return color;
  }
};

// check if space is available
const validateMove = (gameState, row, column, type) => {
  const checkRow = type === "horizontal" ? row : row - 1;
  try {
    return gameState[checkRow][column] === null;
  } catch (e) {
    return false;
  }
};

// checks for empty rows below space
const isEmptyBelow = (gameState, row, column) => {
  if (row < gameState.length - 1) {
    for (let i = row + 1; i < gameState.length; i++) {
      if (gameState[i][column] === null) return true;
    }
  }
  return false;
};
