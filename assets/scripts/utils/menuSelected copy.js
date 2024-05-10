import { SortMedia } from "../api/Api.js";
import { displayMedia } from "../pages/photographer.js";
import { addURLParameter } from "../utils/urlUtils.js";

export class FilterableMedia extends SortMedia {
    constructor() {
        super();
        this.selectContainer = document.querySelector(".custom-select");
        this.selectValue = this.selectContainer.querySelector(
            ".select-selected span"
        );
        this.selectItems = this.selectContainer.querySelector(".select-items");
        this.arrow = this.selectContainer.querySelector(".up-arrow");

        this.handleSelectToggle = this.handleSelectToggle.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.selectContainer.addEventListener(
            "keydown",
            this.handleKeyDown.bind(this)
        );

        this.selectValue.parentElement.parentElement.addEventListener(
            "click",
            this.handleSelectToggle
        );

        this.selectItems.addEventListener("click", this.handleItemClick);
        // this.selectItems.addEventListener("keydown", this.handleItemClick);
        document.addEventListener("click", this.handleDocumentClick);
    }

    handleSelectToggle(event) {
        event.stopPropagation();
        this.selectItems.classList.remove("hide-start");
        this.selectItems.classList.toggle("active");
        this.arrow.classList.toggle("down-arrow");
        this.selectContainer.setAttribute("aria-expanded", true);
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.handleSelectToggle(event);
        } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault(); // Empêche le défilement de la page avec les touches fléchées
            this.handleArrowKeyPress(event);
        }
    }

    handleArrowKeyPress(event) {
        const activeIndex = Array.from(this.selectItems.children).indexOf(
            this.selectItems.querySelector(".active")
        );
        const items = Array.from(this.selectItems.children);

        if (event.key === "ArrowDown") {
            const nextIndex = (activeIndex + 1) % items.length;
            this.activateOption(items[nextIndex]);
        } else if (event.key === "ArrowUp") {
            const nextIndex = (activeIndex - 1 + items.length) % items.length;
            this.activateOption(items[nextIndex]);
        }
    }

    activateOption(option) {
        if (option) {
            const activeItem = this.selectItems.querySelector(".active");
            if (activeItem) activeItem.classList.remove("active");
            option.classList.add("active");
            option.focus(); // Met en surbrillance l'option sélectionnée
        }
    }

    handleItemClick(event) {
        event.stopPropagation();
        if (event?.target?.tagName === "DIV") {
            const filterValue = this.selectValue.getAttribute("data-filter");
            const currentText = this.selectValue.textContent;
            this.selectValue.setAttribute(
                "data-filter",
                event.target.getAttribute("data-filter")
            );
            event.target.setAttribute("data-filter", filterValue);

            this.selectValue.textContent = event.target.textContent;
            event.target.textContent = currentText;

            this.selectItems.classList.remove("active");
            this.arrow.classList.remove("down-arrow");
            this.selectContainer.setAttribute("aria-expanded", false);
            this.updateMedia();
        }
    }

    handleDocumentClick(event) {
        event.stopPropagation();
        const activeItem = this.selectContainer.querySelector(".active");
        if (!event.target.closest(".custom-select") && activeItem) {
            this.selectItems.classList.remove("active");
            this.arrow.classList.remove("down-arrow");
        }
    }

    async updateMedia() {
        try {
            const media = await this.sortAllMediaByFilter();
            const panel = document.querySelector(".panel");
            panel.innerHTML = "";
            addURLParameter(
                "mediaFilter",
                this.selectValue.getAttribute("data-filter")
            );
            addURLParameter("valueFilter", this.selectValue.textContent.trim());
            displayMedia(media);
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la récupération des médias :",
                error
            );
        }
    }
}
