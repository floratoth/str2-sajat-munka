const createPharaghraph = () => {
  const listItems = ["első", "második", "harmadik"];
  document.body.innerHTML = listItems
    .map((item) => "<p>" + item + "</p>")
    .join("");
};

//createPharaghraph();

const createList = () => {
  const list = document.querySelector(".list");
  const listItems = ["első", "második", "harmadik"];
  list.textContent = listItems.join(" ,");
};

createList();

const person = {
  name: "Kis Miska",
  age: 20,
};

const checkProperties = (obj) => {
  for (let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      console.log(prop);
    }
  }
};
