const character_container = document.querySelector(".character-container");

const getImages = async (url) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    const filteredResponse = responseJson.filter(
      (item) => !item.dead && !(item.name === "Osha")
    );
    filteredResponse.sort((a, b) => a.name.localeCompare(b.name));
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

const addEventListenerToP = (object, element) => {
  element.addEventListener("click", function () {
    document.querySelector(".info_bio").innerHTML = object.bio;
    document.querySelector(".info_name").innerHTML = object.name;
    let info_img = document.querySelector(".info-img");
    info_img.style.visibility = "unset";
    if (object.picture) {
      info_img.src = `../${object.picture}`;
    } else {
      info_img.src = "../assets/pictures/iron-throne.jpg";
    }
    let house_img = document.querySelector(".house_img");
    if (object.house) {
      house_img.style.visibility = "unset";
      house_img.src = `../assets/houses/${object.house}.png`;
    } else {
      house_img.style.visibility = "hidden";
    }
  });
};

getImages("../json/got.json");
