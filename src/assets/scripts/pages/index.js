// index.js

import "../../styles/style.css";
// import "../../styles/maquette_accueil.css";
import { GetPhotographers } from "../api/Api.js";
import PhotographerTemplate from "../templates/photographers-cards.js";

const url = "../../../assets/data/photographers.json";
const api = new GetPhotographers(url);

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );
    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const photographers = await api.getPhotographers();
    displayData(photographers);
}

init();

