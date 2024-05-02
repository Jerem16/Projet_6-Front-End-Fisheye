import Modal from "../utils/contactForm.js";

export default class PhotographHeadTemplate extends Modal {
    constructor(data) {
        super();
        this.data = data;
    }

    getHeaderCardDOM(cssIdName) {
        const { name, city, country, tagline, portrait } = this.data;

        const section = document.createElement("section");
        section.classList.add("photograph-header");
        section.innerHTML = `
        <div class="header-segment">
            <div class="photograph-info">
                <h1 class="title-name">${name}</h1>
                <p class="title-location">${city}, ${country}</p>
                <p class="title-slogan">${tagline}</p>
            </div>
        </div>
        <div class="header-segment">
            <button type="button" class="contact_button" tabindex="0">
                Contactez-moi
            </button>
        </div>
        <div class="header-segment">
            <div class="image-container">
                <img
                    src="./assets/images/photographers/${portrait}";
                    alt="${name}"
                />
            </div>
        </div>
        `;

        const openModalButton = section.querySelector(
            ".photograph-header button"
        );
        openModalButton.addEventListener("click", () =>
            this.openModal(cssIdName)
        );

        return section;
    }
}
