import users from "../json/users.js";

const grid_container = document.querySelector(".grid-container");
const userArr = users.users;
const sumOfCellsInRow = Object.keys(userArr[0]).length + 1;

userArr.map((item, rowIndex) => {
  const row = document.createElement("div");
  row.className = `row row-${rowIndex}`;

  for (let colIndex = 0; colIndex < sumOfCellsInRow; colIndex++) {
    const cell = document.createElement("div");
    cell.innerHTML = Object.values(userArr[rowIndex])[colIndex] ?? null;
    if (colIndex === 4) {
      cell.className = "buttons_cell";
      const editButton = document.createElement("button");
      editButton.innerHTML = "Szerkesztés";
      editButton.className = "table_buttons edit_btn";
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Törlés";
      deleteButton.className = "table_buttons delete_btn";
      deleteButton.onclick = delRow;
      deleteButton.id = `${item.id}`;
      cell.appendChild(editButton);
      cell.appendChild(deleteButton);
    } else {
      cell.className = "information_cell";
    }
    row.appendChild(cell);
  }
  grid_container.appendChild(row);
});

function delRow() {
  const row = this.parentElement.parentElement;
  const id = row.querySelector("div:first-child").innerHTML;
  console.log(id);
}
