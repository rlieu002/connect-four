/**
 * @param gameState state of the game represented as a two dimensional array
 * @return player color represented by a string
 */
export const getCurrentPlayer = gameState => {
  const [numYellow, numRed] = countColors(gameState);

  const color = numYellow > numRed ? "r" : "y";
  return color;
};

/**
 * @param gameState state of the game represented as a two dimensional array
 * @return valid game state represented by boolean
 */
export const isStateValid = gameState => {
  if (!gameState) return false;
  const [numYellow, numRed] = countColors(gameState);

  // anomalies include:
  // players who have exceeded their turn
  if (numYellow < numRed || numYellow - numRed > 1) {
    return false;
    // slots filled where there are empty slots below
  } else if (checkEmptySlots(gameState)) {
    return false;
  }

  return true;
};

/**
 * @param gameState state of the game represented as a two dimensional array
 * @param column column represented as a number
 * @param color color represented by a string
 * @return new game state represented as a two dimensional array
 */
export const play = (gameState, column, color) => {
  let newGameState = gameState;
  if (column < 0 || column > 6) return false;
  if (!(color === "y" || color === "r")) return false;

  const row = getRow(gameState, column);
  if (row === undefined) return false;
  newGameState[row][column] = color;

  return newGameState;
};

// counts number of yellow and red moves
const countColors = gameState => {
  let numYellow = 0;
  let numRed = 0;

  gameState.forEach(row => {
    row.forEach(column => {
      if (column === "y") {
        numYellow++;
      } else if (column === "r") {
        numRed++;
      }
    });
  });
  return [numYellow, numRed];
};

// checks if there are empty slots below existing moves
const checkEmptySlots = gameState => {
  for (let row = gameState.length - 2; row >= 0; row--) {
    for (let column = 0; column < 7; column++) {
      if (gameState[row][column]) {
        if (!gameState[row + 1][column]) return true;
      }
    }
  }
  return false;
};

// gets next row based on current column
export const getRow = (gameState, column) => {
  let row = gameState.length - 1;

  while (row >= 0) {
    if (gameState[row][column]) {
      row--;
    } else {
      return row;
    }
  }
};

// Bonus
// const checkSquareWin = (gameState, row, column) => {
//   const color = gameState[row][column];
//   const secondMove = gameState[row][column + 1] === color;
//   const thirdMove = gameState[row - 1][column] === color;
//   const fourthMove = gameState[row - 1][column + 1] === color;

//   return (secondMove && thirdMove && fourthMove);
// }

// const checkL0Win = (gameState, row, column) => {
//   const color = gameState[row][column];
//   const secondMove = gameState[row][column + 1] === color;
//   const thirdMove = gameState[row - 1][column] === color;
//   const fourthMove = gameState[row - 2][column] === color;

//   return (secondMove && thirdMove && fourthMove);
// }

// const checkL90Win = (gameState, row, column) => {
//   const color = gameState[row][column];
//   const secondMove = gameState[row][column + 1] === color;
//   const thirdMove = gameState[row][column + 2][column] === color;
//   const fourthMove = gameState[row - 1][column + 2] === color;

//   return (secondMove && thirdMove && fourthMove);
// }

// const checkL180Win = (gameState, row, column) => {
//   const color = gameState[row][column];
//   const secondMove = gameState[row - 1][column] === color;
//   const thirdMove = gameState[row - 2][column] === color;
//   const fourthMove = gameState[row - 2][column - 1] === color;

//   return (secondMove && thirdMove && fourthMove);
// }

// const checkL270Win = (gameState, row, column) => {
//   const color = gameState[row][column];
//   const secondMove = gameState[row - 1][column] === color;
//   const thirdMove = gameState[row - 1][column + 1] === color;
//   const fourthMove = gameState[row - 1][column + 2] === color;

//   return (secondMove && thirdMove && fourthMove);
// }

// const winConfig = {
//   'square': checkSquareWin,
//   'L0': checkL0Win,
//   'L90': checkL90Win,
//   'L180': checkL180Win,
//   'L270': checkL270Win,
// };

// const checkBonusWin = (gameState, type) => {
//   for (let row = gameState.length - 1; row < 0; row--) {
//     for (let column = 0; column < row.length; column++) {
//       if (gameState[row][column]) {
//         if (winConfig[type](gameState, row, column)) return true;
//       }
//     }
//   }

//   return false;
// }
