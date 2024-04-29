import MediaElement from "../templates/mediaElement.js";

export default class DisplayMediaTemplate extends MediaElement {
    constructor(data) {
        super();
        this.data = data;
        this.mediaElement = new MediaElement(data);
    }

    titleElement() {
        const { title, likes, id, date } = this.data;
        const mediaTitle = document.createElement("h3");
        mediaTitle.classList.add("media-title");
        mediaTitle.innerHTML = `
            ${title}
            <span>
                <p>${likes}</p>
                <img
                    src="./assets/images/icons/heart.svg"
                    alt="like"
                />
            </span>
            
            <a data-media="${id}" class="card" href="#" tabindex="0">
                link to ${title}
            </a><p>${date}</p>
        `;
        return mediaTitle;
    }

    getMediaCardDOM(className, modalId) {
        const panel = document.createElement("article");
        panel.classList.add("media");

        panel.appendChild(this.mediaElement.createElement(className));

        panel.appendChild(this.titleElement());

        const openMediaModal = panel.querySelector(".media .card");
        openMediaModal.addEventListener("click", (event) => {
            this.openModal(modalId);
            event.preventDefault();
        });

        return panel;
    }
}
