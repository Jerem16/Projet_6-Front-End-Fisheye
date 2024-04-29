import { SortMedia } from "../api/Api.js";
import displayMedia from "../pages/photographer.js";

export class DisplayMediaMenu extends SortMedia {
    displayMediaMenu() {
        const sectionMenu = document.createElement("section");
        sectionMenu.classList.add("panel-photo");
        sectionMenu.innerHTML = `
            <h2 class="hide-title">Medias panel</h2>
            <span class="sort-media">Trier par</span>
            <div class="custom-select">
                <div class="select-selected select-value">
                    <span data-filter="likes">Popularité</span>
                    <svg
                        class="up-arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                    >
                        <path
                            d="M9.88 20.5466L16 14.44L22.12 20.5466L24 18.6666L16 10.6666L8 18.6666L9.88 20.5466Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div class="hide-start select-items">
                    <div data-filter="date" class="select-value correct">
                        Date
                    </div>
                    <div data-filter="title" class="select-value correct">
                        Titre
                    </div>
                </div>
            </div>
            <div class="panel"></div>
        `;
        return sectionMenu;
    }
}

export class FilterableMedia extends SortMedia {
    constructor(url) {
        super(url);
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
        const { tagName } = event.target;
        if (tagName === "DIV") {
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
            this.arrow.classList.toggle("down-arrow");

            this.updateMedia();
        }
    }

    async updateMedia() {
        try {
            const media = await this.sortAllMediaByFilter();
            const panel = document.querySelector(".panel");
            panel.innerHTML = "";
            displayMedia(media);
            console.log("media", media);
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la récupération des médias :",
                error
            );
        }
    }
}
