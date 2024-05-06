import Modal from "../utils/openAndCoseModal.js";

export default class PhotographHeadTemplate extends Modal {
    constructor(data) {
        super();
        this.data = data;
    }

    createHeaderTitle() {
        const { name, city, country, tagline } = this.data;
        const headerInfo = document.querySelector(".photograph-info");
        headerInfo.innerHTML = `
        <h1 class="title-name">${name}</h1>
        <p class="title-location">${city}, ${country}</p>
        <p class="title-slogan">${tagline}</p>
        `;
        return headerInfo;
    }

    createHeaderImage() {
        const { name, portrait } = this.data;
        const headerImage = document.querySelector(".header_image");
        headerImage.innerHTML = `
        <img
            src="./assets/images/photographers/${portrait}"
            alt="${name}"
        />
        `;
        return headerImage;
    }

    getHeaderCardDOM(cssIdName) {
        const titleContent = this.createHeaderTitle();
        const imageContent = this.createHeaderImage();
        const openModalButton = document.querySelector(".contact_button");
        openModalButton.addEventListener("click", () =>
            this.openModal(cssIdName)
        );

        return [titleContent, imageContent];
    }
}
