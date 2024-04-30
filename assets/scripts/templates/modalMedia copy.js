import MediaElement from "../templates/mediaElement.js";
import { GetPhotographers, SortMedia, GetMedia } from "../api/Api.js";

// import Modal from "../utils/contactForm.js";

export default class ModalMedia extends MediaElement {
    constructor(data) {
        super(data); // Appel du constructeur de la classe parente avec les données
        this.currentIndex = JSON.parse(sessionStorage.getItem("mediaIndex")); // Définir l'index initial
        this.mediaData = data; // Assurez-vous que data contient les données des médias
    }

    closeButton() {
        const closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("tabindex", "0");
        closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
            <g clip-path="url(#clip0_120_794)">
                <path d="M57 19.23L52.77 15L36 31.77L19.23 15L15 19.23L31.77 36L15 52.77L19.23 57L36 40.23L52.77 57L57 52.77L40.23 36L57 19.23Z" fill="#911C1C"/>
            </g>
            <defs>
                <clipPath id="clip0_120_794">
                    <rect width="72" height="72" fill="white"/>
                </clipPath>
            </defs>
        </svg>
        `;
        return closeButton;
    }

    sliderContent() {
        return document.createElement("div");
    }

    sliderArrow() {
        const sliderArrows = document.createElement("div");
        sliderArrows.classList.add("slider-arrows");
        sliderArrows.innerHTML = `
            <img class="arrow arrow_left" src="./assets/images/icons/arrow.svg" alt="arrow_left" />
            <img class="arrow arrow_right" src="./assets/images/icons/arrow.svg" alt="arrow_right" />
        `;
        return sliderArrows;
    }
    updateImage() {
        const sliderContent = document.querySelector(".media-container");
        sliderContent.innerHTML = "";

        // Vérifie si this.mediaData est défini avant d'accéder à this.mediaData[this.currentIndex]
        if (this.mediaData && this.mediaData.length > 0) {
            // Crée l'élément d'image correspondant à l'index actuel
            const imageElement = this.createElement(
                "media-container",
                this.mediaData[this.currentIndex]
            );
            sliderContent.appendChild(imageElement);
        }
    }

    getModalMedia(className, cssIdName) {
        const modalPage = document.getElementById("modal_media");
        modalPage.innerHTML = `                
        <div class="media-slider">
        </div>`;

        const sliderContent = this.sliderContent();
        const closeButton = this.closeButton();
        const sliderArrows = this.sliderArrow();

        modalPage.querySelector(".media-slider").appendChild(closeButton);
        modalPage.querySelector(".media-slider").appendChild(sliderContent);
        modalPage.querySelector(".media-slider").appendChild(sliderArrows);

        sliderContent.appendChild(this.createElement(className));

        closeButton.addEventListener("click", () => this.closeModal(cssIdName));

        const prevButton = modalPage.querySelector(".arrow_left");
        const nextButton = modalPage.querySelector(".arrow_right");

        console.log(this.data);
        console.log(this.currentIndex);

        prevButton.addEventListener("click", async () => {
            const allMedia = await getAllMedia();
            console.log("click");
            console.log(allMedia);
            console.log(this.currentIndex);

            console.log(this.data);
            this.currentIndex =
                (this.currentIndex - 1 + this.mediaData.length) %
                this.mediaData.length;
            this.updateImage();
        });

        nextButton.addEventListener("click", async () => {
            const allMedia = await getAllMedia();
            console.log("click");
            console.log(allMedia);
            console.log(this.currentIndex);

            this.currentIndex = (this.currentIndex + 1) % this.mediaData.length;
            this.updateImage();
        });

        // Ajoute l'écouteur d'événement pour le bouton de fermeture
        // const closeButton = modalPage.querySelector(".close-button");
        closeButton.addEventListener("click", () => this.closeModal(cssIdName));

        this.updateImage();

        return modalPage;
    }
}
async function getAllMedia() {
    const mediaID = new SortMedia();
    const mediaData = await mediaID.sortAllMediaByFilter();
    return mediaData;
}
