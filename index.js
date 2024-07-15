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
const maxPage = 1;
const page = 1;
const searchQuery = "";

CharacterCard();

// Fetch data
const url = "https://rickandmortyapi.com/api/character";
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    data.results.forEach((character) => {
      CharacterCard();
    });
  } catch (error) {
    console.log(error);
  }
}
fetchData();
