import {
  countColors,
  checkEmptySlots,
  getRow,
  countConnectedRow,
  checkColumnWin,
  checkMoves,
} from './utils';

/**
  * @param gameState state of the game represented as a two dimensional array
  * @return color represented by a string
*/

export const getCurrentPlayer = (gameState) => {
  const [numYellow, numRed] = countColors(gameState);

  const turn = numYellow > numRed ? 'r' : 'y';
  return turn;
}


/**
  * @param gameState state of the game represented as a two dimensional array
  * @return valid game state represented by boolean
*/
export const isStateValid = (gameState) => {
  const [numYellow, numRed] = countColors(gameState);

  // anomalies include:
  // players who have exceeded their turn
  if (numYellow < numRed || (numYellow - numRed > 1)) {
    return false;
  // slots filled where there are empty slots below
  } else if (checkEmptySlots(gameState)) {
    return false;
  }

  return true;
}

/**
  * @param gameState state of the game represented as a two dimensional array
  * @param column column represented as a number
  * @param color color represented by a string
  * @return new state of the game represented as a two dimensional array
*/
export const play = (gameState, column, color) => {
  let newGameState = gameState;
  if (column < 0 || column > 6) return false;
  if (!(color === 'y' || color === 'r')) return false;

  const row = getRow(gameState, column);
  newGameState[row][column] = color;
  
  return newGameState;
}

/**
  * @param gameState state of the game represented as a two dimensional array
  * @return winner exists represented by boolean
*/
export const winner = (gameState) => {
  for (let row = gameState.length - 1; row >= 0; row--) {
    for (let column = 0; column < 7; column++) {
      if (gameState[row][column]) {
        if (column <= 3 && countConnectedRow(gameState[row], column)[0] === 4) return true;
        if (row >= 3 && checkColumnWin(gameState, row, column)) return true;
      }
    }
  }
  
  return false;
}

/**
  * @param gameState state of the game represented as a two dimensional array
  * @param color color represented by a string
  * @return column represented as a number
*/
export const figureNextMove = (gameState, color) => {
  const defenseMove = checkMoves(gameState, color, 'defense');
  if (defenseMove !== null) return defenseMove;

  const offenseMove = checkMoves(gameState, color);
  return offenseMove ? offenseMove : Math.floor(Math.random() * 6);
}

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

// Test
// const testGameState = [
  // [null, null, null, null, null, null, null],
  // [null, null, null, 'r', null, null, null],
  // ['r', null, null, 'r', null, null, null],
  // ['y', null, 'r', 'y', null, null, null],
  // ['r', 'y', 'y', 'r', 'y', null, null],
  // ['r', 'y', 'y', 'y', 'r', null, null],
// ];

// const currentPlayer = getCurrentPlayer(testGameState);
// console.log('current player:', currentPlayer);
// console.log('valid state:', isStateValid(testGameState));
// console.log('new game state:', play(testGameState, 0, currentPlayer));
// console.log('winner exists:', winner(testGameState));
// console.log('next move:', figureNextMove(testGameState, currentPlayer));
