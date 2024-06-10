const USER = "You";
const COMPUTER = "Computer";

const USER_DEFAULT_ICON = "O";

const COMP_DEFAULT_ICON = "X";

let userIcon;
let compIcon;
let valueIndicesMatch;
let tossWinner;
const remainingPlaces = [];

// check if input is valid
function takeValidNumberInput() {
  let userInput = parseInt(prompt("what will be the size of matrix : "));

  while (isNaN(userInput) | (userInput < 3)) {
    userInput = prompt(
      "Matrix size you entered is not a number greater than 2 , please enter a valid number : "
    );
  }

  console.log(`You have selected the matrix: ${userInput} x ${userInput} `);

  return userInput;
}

// const matrixSize = takeValidNumberInput();

// console.log(matrixSize)

function getTossWinner() {
  alert("Should we toss the coin?");

  if (Math.random() > 0.5) {
    tossWinner = USER;

    const iconChoice = prompt(
      `${USER} won the toss, now please select the icon you want to play with : Enter O or X else we'll choose ${USER_DEFAULT_ICON} for you `
    );

    if ((iconChoice.toUpperCase() === "O") | (iconChoice.toUpperCase() === 0)) {
      userIcon = "O";
      compIcon = "X";
    } else if (iconChoice.toUpperCase() === "X") {
      userIcon = "X";
      compIcon = "O";
    } else {
      userIcon = USER_DEFAULT_ICON;
      compIcon = COMP_DEFAULT_ICON;
    }

    alert(`You have Chosen to play with : ${userIcon}`);
  } else {
    alert(
      `${COMPUTER} won the toss and has chosen to play with ${COMP_DEFAULT_ICON}`
    );

    tossWinner = COMPUTER;

    userIcon = USER_DEFAULT_ICON;
    compIcon = COMP_DEFAULT_ICON;
  }

  return tossWinner;
}

function createMatrix(size) {
  const matrix = [];

  valueIndicesMatch = {};

  let prevNum = 1;

  for (let i = 0; i < size; i++) {
    const row = [];

    for (let j = 0; j < size; j++) {
      row.push(prevNum);
      remainingPlaces.push(prevNum); //updating the choices available for user/computer to opt from
      valueIndicesMatch[prevNum] = [i, j];
      prevNum += 1;
    }

    matrix.push(row);
  }

  showMatrix(matrix);

  return matrix;
}

// createMatrix(4)

function showMatrix(matrixToBePrinted) {
  for (let row of matrixToBePrinted) {
    console.log(row.join(" | "));
  }
  console.log("\n");
}

function userMarkingInput(remainingPlaces) {
  let num = parseInt(
    prompt(`your chance please select only from : ${remainingPlaces}`)
  );

  while (!remainingPlaces.includes(num)) {
    num = parseInt(
      prompt(
        `You chose  : ${num}. This input is not valid, please enter options available from  : ${remainingPlaces}`
      )
    );
  }
  return num;
}

// console.log(createMatrix(matrixSize))

// const remainingPlaces = [1, 2, 3, 4, 4]
// prompt(`your chance please select only from : ${remainingPlaces}`)

function markChoiceInMatrix(inputNum, matrix, inputFrom) {
  const icon = inputFrom === USER ? userIcon : compIcon;

  const index = remainingPlaces.indexOf(inputNum);

  remainingPlaces.splice(index, 1);

  const inputIndicesMatrix = valueIndicesMatch[inputNum];

  matrix[inputIndicesMatrix[0]][inputIndicesMatrix[1]] = icon;

  // console.log(matrix)
  // console.log(inputIndicesMatrix)
  showMatrix(matrix);
}

function checkWinner(matrix, size) {
  const firstDiagonal = new Set();
  const secondDiagonal = new Set();

  for (let i = 0; i < size; i++) {
    const row = new Set();
    const column = new Set();

    firstDiagonal.add(matrix[i][i]);
    secondDiagonal.add(matrix[i][size - 1 - i]);

    for (let j = 0; j < size; j++) {
      row.add(matrix[i][j]);
      column.add(matrix[j][i]);
    }

    if ((row.size === 1) | (column.size === 1)) {
      return true;
    }
  }
  // console.log(firstDiagonal)
  // console.log(secondDiagonal)

  if ((firstDiagonal.size === 1) | (secondDiagonal.size === 1)) {
    return true;
  }

  return false;
}

const checkTie = (remainingelements) =>
  remainingelements.length === 0 ? true : false;

function generateComputerInput(remainingelements) {
  const index = Math.floor(Math.random() * remainingelements.length);

  console.log(`Computer selected :  ${remainingelements[index]}`);

  return remainingelements[index];
}

function gameFunctioning(
  tosswonby,
  matrix,
  matrixSizeUserInput,
  remainingPlaces
) {
  if (tosswonby === USER) {
    markChoiceInMatrix(userMarkingInput(remainingPlaces), matrix, USER);

    if (checkWinner(matrix, matrixSizeUserInput)) {
      alert("You Won");

      return;
    } else if (checkTie(remainingPlaces)) {
      alert("This is a tie");

      return;
    }

    markChoiceInMatrix(
      generateComputerInput(remainingPlaces),
      matrix,
      COMPUTER
    );

    if (checkWinner(matrix, matrixSizeUserInput)) {
      alert("Comp Won");

      return;
    } else if (checkTie(remainingPlaces)) {
      alert("This is a tie");

      return;
    }
  } else {
    markChoiceInMatrix(
      generateComputerInput(remainingPlaces),
      matrix,
      COMPUTER
    );

    if (checkWinner(matrix, matrixSizeUserInput)) {
      alert("Comp Won");

      return;
    } else if (checkTie(remainingPlaces)) {
      alert("This is a tie");

      return;
    }

    markChoiceInMatrix(userMarkingInput(remainingPlaces), matrix, USER);

    if (checkWinner(matrix, matrixSizeUserInput)) {
      alert("You Won");

      return;
    } else if (checkTie(remainingPlaces)) {
      alert("This is a tie");

      return;
    }
  }
}

function game() {
  const matrixSizeUserInput = takeValidNumberInput();

  const matrix = createMatrix(matrixSizeUserInput);

  showMatrix(matrix);

  const tosswinner = getTossWinner();

  console.log(tosswinner);

  while (
    !checkWinner(matrix, matrixSizeUserInput) &&
    !checkTie(remainingPlaces)
  ) {
    gameFunctioning(tosswinner, matrix, matrixSizeUserInput, remainingPlaces);
  }
}

game();
