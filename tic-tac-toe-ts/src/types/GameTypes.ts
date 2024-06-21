export type CreateBoardResponse = {
  matrix: (number | string)[][];
  valueIndicesMatch: { [key: number]: number[] };
  availableCellIndices: number[];
}

export type Board = (number | string)[][];

export type TossWinnerAndIconsResponse = {
  tossWinner: string;
  userIcon: string;
  compIcon: string;
};

export type CellValueIndexMatching = { [key: number]: number[] };

export type ListOfNumbers = number[];
