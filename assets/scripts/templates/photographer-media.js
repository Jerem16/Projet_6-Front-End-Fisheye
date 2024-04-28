import Modal from "../utils/contactForm.js";
export default class DisplayMediaTemplate extends Modal {
    constructor(data) {
        super();
        this.data = data;
        // console.log("data DisplayMediaTemplate", this.data);
    }

    getMediaCardDOM() {
        const { title, likes, photographerId, image, video } = this.data;

        const panel = document.createElement("article");
        panel.classList.add("media");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        if (image) {
            imageContainer.innerHTML = `
                <img
                    src="./assets/images/photo/${photographerId}/${image}"
                    alt=""
                />
            `;
        } else {
            imageContainer.innerHTML = `
                <video
                    src="./assets/images/photo/${photographerId}/${video}"
                    controls
                    alt="Wild Horses in the Mountains"
                >
                    <track
                        src="#"
                        kind="subtitles"
                        srclang="fr"
                        label="French"
                    />
                </video>
            `;
        }

        panel.appendChild(imageContainer);

        panel.innerHTML += `
            <h3 class="media-title">
                ${title}
                <span>
                    <p>${likes}</p>
                    <img
                        src="./assets/images/icons/heart.svg"
                        alt=""
                    />
                </span>
            </h3>
            <a class="card" href="#" tabindex="0">
                link to ${title}
            </a>
        `;

        return panel;
    }
}

