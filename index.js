console.clear();

import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

// Fetch data
async function fetchData(page) {
  const url = "https://rickandmortyapi.com/api/character?page=${page}";
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    maxPage = data.info.pages;
    console.log(maxPage);
    updatePagination();
    cardContainer.innerHTML = "";
    data.results.forEach((character) => {
      const characterCard = CharacterCard(character);
      cardContainer.appendChild(characterCard);
    });
  } catch (error) {
    console.log("Failed to fetch charatcers", error);
  }
}

function updatePagination() {
  pagination.textContent = `${page} / ${maxPage}`;
}
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchData(page);
  }
});
nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchData(page);
  }
});
fetchData(page);
