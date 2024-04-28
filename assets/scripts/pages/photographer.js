// photographer.js

// import "../utils/menuSelected.js";

import photographHeadTemplate from "../templates/photographer-header.js";
import { GetPhotographer, SortMedia } from "../api/Api.js";
import { DisplayMediaMenu, FilterableMedia } from "../utils/menuSelected.js";
import DisplayMediaTemplate from "../templates/photographer-media.js";

import ModalForm from "../templates/modalForm.js";

const params = new URL(location.href).searchParams;
const idParams = Number(params.get("id"));
const id = Number(sessionStorage.getItem("photographerId"));
const photographerId = idParams || id;

if (!photographerId) {
    window.location.href = "http://127.0.0.1:5500/index.html";
} else {
    sessionStorage.setItem("photographerId", photographerId);
    const api = new GetPhotographer();
    const media = new SortMedia();

    async function displayData(photographer, mediaData) {
        const photographersSection = document.querySelector("main");

        const photographerModel = new photographHeadTemplate(photographer);
        const headerCardDOM = photographerModel.getHeaderCardDOM();
        photographersSection.prepend(headerCardDOM);

        const menu = new DisplayMediaMenu();
        const filterMenu = menu.displayMediaMenu();
        photographersSection.append(filterMenu);

        const runFilterMenu = new FilterableMedia();
        runFilterMenu.updateMedia();

        const panel = document.querySelector(".panel");
        mediaData.forEach((medias) => {
            const DisplayMedia = new DisplayMediaTemplate(medias);
            const mediaCardDOM = DisplayMedia.getMediaCardDOM();
            panel.append(mediaCardDOM);
        });

        const modalFormPage = document.getElementById("formPage");
        const modal = new ModalForm(photographer);
        const modalRender = modal.getModalForm();
        modalFormPage.appendChild(modalRender);
    }

    async function init() {
        const photographer = await api.getPhotographerById(photographerId);
        const mediaData = await media.sortAllMediaByFilter(photographerId);
        console.log("mediaData", mediaData);
        displayData(photographer, mediaData);
    }

    init();
}
