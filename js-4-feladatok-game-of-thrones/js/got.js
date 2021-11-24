const character_container = document.querySelector(".character-container");
let renderedCharacterObjects;

const getImages = async (url) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    const filteredResponse = responseJson.filter(
      (item) => !item.dead && !(item.name === "Osha")
    );
    filteredResponse.sort((a, b) => a.name.localeCompare(b.name));
    renderedCharacterObjects = filteredResponse;
    createHtmlElements(filteredResponse);
  } catch (error) {
    console.error(error);
  }
};

const createHtmlElements = (arr) => {
  arr.map((item) => {
    var div = document.createElement("div");
    var img = document.createElement("img");
    var p = document.createElement("p");
    div.setAttribute("class", "one_char_container");
    character_container.appendChild(div);
    img.setAttribute("src", `../${item.portrait}`);
    img.setAttribute("alt", `${item.name}`);
    p.innerText = `${item.name}`;
    addEventListenerToP(item, p);
    div.appendChild(img);
    div.appendChild(p);
  });
};

const addEventListenerToP = (obj, element) => {
  element.addEventListener("click", changeInfoValues.bind(this, obj));
};

const changeInfoValues = (object) => {
  let info_img = document.querySelector(".info-img");
  info_img.style.visibility = "unset";
  if (object.picture) {
    info_img.src = `../${object.picture}`;
  } else {
    info_img.src = "../assets/pictures/iron-throne.jpg";
  }
  document.querySelector(".info_bio").style.visibility = "unset";
  document.querySelector(".info_name").style.visibility = "unset";
  document.querySelector(".info_bio").innerHTML = object.bio;
  document.querySelector(".info_name").innerHTML = object.name;
  let house_img = document.querySelector(".house_img");
  if (object.house) {
    house_img.style.visibility = "unset";
    house_img.src = `../assets/houses/${object.house}.png`;
  } else {
    house_img.style.visibility = "hidden";
  }
};

const checkIfEnterKeyIsPressed = () => {
  let inputElement = document.querySelector(".input");
  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchForValue(event.target.value);
    }
  });
};

const searchForValue = (textValue) => {
  let indexOfSearchedObject = -1;
  renderedCharacterObjects.map((item, index) => {
    if (item.name.toUpperCase() === textValue.toUpperCase()) {
      indexOfSearchedObject = index;
    }
  });
  if (indexOfSearchedObject === -1) {
    searchValueNotFound();
  } else {
    changeInfoForSearchedValue(indexOfSearchedObject);
  }
};

const searchValueNotFound = () => {
  document.querySelector(".info-img").style.visibility = "hidden";
  document.querySelector(".house_img").style.visibility = "hidden";
  document.querySelector(".info_bio").style.visibility = "hidden";
  document.querySelector(".info_name").style.visibility = "hidden";
  if (document.querySelector(".info-img").style.visibility === "hidden") {
    document.querySelector(".info_name").style.visibility = "unset";
    document.querySelector(".info_name").innerText = "Character not found.";
  }
  console.log("Character not found.");
  return;
};

const changeInfoForSearchedValue = (index) => {
  changeInfoValues(renderedCharacterObjects[index]);
};

getImages("../json/got.json");
checkIfEnterKeyIsPressed();
