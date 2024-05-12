import MediaElement from "./mediaElement.js";
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
        closeButton.classList.add("closeButton");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("tabindex", "0");
        closeButton.innerHTML = `
        <img src="./assets/images/icons/closeMedia.svg" alt="close button">
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
    async handleMediaChange(direction) {
        const allMedia = await getAllMedia();
        const nbOfIndex = allMedia.length;
        const nextIndex =
            (this.currentIndex + direction + nbOfIndex) % nbOfIndex;
        const nextData = allMedia[nextIndex];
        this.currentIndex = nextIndex;
        this.data = nextData;
        addURLParameter("mediaID", nextIndex);
        this.updateImage(nextData);
    }

    renderModal(className, cssIdName) {
        const templateModalMedia = document.getElementById("media");
        const modalMedia = document.importNode(
            templateModalMedia.content,
            true
        );
        const modalPage = modalMedia.getElementById("modal_media");
        modalPage.innerHTML = `                
        <div class="media-slider">
        </div>`;

        const sliderContent = this.sliderContent();
        const closeButton = this.closeButton();
        const sliderArrows = this.sliderArrow();

        modalPage
            .querySelector(".media-slider")
            .append(closeButton, sliderContent, sliderArrows);

        const media = new MediaElement(this.currentData);
        sliderContent.appendChild(media.createElement(className));

        closeButton.addEventListener("click", () => {
            removeURLParameter("mediaID");
            this.closeModal(cssIdName);
            const modalMediaElement = document.getElementById(cssIdName);
            if (modalMediaElement) {
                modalMediaElement.remove();
            }
        });

        const prevButton = modalPage.querySelector(".arrow_left");
        prevButton.setAttribute("tabindex", "0");
        const nextButton = modalPage.querySelector(".arrow_right");
        nextButton.setAttribute("tabindex", "0");

        prevButton.addEventListener("click", async () => {
            await this.handleMediaChange(-1);
        });

        nextButton.addEventListener("click", async () => {
            await this.handleMediaChange(1);
        });

        prevButton.addEventListener("keydown", async (event) => {
            if (
                event.key === "Enter" ||
                event.key === " " ||
                event.key === "ArrowLeft"
            ) {
                event.preventDefault();
                await this.handleMediaChange(-1);
            }
        });

        nextButton.addEventListener("keydown", async (event) => {
            if (
                event.key === "Enter" ||
                event.key === " " ||
                event.key === "ArrowRight"
            ) {
                event.preventDefault();
                await this.handleMediaChange(1);
            }
        });
        return document.body.appendChild(modalPage);
    }
}
window.addEventListener("keydown", async (event) => {
    if (event.key === "Escape") {
        const closeButton = document.querySelector(".modal .closeButton");
        const closeMediaButton = document.querySelector(
            ".media-slider .closeButton"
        );
        const closeMenuButton = document.querySelector(
            ".panel-photo .custom-select"
        );
        if (closeButton) {
            closeButton.click();
        }
        if (closeMediaButton) {
            closeMediaButton.click();
        }
    }

    if (event.key === "ArrowLeft") {
        const prevButton = document.querySelector(".arrow_left");
        if (prevButton) {
            prevButton.focus();
        }
    }

    if (event.key === "ArrowRight") {
        const nextButton = document.querySelector(".arrow_right");
        if (nextButton) {
            nextButton.focus();
        }
    }
});
