import MediaElement from "../templates/mediaElement.js";
// import "../../../assets"

export default class ModalMedia extends MediaElement {
    constructor(data) {
        super();
        this.data = data;
        this.mediaElement = new MediaElement(data);
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
        return document.createElement("div");
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

    getModalMedia(className, modalId) {
        const modalPage = document.createElement("div");
        modalPage.setAttribute("id", "modal_media");
        modalPage.innerHTML = `                
        <div class="media-slider">
        </div>`;

        const sliderContent = this.sliderContent();
        const closeButton = this.closeButton();
        const sliderArrows = this.sliderArrow();

        modalPage.querySelector(".media-slider").appendChild(closeButton);
        modalPage.querySelector(".media-slider").appendChild(sliderContent);
        modalPage.querySelector(".media-slider").appendChild(sliderArrows);

        sliderContent.appendChild(this.mediaElement.createElement(className));

        closeButton.addEventListener("click", () => this.closeModal(modalId));

        return modalPage;
    }
}
