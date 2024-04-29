// photographer.js

// import "../utils/menuSelected.js";

import photographHeadTemplate from "../templates/photographer-header.js";
import { GetPhotographer, SortMedia } from "../api/Api.js";
import { DisplayMediaMenu, FilterableMedia } from "../utils/menuSelected.js";
import DisplayMediaTemplate from "../templates/photographer-media.js";

import ModalForm from "../templates/modalForm.js";
import ModalMedia from "../templates/modalMedia.js";

const params = new URL(location.href).searchParams;
const idParams = Number(params.get("id"));
const id = Number(sessionStorage.getItem("photographerId"));
const photographerId = idParams || id;

const photographersSection = document.querySelector("main");
const modalSection = document.getElementById("formPage");

if (!photographerId) {
    window.location.href = "http://127.0.0.1:5500/index.html";
} else {
    sessionStorage.setItem("photographerId", photographerId);
    const api = new GetPhotographer();
    const media = new SortMedia();

    async function displayData(photographer) {
        const photographerModel = new photographHeadTemplate(photographer);
        const headerCardDOM =
            photographerModel.getHeaderCardDOM("contact_modal");
        photographersSection.prepend(headerCardDOM);

        const modal = new ModalForm(photographer);
        const modalRender = modal.getModalForm("contact_modal");
        modalSection.appendChild(modalRender);

        const menu = new DisplayMediaMenu();
        const filterMenu = menu.displayMediaMenu();
        photographersSection.append(filterMenu);

        const runFilterMenu = new FilterableMedia();
        runFilterMenu.updateMedia();
    }

    async function init() {
        const photographer = await api.getPhotographerById(photographerId);
        // const mediaData = await media.sortAllMediaByFilter(photographerId);

        displayData(photographer);
        // displayMedia(mediaData);

        // const runFilterMenu = new FilterableMedia();

        // runFilterMenu.updateMedia(async (filter) => {
        //     // Mettez à jour les médias affichés en fonction du nouveau filtre sélectionné
        //     const updatedMediaData = await media.sortAllMediaByFilter(
        //         photographerId,
        //         filter
        //     );
        //     displayMedia(updatedMediaData);
        // });
    }

    init();
}

export default async function displayMedia(mediaData) {
    const panel = document.querySelector(".panel");
    mediaData.forEach((medias) => {
        const DisplayMedia = new DisplayMediaTemplate(medias);
        const mediaCardDOM = DisplayMedia.getMediaCardDOM(
            "media-container",
            "modal_media"
        );
        panel.append(mediaCardDOM);
        const modalMedia = new ModalMedia(medias);
        const modalMediaRender = modalMedia.getModalMedia(
            "media-container",
            "modal_media"
        );
        modalSection.appendChild(modalMediaRender);
    });
}
