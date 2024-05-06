import { SortMedia } from "../api/Api.js";
import { displayMedia } from "../pages/photographer.js";
import { addURLParameter } from "../utils/urlUtils.js";

export class FilterableMedia extends SortMedia {
    constructor() {
        super();
        this.selectValue = document.querySelector(".select-selected span");
        this.selectItems = document.querySelector(".select-items");
        this.arrow = document.querySelector(".up-arrow");

        this.handleSelectToggle = this.handleSelectToggle.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);

        this.selectValue.parentElement.addEventListener(
            "click",
            this.handleSelectToggle
        );
        this.selectItems.addEventListener("click", this.handleItemClick);
    }

    handleSelectToggle() {
        this.selectItems.classList.remove("hide-start");
        this.selectItems.classList.toggle("active");
        this.arrow.classList.toggle("down-arrow");
    }

    handleItemClick(event) {
        if (event?.target?.tagName) {
            const { tagName } = event.target;
            if (tagName === "DIV") {
                const filterValue =
                    this.selectValue.getAttribute("data-filter");
                const currentText = this.selectValue.textContent;

                this.selectValue.setAttribute(
                    "data-filter",
                    event.target.getAttribute("data-filter")
                );
                event.target.setAttribute("data-filter", filterValue);

                this.selectValue.textContent = event.target.textContent;
                event.target.textContent = currentText;

                this.selectItems.classList.remove("active");
                this.arrow.classList.toggle("down-arrow");

                this.updateMedia();
            }
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
