//photographer-media.js
import MediaElement from "../templates/mediaElement.js";
import { SortMedia } from "../api/Api.js";
import { displayMediaModal } from "../pages/photographer.js";
import { addURLParameter } from "../utils/urlUtils.js";

export default class DisplayMediaTemplate extends MediaElement {
    constructor(data) {
        super();
        this.data = data;
        this.mediaElement = new MediaElement(data);
        this.params = new URL(location.href).searchParams;
        this.mediaId = Number(this.params.get("mediaID"));
    }

    titleElement() {
        const { title, likes, id } = this.data;
        const mediaTitle = document.createElement("h3");
        mediaTitle.classList.add("media-title");
        mediaTitle.innerHTML = `
            ${title}
            <span>
                <p>${likes}</p>
                <img src="./assets/images/icons/heart.svg" alt="like" />
            </span>
            <a data-media="${id}" class="card" href="#" tabindex="0">
                link to ${title}
            </a>
        `;
        return mediaTitle;
    }

    getCardData() {
        const { id, image, video, title, likes, date, price } = this.data;
        return { id, image, video, title, likes, date, price };
    }

    getMediaCardDOM(className, cssIdName, index, mediaModalId) {
        const panel = document.createElement("article");
        panel.classList.add("media");

        panel.appendChild(
            this.mediaElement.createElement(className, mediaModalId)
        );
        panel.appendChild(this.titleElement());

        const openMediaModal = panel.querySelector(".media .card");
        openMediaModal.addEventListener("click", async (event) => {
            event.preventDefault();
            const index = this.data.id;

            const allMedia = await getAllMedia();
            const mediaIndex = await getMediaIndex(index);
            const mediaModal = document.getElementById("modal_media");
            mediaModal.innerHTML = "";
            addURLParameter("mediaID", mediaIndex);
            displayMediaModal(allMedia, mediaIndex);

            this.openModal(cssIdName);
        });
        if (this.mediaId) {
            console.log("mediaId", this.mediaId);
            this.openModalIndex(cssIdName);
        }

        return panel;
    }

    async openModalIndex(cssIdName) {
        const index = this.mediaId;
        const allMedia = await getAllMedia();
        displayMediaModal(allMedia, index);
        this.openModal(cssIdName);
    }
}

async function getAllMedia() {
    const mediaID = new SortMedia();
    const mediaData = await mediaID.sortAllMediaByFilter();
    return mediaData;
}
async function getMediaIndex(id) {
    const mediaID = new SortMedia();
    const mediaData = await mediaID.sortAllMediaByFilter(id);
    return mediaData.findIndex((media) => media.id === id);
}
