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

  for (let row = gameState.length - 1; row >= 0; row--) {
    for (let column = 0; column < 7; column++) {
      if (gameState[row][column] === checkColor) {
        const [connectedRow, endColumn] = countConnectedRow(gameState[row], column);
        if (endColumn <= 5 && connectedRow >= 2) {
          console.log('connected row:', connectedRow, 'row:', row, 'column:', column);
          if (!gameState[row][endColumn + 1]) {
            columnRec = endColumn + 1;
            const emptyBelow = checkEmptyBelow(gameState, row, columnRec);
            if(!emptyBelow) return columnRec;
          } else if (column > 0 && !gameState[row][column - 1]) {
            columnRec = column - 1;
            const emptyBelow = checkEmptyBelow(gameState, row, columnRec);
            if (!emptyBelow) return columnRec;
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
            return columnRec;
          } else if (connectedColumnForward >= 3 && row[endColumnForward + 1]) {
            columnRec = endColumnForward + 1;
            const emptyBelow = checkEmptyBelow(gameState, row, columnRec);
            if (!emptyBelow) return columnRec;
          } else if (connectedColumnBackward >= 3 && row[column - 1]) {
            columnRec = column - 1;
            const emptyBelow = checkEmptyBelow(gameState, row, columnRec);
            if (!emptyBelow) return columnRec;
          }
        }
      }
    }
  }
  
  return columnRec;
}

// checks for empty rows
const checkEmptyBelow = (gameState, row, column) => {
  debugger;
  let emptyBelow = false;
  if (row < gameState.length - 1) {
    for (let i = row + 1; i < gameState.length; i++) {
      if (!gameState[i][column]) emptyBelow = true;
    }
  }

  return emptyBelow;
}

export {
  countColors,
  checkEmptySlots,
  getRow,
  countConnectedRow,
  checkColumnWin,
  checkMoves,
}