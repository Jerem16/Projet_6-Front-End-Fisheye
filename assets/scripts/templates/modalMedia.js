//modalMedia.js

import MediaElement from "../templates/mediaElement.js";
import { SortMedia } from "../api/Api.js";
import { addURLParameter, removeURLParameter } from "../utils/urlUtils.js";

async function getAllMedia() {
    const mediaID = new SortMedia();
    const mediaData = await mediaID.sortAllMediaByFilter();
    return mediaData;
}

export default class ModalMedia extends MediaElement {
    constructor(data, index) {
        super();
        this.data = data;
        this.currentIndex = index;
        this.currentData = data[this.currentIndex];
    }

    closeButton() {
        const closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("tabindex", "0");
        closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
            <g clip-path="url(#clip0_120_794)">
                <path d="M57 19.23L52.77 15L36 31.77L19.23 15L15 19.23L31.77 36L15 52.77L19.23 57L36 40.23L52.77 57L57 52.77L40.23 36L57 19.23Z" fill="#911C1C"/>
            </g>
            <defs>
                <clipPath id="clip0_120_794">
                    <rect width="72" height="72" fill="white"/>
                </clipPath>
            </defs>
        </svg>
        `;
        return closeButton;
    }

    sliderContent() {
        const shoMedia = document.createElement("div");
        shoMedia.setAttribute("id", "carroussel");
        return shoMedia;
    }

    sliderArrow() {
        const sliderArrows = document.createElement("div");
        sliderArrows.classList.add("slider-arrows");
        sliderArrows.innerHTML = `
            <img class="arrow arrow_left" src="./assets/images/icons/arrow.svg" alt="arrow_left" />
            <img class="arrow arrow_right" src="./assets/images/icons/arrow.svg" alt="arrow_right" />
        `;
        return sliderArrows;
    }
    updateImage(newData) {
        const slider = document.getElementById("carroussel");
        slider.innerHTML = `        
        `;
        const media = new MediaElement(newData);
        slider.appendChild(media.createElement("media-container"));
        return slider;
    }
    getModalMedia(className, cssIdName) {
        const modalPage = document.getElementById("modal_media");
        modalPage.innerHTML = `                
        <div class="media-slider">
        </div>`;

        const sliderContent = this.sliderContent();
        const closeButton = this.closeButton();
        const sliderArrows = this.sliderArrow();

        modalPage.querySelector(".media-slider").appendChild(closeButton);
        modalPage.querySelector(".media-slider").appendChild(sliderContent);
        modalPage.querySelector(".media-slider").appendChild(sliderArrows);

        const media = new MediaElement(this.currentData);
        sliderContent.appendChild(media.createElement(className));

        closeButton.addEventListener("click", () => {
            removeURLParameter("mediaID");
            this.closeModal(cssIdName);
        });

        const prevButton = modalPage.querySelector(".arrow_left");
        const nextButton = modalPage.querySelector(".arrow_right");

        prevButton.addEventListener("click", async () => {
            const allMedia = await getAllMedia();
            const nbOfIndex = allMedia.length;
            const prevIndex = (this.currentIndex - 1 + nbOfIndex) % nbOfIndex;
            const prevData = allMedia[prevIndex];
            this.currentIndex = prevIndex;
            this.data = prevData;
            addURLParameter("mediaID", prevIndex);
            this.updateImage(prevData);
        });

        nextButton.addEventListener("click", async () => {
            const allMedia = await getAllMedia();
            const nbOfIndex = allMedia.length;
            const nextIndex = (this.currentIndex + 1) % nbOfIndex;
            const nextData = allMedia[nextIndex];
            this.currentIndex = nextIndex;
            this.data = nextData;
            addURLParameter("mediaID", nextIndex);
            this.updateImage(nextData);
        });

        closeButton.addEventListener("click", () => this.closeModal(cssIdName));

        return modalPage;
    }
}
