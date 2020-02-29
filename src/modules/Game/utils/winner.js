/**
 * @param gameState state of the game represented as a two dimensional array
 * @return winner exists represented by boolean
 */
const winner = (gameState) => {
  for (let i = 0; i < gameState.length; i++) {
    if (checkColumns(gameState, i)) return true;
  }
  return false;
};

const checkColumns = (gameState, row) => {
  for (let i = 0; i < gameState[row].length; i++) {
    if (gameState[row][i] !== null) {
      if (isWinner(gameState, row, i, "y") || isWinner(gameState, row, i, "r")) return true;
    }
  }
  return false;
};

const isWinner = (gameState, row, column, color) => {
  const numberConnected = 4;
  return (
    isHorizontalMatch(gameState, row, column, color, numberConnected) ||
    isDiagonalMatch(gameState, row, column, color, numberConnected) ||
    countVerticalMatch(gameState, row, column, color, numberConnected) === numberConnected
  );
};

// check if space matches color and is within bounds
const isValue = (gameState, row, column, color) => {
  try {
    return gameState[row][column] === color;
  } catch (error) {
    return false;
  }
};

const isHorizontalMatch = (gameState, row, column, color, numberConnected) => {
  const forwardMatch = countHorizontalMatch(
    gameState,
    row,
    column,
    color,
    numberConnected,
    "forward"
  );
  const backwardMatch = countHorizontalMatch(
    gameState,
    row,
    column,
    color,
    numberConnected
  );

  return forwardMatch === numberConnected || backwardMatch === numberConnected;
};

const countHorizontalMatch = (
  gameState,
  row,
  column,
  color,
  numberConnected,
) => {
  let matchCounter = 0;
  for (let i = column; i < column + numberConnected; i++) {
    if (isValue(gameState, row, i, color)) matchCounter++;
  }
  return matchCounter;
};

const countVerticalMatch = (gameState, row, column, color, numberConnected) => {
  let verticalMatch = 0;
  for (let i = row; i < row + numberConnected; i++) {
    if (isValue(gameState, i, column, color)) verticalMatch++;
  }
  return verticalMatch;
};

const isDiagonalMatch = (gameState, row, column, color, numberConnected) => {
  const forwardMatch = countDiagonalMatch(
    gameState,
    row,
    column,
    color,
    numberConnected,
    "forward"
  );
  const backwardMatch = countDiagonalMatch(
    gameState,
    row,
    column,
    color,
    numberConnected
  );
  return forwardMatch === numberConnected || backwardMatch === numberConnected;
};

const countDiagonalMatch = (
  gameState,
  row,
  column,
  color,
  numberConnected,
  direction
) => {
  let counter = 0;
  let matchCounter = 0;

  while (counter < numberConnected) {
    const checkRow = row + counter;
    const checkColumn =
      direction === "forward" ? column + counter : column - counter;
    if (isValue(gameState, checkRow, checkColumn, color)) matchCounter++;
    counter++;
  }
  return matchCounter;
};

export {
  isValue,
  isHorizontalMatch,
  countHorizontalMatch,
  countVerticalMatch,
  isDiagonalMatch,
  countDiagonalMatch,
  winner
};
