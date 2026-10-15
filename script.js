// ---------- Piece A: grab elements and load saved data ----------
const form = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const categorySelect = document.getElementById("item-category");
const closetList = document.getElementById("closet-list");
const generateBtn = document.getElementById("generate-btn");
const outfitDiv = document.getElementById("outfit");

let items = JSON.parse(localStorage.getItem("items")) || [];

// ---------- Piece B: show the closet ----------
function renderCloset() {
  closetList.innerHTML = "";
  items.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item.name + " (" + item.category + ")";
    closetList.appendChild(li);
  });
}

renderCloset();

// ---------- Piece C: add an item ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newItem = {
    name: nameInput.value,
    category: categorySelect.value
  };

  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));

  renderCloset();
  form.reset();
});

// ---------- Piece D: generate an outfit ----------
function pickRandom(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

generateBtn.addEventListener("click", function () {
  const tops = items.filter(function (item) { return item.category === "top"; });
  const bottoms = items.filter(function (item) { return item.category === "bottom"; });
  const shoes = items.filter(function (item) { return item.category === "shoes"; });

  if (tops.length === 0 || bottoms.length === 0 || shoes.length === 0) {
    outfitDiv.textContent = "Add at least one top, one bottom, and one pair of shoes first.";
    return;
  }

  outfitDiv.innerHTML =
    "<p>Top: " + pickRandom(tops).name + "</p>" +
    "<p>Bottom: " + pickRandom(bottoms).name + "</p>" +
    "<p>Shoes: " + pickRandom(shoes).name + "</p>";
});