import "../../styles/photographer.css";
import Modal from "../utils/contactForm.js";
export default class PhotographHeadTemplate extends Modal {
    constructor(data) {
        super();
        this.data = data;
        const portrait = data.portrait;
        this.portrait = portrait;
        this.picture = `../../../assets/images/photographers/${portrait}`;
    }

    getHeaderCardDOM() {
        const { name, city, country, tagline } = this.data;
        const { picture } = this;

        const section = document.createElement("section");
        section.classList.add("photograph-header");
        section.innerHTML = `
        <div class="header-segment">
            <article class="photograph-info">
                <h1 class="title-name">${name}</h1>
                <p class="title-location">${city}, ${country}</p>
                <p class="title-slogan">${tagline}</p>
            </article>
        </div>
        <div class="header-segment">
            <button type="button" class="contact_button" tabindex="0">
                Contactez-moi
            </button>
        </div>
        <div class="header-segment">
            <div class="image-container">
                <img
                    src= ${picture}
                    alt=${name}
                    style="transform: scale(${this.data.scale}); object-position: ${this.data.position};"
                />
            </div>
        </div>
        `;

        const openModalButton = section.querySelector(
            ".photograph-header button"
        );
        openModalButton.addEventListener("click", this.openModal);

        // return section;
    }
}
