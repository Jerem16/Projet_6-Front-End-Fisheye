//photographer-media.js
import MediaElement from "./mediaElement.js";
import { SortMedia } from "../api/Api.js";
import { displayMediaModal } from "../pages/photographer.js";
import { addURLParameter } from "../utils/urlUtils.js";

export default class DisplayMediaTemplate extends MediaElement {
    constructor(data) {
        super();
        this.data = data;
        this.mediaElement = new MediaElement(data);
        this.thumbnails = true;
        this.params = new URL(location.href).searchParams;
        this.mediaId = Number(this.params.get("mediaID"));
    }

    titleElement() {
        const { title, likes } = this.data;
        const mediaTitle = document.createElement("div");
        mediaTitle.classList.add("title-inline");
        mediaTitle.innerHTML = `
            <h3 class="media-title">${title}</h3>
            <div class="nb-like">
                <p>${likes}</p>
                <img src="./assets/images/icons/heart.svg" alt="like" />
            </div>
        `;
        return mediaTitle;
    }

    getMediaCardDOM(className, cssIdName, mediaModalId) {
        const { title, id } = this.data;
        const panel = document.createElement("article");
        panel.classList.add("media");
        panel.innerHTML = `
        <button  type="button" data-media="${id}" class="button_card" tabindex="0" aria-label="link to ${title}">
        </button>
    `;
        panel.appendChild(
            this.mediaElement.createElement(
                className,
                this.thumbnails,
                mediaModalId
            )
        );
        panel.appendChild(this.titleElement());

        const openMediaModal = panel.querySelector(".media .button_card");
        openMediaModal.addEventListener("click", async (event) => {
            event.preventDefault();
            this.openMediaModal(cssIdName);
        });
        return panel;
    }

    async openMediaModal(cssIdName) {
        const index = this.data.id;
        const mediaIndex = await getMediaIndex(index);
        addURLParameter("mediaID", mediaIndex);
        this.renderMediaModalIndex(cssIdName, mediaIndex);
    }

    async renderMediaModalIndex(cssIdName, index) {
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
