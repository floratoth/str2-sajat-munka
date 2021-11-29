import users from "../json/users.js";
const userArr = users.users;

const deleteButtons = document.querySelectorAll(".delete_btn");
const deleteButtonsArr = Array.from(deleteButtons);
for (let key in deleteButtonsArr) {
  console.log(deleteButtonsArr[key].id);
}
