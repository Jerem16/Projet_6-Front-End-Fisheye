// photographer.js

import "../../styles/style.css";
import "../utils/menuSelected.js"
// import "../../styles/maquette_pp.css";


import photographHeadTemplate from "../templates/photographer-header.js";
import { GetPhotographer, GetMedia } from "../api/Api.js";
import ModalForm from "../templates/modalForm.js";

const url = "../../../assets/data/photographers.json";
const photographerId = Number(sessionStorage.getItem("photographerId"));

const api = new GetPhotographer(url);
const media = new GetMedia(url);

async function displayData(photographer) {
    const photographersSection = document.querySelector("#main");

    const photographerModel = new photographHeadTemplate(photographer);
    const userCardDOM = photographerModel.getHeaderCardDOM();
    // photographersSection.appendChild(userCardDOM);

    const modalFormPage = document.getElementById("formPage");
    const modal = new ModalForm(photographer);
    const modalRender = modal.getModalForm();
    modalFormPage.appendChild(modalRender);
}

async function init() {
    const photographer = await api.getPhotographerById(photographerId);
    const mediaPhotographer = await media.GetAllMediaById(photographerId);
    displayData(photographer);
}

init();
