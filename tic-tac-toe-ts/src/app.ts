import { GameUtils } from "./utils/GameUtils";

class Game {
  public static start(): void {
    GameUtils.runTicTacToeGame();
  }
  public static stop() {}
}

Game.start();
