import { fetchData, searchBar, cardContainer } from "../../index.js";
import { CharacterCard } from "../CharacterCard/CharacterCard.js";

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const searchInput = data.query.toLowerCase();

  try {
    const character = await fetchData();

    const filteredCharacters = character.filter((character) => {
      const characterName = character.name.toLowerCase();
      if (characterName.includes(searchInput)) {
        return characterName;
      } else {
        return null;
      }
    });

    cardContainer.innerHTML = "";

    filteredCharacters.forEach((character) => {
      const characterCard = CharacterCard(character);
      cardContainer.appendChild(characterCard);
    });
  } catch (error) {
    console.error("Error fetching data", error);
  }
});
