console.clear();

import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
export const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

// Search bar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query.toLowerCase();

  page = 1;

  fetchData();
});

// Fetch data
export async function fetchData() {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    maxPage = data.info.pages;

    updatePagination(page);

    cardContainer.innerHTML = "";
    data.results.forEach((character) => {
      const characterCard = CharacterCard(character);
      cardContainer.appendChild(characterCard);
    });

    return data.results;
  } catch (error) {
    console.log("Failed to fetch characters", error);
  }
}

function updatePagination(page) {
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
