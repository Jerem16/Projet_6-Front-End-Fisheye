// photographer.js
import photographHeadTemplate from "../templates/mediaHeader.js";
import {
    GetPhotographers,
    GetMedia,
    likesCalculator,
    SortMedia,
} from "../api/Api.js";
import { FilterableMedia } from "../utils/menuSelected.js";
import { DisplayMediaMenu } from "../templates/mediaMenu.js";
import DisplayMediaTemplate from "../templates/mediaCardsElements.js";
import FooterTemplate from "../templates/mediaFooterInfo.js";
import ModalForm from "../templates/modalForm.js";
import ModalMedia from "../templates/mediaModal.js";
import {
    preloadImages,
    downloadImagesInBackground,
} from "../utils/preloadImages.js";

const params = new URL(location.href).searchParams;
const photographerId = Number(params.get("id"));

const indexParams = params.get("mediaID");
const mediaIndex = indexParams;

const photographersSection = document.querySelector("main");

sessionStorage.setItem("photographerId", photographerId);
const api = new GetPhotographers();
const media = new GetMedia();

const imageUrls = [];

async function displayData(photographer, mediaData, nbLikes) {
    const photographerModel = new photographHeadTemplate(photographer);
    const headerCardDOM = photographerModel.getHeaderCardDOM("contact_modal");

    const modal = new ModalForm(photographer);
    const modalRender = modal.getModalForm("contact_modal");

    const menu = new DisplayMediaMenu();
    const filterMenu = menu.displayMediaMenu();
    photographersSection.append(filterMenu);

    const runFilterMenu = new FilterableMedia();
    runFilterMenu.updateMedia();

    const footer = new FooterTemplate(photographer.price, nbLikes);
    const footerRender = footer.displayFooterCardDOM();

    if (mediaIndex) {
        const mediaID = new SortMedia();
        const mediaData1 = await mediaID.sortAllMediaByFilter();
        const modalMedia = new ModalMedia(mediaData1, Number(mediaIndex));
        const modalMediaRender = modalMedia.renderModal(
            "media-container",
            "modal_media"
        );
        const modal = document.getElementById("modal_media");
        modal.style.display = "flex";
        console.log("mediaIndex ok", mediaIndex);
        return modalMediaRender;
    }

    return [headerCardDOM, modalRender, footerRender];
}

async function init() {
    console.log(photographerId);
    if (!photographerId || photographerId === null) {
        window.location.pathname = "/index.html";
    } else {
        const photographer = await api.getPhotographerById(photographerId);
        const mediaData = await media.getAllMediaById(photographerId);
        const nbLikes = likesCalculator(mediaData);
        displayData(photographer, mediaData, nbLikes);
        preloadMedia(mediaData);
    }
}

init();

export async function displayMedia(mediaData) {
    const panel = document.querySelector(".panel");
    mediaData.forEach((media, thumbnails) => {
        const DisplayMedia = new DisplayMediaTemplate(media, thumbnails);
        const mediaCardDOM = DisplayMedia.getMediaCardDOM(
            "media-container",
            "modal_media"
        );
        panel.append(mediaCardDOM);
    });
}

export async function displayMediaModal(array, index) {
    const modalMedia = new ModalMedia(array, index);
    const modalMediaRender = modalMedia.renderModal(
        "media-container",
        "modal_media"
    );
    return modalMediaRender;
}

export async function preloadMedia(mediaData) {
    mediaData.forEach((media) => {
        if (media.image) {
            imageUrls.push(
                `./assets/images/photo/${photographerId}/${media.image}`
            );
        } else if (media.video) {
            return;
        } else {
            console.error(
                "Ni l'URL de l'image ni l'URL de la vidéo ne sont définies pour le média :",
                media
            );
        }
    });
    await preloadImages(imageUrls);
    await downloadImagesInBackground(imageUrls);
}
