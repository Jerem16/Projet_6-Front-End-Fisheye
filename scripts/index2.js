import { Api, GetPhotographers } from "./Api.js";

const url = "../../data/photographers.json";

const api = new Api(url);
const getPhotographers = new GetPhotographers(url);

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// const url = "../../data/photographers.json";

// const api = new GetPhotographers(url);
// api.get();
async function init() {
    const photographers = await api.get();
    displayData(photographers);
}

init();
