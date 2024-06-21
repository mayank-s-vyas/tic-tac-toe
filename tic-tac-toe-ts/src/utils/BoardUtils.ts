import * as readlineSync from 'readline-sync';
import { CreateBoardResponse, Board, CellValueIndexMatching, ListOfNumbers } from "../types/GameTypes";



export class BoardUtils {
  public static isValidBoardSize(size: number): boolean {
    if (isNaN(size) || size < 3) {
      return false;
    }
    return true;
  }

  public static getValidBoardSize(): number {
    let attempts: number = 1;
    let userInput: number = parseInt(
      readlineSync.question("what will be the size of matrix : ")
    );
    while (!BoardUtils.isValidBoardSize(userInput) && attempts < 3) {
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

  public static createBoard(size: number): CreateBoardResponse {
    const matrix: Board = [];

    const valueIndicesMatch: CellValueIndexMatching = {};

    let prevNum: number = 1;
    const availableCells: ListOfNumbers = [];

    for (let i = 0; i < size; i++) {
      const row: ListOfNumbers = [];

      for (let j = 0; j < size; j++) {
        row.push(prevNum);
        availableCells.push(prevNum); //updating the choices available for user/computer to opt from
        valueIndicesMatch[prevNum] = [i, j];
        prevNum += 1;
      }

      matrix.push(row);
    }

    return {
      matrix,
      valueIndicesMatch,
      availableCellIndices: availableCells,
    };
  }

  public static printBoard(board: Board): void {
    for (let row of board) {
      console.log(row.join(" | "));
    }
    console.log("\n");
  }

  public static updateAvailableMoves(
    availableMoves: ListOfNumbers,
    move: number
  ): void {
    const index = availableMoves.indexOf(move);
    availableMoves.splice(index, 1);
  }

  public static updateMoveInBoard(
    matrix: Board,
    move: number,
    moveMadeByIcon: string,
    availableMoves: ListOfNumbers,
    movesIndexMatchings: CellValueIndexMatching
  ): void {
    const indices = movesIndexMatchings[move];
    matrix[indices[0]][indices[1]] = moveMadeByIcon;

    BoardUtils.updateAvailableMoves(availableMoves, move);
    BoardUtils. printBoard(matrix);
  }

  public static isWinningMove(matrix: Board): boolean {
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

    return firstDiagonal.size === 1 || secondDiagonal.size === 1 ? true : false;
  }

  public static isTie(availableMoves: ListOfNumbers): boolean {
    if (availableMoves.length === 0) {
      return true;
    }

    return false;
  }
}
