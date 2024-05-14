//photographer-media.js
import MediaElement from "./mediaElement.js";
import { SortMedia } from "../utils/sortFunctions.js";
import { displayMediaModal } from "../pages/photographer.js";
import { addURLParameter } from "../utils/urlUtils.js";

export default class DisplayMediaTemplate extends MediaElement {
    static count = 0;
    constructor(data, price) {
        super();
        this.data = data;
        this.mediaElement = new MediaElement(data);
        this.thumbnails = true;
        this.params = new URL(location.href).searchParams;
        this.mediaId = Number(this.params.get("mediaID"));
        this.price = price;
    }

    titleElement() {
        const { title, likes } = this.data;
        const mediaTitle = document.createElement("div");
        mediaTitle.classList.add("title-inline");
        mediaTitle.innerHTML = `
            <h3 class="media-title">${title}</h3>
            <div class="nb-like">
                <p>${likes}</p>

                    <img 
                        src="./assets/images/icons/heart.svg" 
                        alt="like" 
                        data-liked="false"
                        tabindex="0"
                        class="btn-like" 
                        aria-label="like it"
                    />
              
            </div>
        `;
        return mediaTitle;
    }

    getMediaCardDOM(className, cssIdName, mediaModalId) {
        const { title, id } = this.data;
        const panel = document.createElement("article");
        panel.classList.add("media");
        panel.innerHTML = `
        <button  
            type="button" 
            data-media="${id}" 
            class="button_card" 
            tabindex="0" 
            aria-label="link to ${title}"></button>
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
        const likeButtons = panel.querySelectorAll(".btn-like");
        likeButtons.forEach((likeButton) => {
            likeButton.addEventListener("click", (event) => {
                this.handleLike(event.target);
            });
        });
        likeButtons.forEach((likeButton) => {
            likeButton.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    this.handleLike(event.target);
                }
            });
        });

        return panel;
    }
    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.handleLike(button);
        }
    }
    handleLike(button) {
        const nbLikeContainer = button
            .closest(".media")
            .querySelector(".nb-like");
        const likeCountElement = nbLikeContainer.querySelector("p");
        let currentLikes = parseInt(likeCountElement.textContent);
        if (button.dataset.liked === "false") {
            DisplayMediaTemplate.count++;
            currentLikes++;
            likeCountElement.textContent = currentLikes;
            button.dataset.liked = true;
            const footerLike = document.querySelector(".info .nb-like p");
            const newValue = Number(footerLike.textContent);
            footerLike.textContent = newValue + 1;
        } else if (button.dataset.liked === "true") {
            DisplayMediaTemplate.count--;
            currentLikes--;
            likeCountElement.textContent = currentLikes;
            button.dataset.liked = false;
            const footerLike = document.querySelector(".info .nb-like p");
            const newValue = Number(footerLike.textContent);
            footerLike.textContent = newValue - 1;
        }
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
