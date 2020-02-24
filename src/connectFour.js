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

// Helper methods

// counts number of yellow and red moves
const countColors = (gameState) => {
  let numYellow = 0;
  let numRed = 0;

  gameState.forEach(row => {
    row.forEach(column => {
      if (column === 'y') {
        numYellow++;
      } else if (column === 'r') {
        numRed++;
      }
    });
  });

  return [numYellow, numRed];
}

// checks if there are empty slots below existing moves
const checkEmptySlots = (gameState) => {
  for (let row = gameState.length - 2; row >= 0; row--) {
    for (let column = 0; column < 7; column++) {
      if (gameState[row][column]) {
        if (!gameState[row + 1][column]) return true;
      }
    }
  }

  return false;
}

// gets next row based on current column
const getRow = (gameState, column) => {
  let row = gameState.length - 1;

  while (row >= 0) {
    if (gameState[row][column]) {
      row--;
    } else {
      return row;
    }
  }
}

// counts number of connected moves within a row
const countConnectedRow = (rowArr, column) => {
  let numConnected = 1;
  let endColumn = column;

  for (let i = column; i < column + 3; i++) {
    if (rowArr[i] === rowArr[i + 1]) {
      numConnected++;
      endColumn++;
    } else {
      break;
    }
  }
  return [numConnected, endColumn];
}

// counts number of connected moves within a column (straight, diagonal forward, diagonal backwards)
const countConnectedColumn = (gameState, row, column, type) => {
  let numConnected = 1;
  let endColumn = column;

  for (let i = row; i > row - 3; i--) {
    switch (type) {
      case 'straight':
        if (gameState[i][column] === gameState[i - 1][column]) {
          numConnected++;
        } else {
          numConnected = 1;
        }
        break;
      case 'forward':
        if (column <= 3 && gameState[i][endColumn] === gameState[i - 1][endColumn + 1]) {
          numConnected++;
        } else {
          numConnected = 1;
        }
        endColumn++;
        break;
      case 'backward':
        if (column >= 3 && gameState[i][endColumn] === gameState[i - 1][endColumn - 1]) {
          numConnected++;
        } else {
          numConnected = 1;
        }
        endColumn--;
        break;
      default:
        break;
    }
  }
  return [numConnected, endColumn];
}

// checks for wins from vertical connections
const checkColumnWin = (gameState, row, column) => {
  if (countConnectedColumn(gameState, row, column, 'straight')[0] === 4) return true;
  if (countConnectedColumn(gameState, row, column, 'forward')[0] === 4) return true;
  if (countConnectedColumn(gameState, row, column, 'backward')[0] === 4) return true;
  return false;
}

// looks for moves based on defense or offense
const checkMoves = (gameState, color, type) => {
  let columnRec = null;
  let checkColor;
  if (type === 'defense') {
    checkColor = color === 'y' ? 'r' : 'y';
  } else {
    checkColor = color;
  }

  loop:
  for (let row = gameState.length - 1; row >= 0; row--) {
    for (let column = 0; column < 7; column++) {
      if (gameState[row][column] === checkColor) {
        const [connectedRow, endColumn] = countConnectedRow(gameState[row], column);
        if (endColumn <= 5 && connectedRow >= 2) {
          console.log('connected row:', connectedRow, 'row:', row, 'column:', column);
          let noRowBelow = false;
          for (let i = row + 1; i < gameState.length; i++) {
            if (!gameState[i][endColumn + 1]) noRowBelow = true;
          }
          if (!gameState[row][endColumn + 1] && !noRowBelow) {
            columnRec = endColumn + 1;
            break loop;
          } else if (column > 0 && !gameState[row][column - 1]) {
            columnRec = column - 1;
            break loop;
          }
        } else if (row >= 3) {
          const connectedColumnStraight = countConnectedColumn(gameState, row, column, 'straight')[0];
          console.log('connected column straight:', connectedColumnStraight, 'row:', row, 'column:', column);
          const [connectedColumnForward, endColumnForward] = countConnectedColumn(gameState, row, column, 'forward');
          console.log('connected column forward:', connectedColumnForward, 'row:', row, 'column:', column);
          const connectedColumnBackward = countConnectedColumn(gameState, row, column, 'backward')[0];
          console.log('connected column backward:', connectedColumnBackward, 'row:', row, 'column:', column);
          if (connectedColumnStraight >= 3) {
            columnRec = column;
            break loop;
          } else if (connectedColumnForward >= 3 && row[endColumnForward + 1]) {
            columnRec = endColumnForward + 1;
            break loop;
          } else if (connectedColumnBackward >= 3 && row[column - 1]) {
            columnRec = column - 1;
            break loop;
          }
        }
      }
    }
  }
  
  return columnRec;
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
