import "../../styles/photographer.css";
export default class photographHeadTemplate {
    constructor(data) {
        this.data = data;
        const portrait = data.portrait; // Initialisation de portrait
        this.portrait = portrait; // Attribution de portrait à this.portrait

        this.picture = `../../../assets/images/photographers/${portrait}`;
    }

    openModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "flex";
    }

    getUserCardDOM() {
        const { name, city, country, tagline, price, id } = this.data;
        const { picture } = this;

        const section = document.createElement("section");
        section.classList.add("photograph-header");
        section.innerHTML = `
        <article class="photograph-info">
            <h1 class="title-name">${name}</h1>
            <p class="title-location">${city}, ${country}</p>
            <p class="title-slogan">${tagline}</p>
        </article>

        <button type="button" class="contact_button" tabindex="0">
            Contactez-moi
        </button>
        <div class="image-container">
            <img
                src= ${picture}
                alt=${name}
                style="transform: scale(${this.data.scale}); object-position: ${this.data.position};"
            />
        </div>
        `;

        const openModalButton = section.querySelector(
            ".photograph-header button"
        );
        openModalButton.addEventListener("click", this.openModal);

        return section;
    }
}
