import * as readlineSync from "readline-sync";

import {
  TossWinnerAndIconsResponse,
  ListOfNumbers,
  Board,
  CellValueIndexMatching,
} from "../types/GameTypes";

import { BoardUtils } from "./BoardUtils";

import { RandomGeneratorUtils } from "./RandomGeneratorUtils";

import {
  COMPUTER,
  COMP_DEFAULT_ICON,
  USER,
  USER_DEFAULT_ICON,
} from "./constants";

export class GameUtils {
  public static determineTossWinnerAndIcons(): TossWinnerAndIconsResponse {
    console.log("We are tossing the coin to decide who will start the game");
    let tossWinner: string;
    let input: string;
    let userIcon: string = USER_DEFAULT_ICON;
    let compIcon: string = COMP_DEFAULT_ICON;

    tossWinner = Math.random() > 0.5 ? USER : COMPUTER;

    if (tossWinner === USER) {
      input = readlineSync.question(
        `${tossWinner} won the toss, now please select the icon you want to play with : Enter O or X else we'll choose ${USER_DEFAULT_ICON} for you : `
      );
      userIcon =
        input.toUpperCase() === "O" ||
        input.toUpperCase() === "0" ||
        input.toUpperCase() === "X"
          ? input.toUpperCase()
          : USER_DEFAULT_ICON;

      console.log(`You have Chosen to play with : ${userIcon}`);
      compIcon =
        userIcon === USER_DEFAULT_ICON ? COMP_DEFAULT_ICON : USER_DEFAULT_ICON;
    } else {
      console.log(
        `${tossWinner} won the toss and has chosen to play with ${compIcon}`
      );
    }

    return { tossWinner, userIcon, compIcon };
  }

  public static getUserMoveInput(availableMoves: ListOfNumbers): number {
    let num: number;
    do {
      const userInput = readlineSync.question(
        `Please choose a move exclusively from the available options: ${availableMoves}:  `
      );
      num = parseInt(userInput);
     
    } while (isNaN(num) || !availableMoves.includes(num));
    return num;
  }



  public static processMove(
    matrix: Board,
    availableMoves: ListOfNumbers,
    movesIndexMatchings: CellValueIndexMatching,
    userIcon: string,
    inputIcon: string
  ): void {
    if (BoardUtils.isWinningMove(matrix) || BoardUtils.isTie(availableMoves)) {
      return;
    }
    const move =
      inputIcon === userIcon
        ? GameUtils.getUserMoveInput(availableMoves)
        : RandomGeneratorUtils.generateRandomComputerMove(availableMoves);

    BoardUtils.updateMoveInBoard(
      matrix,
      move,
      inputIcon,
      availableMoves,
      movesIndexMatchings
    );

    const winner = inputIcon === userIcon ? USER : COMPUTER;

    if (BoardUtils.isWinningMove(matrix)) {
      console.log(`${winner} won.`);
      return;
    }

    if (BoardUtils.isTie(availableMoves)) {
      console.log("This is tie");
      return;
    }
  }

  public static runGameRound(
    matrix: Board,
    availableMoves: ListOfNumbers,
    movesIndexMatchings: CellValueIndexMatching,
    tossWonby: string,
    userIcon: string,
    compIcon: string
  ): void {
    const player1 = tossWonby === USER ? userIcon : compIcon;
    const player2 = tossWonby === USER ? compIcon : userIcon;

    GameUtils.processMove(
      matrix,
      availableMoves,
      movesIndexMatchings,
      userIcon,
      player1
    );
    GameUtils.processMove(
      matrix,
      availableMoves,
      movesIndexMatchings,
      userIcon,
      player2
    );
  }

  public static runTicTacToeGame(): void {
    const matrixSizeUserInput = BoardUtils.getValidBoardSize();

    const {
      matrix,
      valueIndicesMatch,
      availableCellIndices: availableMoves,
    } = BoardUtils.createBoard(matrixSizeUserInput);

    BoardUtils.printBoard(matrix);

    const { tossWinner, userIcon, compIcon } =
      GameUtils.determineTossWinnerAndIcons();

    while (
      !BoardUtils.isWinningMove(matrix) &&
      !BoardUtils.isTie(availableMoves)
    ) {
      GameUtils.runGameRound(
        matrix,
        availableMoves,
        valueIndicesMatch,
        tossWinner,
        userIcon,
        compIcon
      );
    }
  }
}

