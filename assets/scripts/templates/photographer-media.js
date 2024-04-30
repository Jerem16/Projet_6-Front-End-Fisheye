import MediaElement from "../templates/mediaElement.js";
import { GetPhotographers, SortMedia, GetMedia } from "../api/Api.js";
import { displayMediaModal } from "../pages/photographer.js";

export default class DisplayMediaTemplate extends MediaElement {
    constructor(data) {
        super();
        this.data = data;
        this.mediaElement = new MediaElement(data);
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
            const index = this.data.id;
            const mediaIndex = await getMediaIndex(index);
            const allMedia = await getAllMedia();
            sessionStorage.setItem("mediaId", JSON.stringify(index));
            sessionStorage.setItem("mediaIndex", JSON.stringify(mediaIndex));
            // Obtenez l'index de l'objet dans le tableau

            // index = mediaIndex;
            // Vérifier si cardData.id est un nombre valide
            // if (!isNaN(cardData.id)) {
            const mediaModal = document.getElementById("modal_media");
            mediaModal.innerHTML = "";

            // const allMedia = await getAllMedia();
            // const mediaIndex = await getMediaIndex(cardData.id);
            // console.log("mediaIndex", mediaIndex);
            // console.log("allMedia", allMedia[mediaIndex]);
            displayMediaModal(allMedia[mediaIndex]);
            // }

            this.openModal(cssIdName);
            event.preventDefault();
        });

        return panel;
    }
}

async function getMediaModalId(id) {
    const mediaID = new GetMedia();
    const mediaModalId = await mediaID.getMediaById(id);
    return mediaModalId;
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
