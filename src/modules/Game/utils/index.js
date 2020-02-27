// Helper methods

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
const getRow = (gameState, column) => {
  let row = gameState.length - 1;

  while (row >= 0) {
    if (gameState[row][column]) {
      row--;
    } else {
      return row;
    }
  }
};

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
};

// counts number of connected moves within a column (straight, diagonal forward, diagonal backwards)
const countConnectedColumn = (gameState, row, column, type) => {
  let numConnected = 1;
  let endColumn = column;

  loop: for (let i = row; i > row - 3; i--) {
    switch (type) {
      case "straight":
        if (gameState[i][column] === gameState[i - 1][column]) {
          numConnected++;
        } else {
          break loop;
        }
        break;
      case "forward":
        if (
          column <= 3 &&
          gameState[i][endColumn] === gameState[i - 1][endColumn + 1]
        ) {
          numConnected++;
        } else {
          break loop;
        }
        endColumn++;
        break;
      case "backward":
        if (
          column >= 3 &&
          gameState[i][endColumn] === gameState[i - 1][endColumn - 1]
        ) {
          numConnected++;
        } else {
          break loop;
        }
        endColumn--;
        break;
      default:
        break;
    }
  }
  return [numConnected, endColumn];
};

// checks for wins from vertical connections
const checkColumnWin = (gameState, row, column) => {
  if (countConnectedColumn(gameState, row, column, "straight")[0] === 4)
    return true;
  if (countConnectedColumn(gameState, row, column, "forward")[0] === 4)
    return true;
  if (countConnectedColumn(gameState, row, column, "backward")[0] === 4)
    return true;
  return false;
};

// looks for moves based on defense or offense
const checkMoves = (gameState, color, numConnected, type) => {
  let checkColor;
  if (type === "defense") {
    checkColor = color === "y" ? "r" : "y";
  } else {
    checkColor = color;
  }

  for (let row = gameState.length - 1; row >= 0; row--) {
    for (let column = 0; column < 7; column++) {
      if (gameState[row][column] === checkColor) {
        const columnRecRow = checkMovesRow(
          gameState,
          row,
          column,
          numConnected
        );
        if (columnRecRow !== null) return columnRecRow;

        if (row >= 3) {
          // check if column wins are possible (enough rows above)
          const columnRecStraight = checkMovesColumnStraight(
            gameState,
            row,
            column,
            numConnected
          );
          if (columnRecStraight !== null) return columnRecStraight;

          const columnRecForward = checkMovesColumnForward(
            gameState,
            row,
            column,
            numConnected
          );
          if (columnRecForward !== null) return columnRecForward;

          const columnRecBackward = checkMovesColumnBackward(
            gameState,
            row,
            column,
            numConnected
          );
          if (columnRecBackward !== null) return columnRecBackward;
        }
      }
    }
  }
  return null;
};

const checkMovesRow = (gameState, row, column, numConnected) => {
  const [connectedRow, endColumn] = countConnectedRow(gameState[row], column);
  if (endColumn <= 5 && connectedRow >= numConnected) {
    // check if there are additional columns to the right (end column <= 5)
    log("row", connectedRow, row, column);
    if (gameState[row][endColumn + 1] === null) {
      const columnRec = endColumn + 1;
      const emptyBelow = checkEmptyBelow(gameState, row, columnRec);
      if (!emptyBelow) return columnRec;
    }
    if (column > 0 && gameState[row][column - 1] === null) {
      // check if there are additional columns to the left (column > 0)
      const columnRec = column - 1;
      const emptyBelow = checkEmptyBelow(gameState, row, columnRec);
      if (!emptyBelow) return columnRec;
    }
  }
  return null;
};

const checkMovesColumnStraight = (gameState, row, column, numConnected) => {
  const connectedColumnStraight = countConnectedColumn(
    gameState,
    row,
    column,
    "straight"
  )[0];
  log("column straight", connectedColumnStraight, row, column);
  if (
    connectedColumnStraight >= numConnected &&
    gameState[row - numConnected][column] === null && // check if space is taken
    getRow(gameState, column) !== undefined // check if column is full
  ) {
    return column;
  }
  return null;
};

const checkMovesColumnForward = (gameState, row, column, numConnected) => {
  const [connectedColumnForward, endColumnForward] = countConnectedColumn(
    gameState,
    row,
    column,
    "forward"
  );
  log("column forward", connectedColumnForward, row, column);
  const columnRecRight = endColumnForward + 1;
  const checkRowRight = row - numConnected;
  const emptyBelowRight = checkEmptyBelow(
    gameState,
    checkRowRight,
    columnRecRight
  );
  if (
    connectedColumnForward >= numConnected &&
    gameState[checkRowRight][columnRecRight] === null && // check if space is taken
    getRow(gameState, column) !== undefined && // check if column is full
    !emptyBelowRight
  )
    return columnRecRight;

  if (row > 0 && column > 0) {
    // check if space is within bounds
    const columnRecLeft = column - 1;
    const checkRowLeft = row - 1;
    const emptyBelowLeft = checkEmptyBelow(
      gameState,
      checkRowLeft,
      columnRecLeft
    );
    if (gameState[checkRowLeft][columnRecLeft] === null && !emptyBelowLeft)
      return columnRecLeft;
  }

  return null;
};

const checkMovesColumnBackward = (gameState, row, column, numConnected) => {
  const [connectedColumnBackward, endColumnBackward] = countConnectedColumn(
    gameState,
    row,
    column,
    "backward"
  );
  log("column backward", connectedColumnBackward, row, column);
  const columnRecRight = endColumnBackward - 1;
  const checkRowRight = row - numConnected;
  const emptyBelowRight = checkEmptyBelow(
    gameState,
    checkRowRight,
    columnRecRight
  );
  if (
    connectedColumnBackward >= numConnected &&
    gameState[checkRowRight][columnRecRight] === null && // check if space is taken
    getRow(gameState, column) !== undefined && // check if column is full
    !emptyBelowRight
  )
    return columnRecRight;

  if (row < 5 && column < 6) {
    // check if space is within bounds
    const columnRecLeft = column + 1;
    const checkRowLeft = row + 1;
    const emptyBelowLeft = checkEmptyBelow(
      gameState,
      checkRowLeft,
      columnRecLeft
    );
    if (gameState[checkRowLeft][columnRecLeft] === null && !emptyBelowLeft)
      return columnRecLeft;
  }

  return null;
};

// checks for empty rows
const checkEmptyBelow = (gameState, row, column) => {
  let emptyBelow = false;
  if (row < gameState.length - 1) {
    for (let i = row + 1; i < gameState.length; i++) {
      if (gameState[i][column] === null) emptyBelow = true;
    }
  }
  return emptyBelow;
};

// log for testing
const log = (type, numConnected, row, column) => {
  console.log(
    `connected ${type}: ${numConnected} row: ${row} column ${column}`
  );
};

export {
  countColors,
  checkEmptySlots,
  getRow,
  countConnectedRow,
  checkColumnWin,
  checkMoves
};
