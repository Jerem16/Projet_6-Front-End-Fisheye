// index.js
import { GetPhotographers } from "../api/Api.js";
import PhotographerTemplate from "../templates/photographersCards.js";
import { KeyboardNavigation } from "../utils/arrowNav.js";

const api = new GetPhotographers();

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );

    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
    const links = ".card";
    const keyboardListeners = new KeyboardNavigation(links);
    keyboardListeners.keyListeners();
}

async function init() {
    const photographers = await api.getPhotographers();
    displayData(photographers);
}

init();
