let matrix = [[], [], []];
let stepCount = 0;
let cols = 3;
let rows = 3;
let mark = "X";

const initState = () => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = null;
    }
  }
  console.log(matrix);
};

const changeMatrixValue = (element) => {
  const row = parseInt(element.dataset.row, 10);
  const cell = parseInt(element.dataset.cell, 10);
  matrix[row][cell] = element.textContent;
};

const deleteSigns = () => {
  document.querySelectorAll(".cell").forEach((item) => (item.textContent = ""));
};

const increaseCounter = () => {
  stepCount++;
};

const modifyCell = (element) => {
  element.textContent = mark;
  element.removeEventListener("click", handleClick);
};

const setMark = () => {
  if (mark === "X") {
    mark = "0";
  } else if (mark === "0") {
    mark = "X";
  }
};

const handleClick = (event) => {
  increaseCounter();
  modifyCell(event.target);
  setMark();
  changeMatrixValue(event.target);
  checkWinner();
};

const addClickListener = () => {
  document
    .querySelectorAll(".cell")
    .forEach((item) => item.addEventListener("click", handleClick));
};

const removeAllClickListeners = () => {
  document
    .querySelectorAll(".cell")
    .forEach((item) => item.removeEventListener("click", handleClick));
};

const checkValues = (array) =>
  array
    .map((row) => {
      return (
        row[0] === row[1] &&
        row[1] === row[2] &&
        row[0] === row[2] &&
        row[0] !== null
      );
    })
    .indexOf(true) !== -1;

const checkColumnValues = () =>
  checkValues(matrix.map((array, i) => array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
  checkValues([
    matrix.map((array, i) => matrix[i][i]),
    matrix.map((array, i) => matrix[i][matrix[i].length - i - 1]),
  ]);

const checkWinner = () => {
  console.log(checkColumnValues(), checkDiagonalValues());
  if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues()) {
    endGame();
  }
};

const setMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

const startGame = () => {
  initState();
  addClickListener();
  newGame();
};

const endGame = () => {
  setMessage(`The winner is Player ${mark === "X" ? "O" : "X"} .`);
  removeAllClickListeners();
};

const newGame = () => {
  document.querySelector(".start__button").addEventListener("click", () => {
    initState();
    addClickListener();
    deleteSigns();
    setMessage("Playing...");
    setMark();
  });
};

startGame();
