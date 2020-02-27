import {
  countColors,
  checkEmptySlots,
  getRow,
  countConnectedRow,
  checkColumnWin,
  checkMoves
} from "./utils";

/**
 * @param gameState state of the game represented as a two dimensional array
 * @return color represented by a string
 */

export const getCurrentPlayer = gameState => {
  const [numYellow, numRed] = countColors(gameState);

  const turn = numYellow > numRed ? "r" : "y";
  return turn;
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
 * @return new state of the game represented as a two dimensional array
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

/**
 * @param gameState state of the game represented as a two dimensional array
 * @return winner exists represented by boolean
 */
export const winner = gameState => {
  for (let row = gameState.length - 1; row >= 0; row--) {
    for (let column = 0; column < 7; column++) {
      if (gameState[row][column]) {
        if (column <= 3 && countConnectedRow(gameState[row], column)[0] === 4)
          return true;
        if (row >= 3 && checkColumnWin(gameState, row, column)) return true;
      }
    }
  }

  return false;
};

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

const nextMove = (gameState, color, numConnected) => {
  let counter = numConnected;
  while (counter > 1) {
    const offenseMove = checkMoves(gameState, color, counter);
    if (offenseMove !== null) return offenseMove;
    const defenseMove = checkMoves(gameState, color, counter, "defense");
    if (defenseMove !== null) return defenseMove;
    counter--;
  }
  return null;
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
