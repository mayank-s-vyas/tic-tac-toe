import { ListOfNumbers } from "../types/GameTypes";

export class RandomGeneratorUtils {
     public static generateRandomComputerMove(availableMoves: ListOfNumbers): number {
        const index: number = Math.floor(Math.random() * availableMoves.length);
      
        console.log(`Computer selected :  ${availableMoves[index]}`);
      
        return availableMoves[index];
      }

}