import * as readlineSync from "readline-sync";
import {
  USER,
  COMPUTER,
  USER_DEFAULT_ICON,
  COMP_DEFAULT_ICON,
} from "./constants";

export function getValidBoardSize(): number {
  let attempts: number = 1;
  let userInput: number = parseInt(
    readlineSync.question("what will be the size of matrix : ")
  );
  while (!isValidBoardSize(userInput) && attempts < 3) {
    userInput = parseInt(
      readlineSync.question(
        `Not a valid matrix size for this game, please enter number greater than 2. You have ${
          3 - attempts
        }/3 attempts left, else we'll choose 3 : `
      )
    );
    attempts += 1;
  }

  userInput = attempts > 2 ? 3 : userInput;

  console.log(`You have selected the matrix: ${userInput} x ${userInput} `);

  return userInput;
}

function isValidBoardSize(size: number): boolean {
  if (isNaN(size) || size < 3) {
    return false;
  }
  return true;
}

export function createBoard(
  size: number
): [number[][], { [key: number]: number[] }, number[]] {
  const matrix: number[][] = [];

  const valueIndicesMatch: { [key: number]: number[] } = {};

  let prevNum: number = 1;
  const availableCells: number[] = [];

  for (let i = 0; i < size; i++) {
    const row: number[] = [];

    for (let j = 0; j < size; j++) {
      row.push(prevNum);
      availableCells.push(prevNum); //updating the choices available for user/computer to opt from
      valueIndicesMatch[prevNum] = [i, j];
      prevNum += 1;
    }

    matrix.push(row);
  }

  return [matrix, valueIndicesMatch, availableCells];
}

// const [newMatrix, valueIndexMatchings, availableCells ] = createMatrix(3)

export function determineTossWinnerAndIcons(): [string, string, string] {
  console.log("We are tossing the coin to decide who will start the game");
  let tossWinner: string;
  let input: string;
  let userIcon: string = USER_DEFAULT_ICON;
  let compIcon: string = COMP_DEFAULT_ICON;
  if (Math.random() > 0.5) {
    tossWinner = USER;

    input = readlineSync.question(
      `${USER} won the toss, now please select the icon you want to play with : Enter O or X else we'll choose ${USER_DEFAULT_ICON} for you : `
    );

    if (input.toUpperCase() === "O" || input.toUpperCase() === "0") {
      userIcon = "O";
      compIcon = "X";
    } else if (input.toUpperCase() === "X") {
      userIcon = "X";
      compIcon = "O";
    }

    console.log(`You have Chosen to play with : ${userIcon}`);
  } else {
    tossWinner = COMPUTER;
    console.log(
      `${COMPUTER} won the toss and has chosen to play with ${COMP_DEFAULT_ICON}`
    );

    userIcon = USER_DEFAULT_ICON;
    compIcon = COMP_DEFAULT_ICON;
  }

  return [tossWinner, userIcon, compIcon];
}

export function printBoard(board: (number | string)[][]): void {
  for (let row of board) {
    console.log(row.join(" | "));
  }
  console.log("\n");
}

// printMatrix(a)

function getUserMoveInput(availableMoves: number[]): number {
  let num: number;
  do {
    const userInput = readlineSync.question(
      `Please select a valid move from ${availableMoves}: `
    );
    num = parseInt(userInput);
    if (isNaN(num) || !availableMoves.includes(num)) {
      console.log(
        `Invalid input. Please select a valid move from ${availableMoves}.`
      );
    }
  } while (isNaN(num) || !availableMoves.includes(num));
  return num;
}

function updateAvailableMoves(availableMoves: number[], move: number): void {
  const index = availableMoves.indexOf(move);
  availableMoves.splice(index, 1);
}

function updateMoveInBoard(
  matrix: (string | number)[][],
  move: number,
  moveMadeByIcon: string,
  availableMoves: number[],
  movesIndexMatchings: { [key: number]: number[] }
): void {
  // const icon = moveMadeBy === USER ? userIcon : compIcon;

  const indices = movesIndexMatchings[move];
  matrix[indices[0]][indices[1]] = moveMadeByIcon;

  updateAvailableMoves(availableMoves, move);
  printBoard(matrix);
}

export function isWinningMove(matrix: (number | string)[][]): boolean {
  const firstDiagonal: Set<number | string> = new Set();
  const secondDiagonal: Set<number | string> = new Set();

  const size: number = matrix.length;

  for (let i = 0; i < size; i++) {
    const row: Set<number | string> = new Set();
    const column: Set<number | string> = new Set();

    firstDiagonal.add(matrix[i][i]);
    secondDiagonal.add(matrix[i][size - 1 - i]);

    for (let j = 0; j < size; j++) {
      row.add(matrix[i][j]);
      column.add(matrix[j][i]);
    }

    if (row.size === 1 || column.size === 1) {
      return true;
    }
  }

  if (firstDiagonal.size === 1 || secondDiagonal.size === 1) {
    return true;
  }

  return false;
}

export function isTie(remainingelements: number[]): boolean {
  if (remainingelements.length === 0) {
    return true;
  }

  return false;
}

function generateRandomComputerMove(availableMoves: number[]): number {
  const index: number = Math.floor(Math.random() * availableMoves.length);

  console.log(`Computer selected :  ${availableMoves[index]}`);

  return availableMoves[index];
}

function processPlayerMove(
  matrix: (number | string)[][],
  availableMoves: number[],
  movesIndexMatchings: { [key: number]: number[] },
  userIcon: string,
  inputIcon: string
): void {
  if (availableMoves.length === 0) {
    return;
  }

  if (inputIcon === userIcon) {
    updateMoveInBoard(
      matrix,
      getUserMoveInput(availableMoves),
      inputIcon,
      availableMoves,
      movesIndexMatchings
    );
    if (isWinningMove(matrix)) {
      console.log("you won");
      return;
    }
  } else {
    updateMoveInBoard(
      matrix,
      generateRandomComputerMove(availableMoves),
      inputIcon,
      availableMoves,
      movesIndexMatchings
    );
    if (isWinningMove(matrix)) {
      console.log("you won");
      return;
    }
  }
  if (isTie(availableMoves)) {
    console.log("This is tie");
    return;
  }
}

export function runGameRound(
  matrix: (number | string)[][],
  availableMoves: number[],
  movesIndexMatchings: { [key: number]: number[] },
  tossWonby: string,
  userIcon: string,
  compIcon: string
): void {
  if (tossWonby === USER) {
    processPlayerMove(
      matrix,
      availableMoves,
      movesIndexMatchings,
      userIcon,
      userIcon
    );
    processPlayerMove(
      matrix,
      availableMoves,
      movesIndexMatchings,
      userIcon,
      compIcon
    );
  } else {
    processPlayerMove(
      matrix,
      availableMoves,
      movesIndexMatchings,
      userIcon,
      compIcon
    );
    processPlayerMove(
      matrix,
      availableMoves,
      movesIndexMatchings,
      userIcon,
      userIcon
    );
  }
}

export function runTicTacToeGame() : void {
  const matrixSizeUserInput = getValidBoardSize();

  const [matrix, valueIndicesMatch, availableMoves] =
    createBoard(matrixSizeUserInput);

  printBoard(matrix);

  const [tosswinner, userIcon, compIcon] = determineTossWinnerAndIcons();

  while (!isWinningMove(matrix) && !isTie(availableMoves)) {
    runGameRound(
      matrix,
      availableMoves,
      valueIndicesMatch,
      tosswinner,
      userIcon,
      compIcon
    );
  }
}
