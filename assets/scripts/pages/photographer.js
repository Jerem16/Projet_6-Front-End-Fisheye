// photographer.js
import photographHeadTemplate from "../templates/mediaHeader.js";
import { GetPhotographers, SortMedia } from "../api/Api.js";
import { DisplayMediaMenu, FilterableMedia } from "../utils/menuSelected.js";
import DisplayMediaTemplate from "../templates/mediaCardsElements.js";
import ModalForm from "../templates/modalForm.js";
import ModalMedia from "../templates/mediaModal.js";

const params = new URL(location.href).searchParams;
const idParams = Number(params.get("id"));
const id = Number(sessionStorage.getItem("photographerId"));
const photographerId = idParams || id;

const photographersSection = document.querySelector("main");
const modalSection = document.getElementById("formPage");

sessionStorage.setItem("photographerId", photographerId);
const api = new GetPhotographers();

async function displayData(photographer) {
    const photographerModel = new photographHeadTemplate(photographer);
    const headerCardDOM = photographerModel.getHeaderCardDOM("contact_modal");
    // photographersSection.append(headerCardDOM);

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
    if (!photographerId) {
        window.location.href = "http://127.0.0.1:5500/index.html";
    } else {
        const photographer = await api.getPhotographerById(photographerId);
        displayData(photographer);
    }
}

init();

export async function displayMedia(mediaData) {
    const panel = document.querySelector(".panel");
    mediaData.forEach((media) => {
        const DisplayMedia = new DisplayMediaTemplate(media);
        const mediaCardDOM = DisplayMedia.getMediaCardDOM(
            "media-container",
            "modal_media"
        );
        panel.append(mediaCardDOM);
    });
}

export async function displayMediaModal(array, index) {
    const modalMedia = new ModalMedia(array, index);
    const modalMediaRender = modalMedia.getModalMedia(
        "media-container",
        "modal_media"
    );
    if (modalMediaRender instanceof Node) {
        modalSection.appendChild(modalMediaRender);
    } else {
        console.error("Modal media render is not a valid HTML element.");
    }
}
