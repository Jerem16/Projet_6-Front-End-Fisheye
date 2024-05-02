import { SortMedia } from "../api/Api.js";
import { displayMedia } from "../pages/photographer.js";
import {
    // removeURLParameter,
    addURLParameter,
    getURLParameter,
} from "../utils/urlUtils.js";

const dataMenu = [
    { value: "likes", text: "Popularité" },
    { value: "date", text: "Date" },
    { value: "title", text: "Titre" },
];

export class DisplayMediaMenu {
    constructor() {
        const params = new URL(location.href).searchParams;
        const mediaFilter = params.get("mediaFilter");
        const valueFilter = params.get("valueFilter");

        if (mediaFilter && valueFilter) {
            const filterIndex = dataMenu.findIndex(
                (item) => item.value === mediaFilter
            );
            if (filterIndex !== -1) {
                const filterItem = dataMenu.splice(filterIndex, 1)[0];
                dataMenu.unshift(filterItem);
            }
        }
    }

    displayMediaMenu() {
        const sectionMenu = document.createElement("section");
        sectionMenu.classList.add("panel-photo");
        sectionMenu.innerHTML = `
            <h2 class="hide-title">Medias panel</h2>
            <span class="sort-media">Trier par</span>
            <div class="custom-select">
                <div class="select-selected select-value">
                    <span data-filter="${dataMenu[0].value}">${dataMenu[0].text}</span>
                    <img src="./assets/images/icons/up-arrow.svg" alt="up-arrow" class="up-arrow">
                </div>
                <div class="hide-start select-items">
                    <div data-filter="${dataMenu[1].value}" class="select-value correct">
                        ${dataMenu[1].text}
                    </div>
                    <div data-filter="${dataMenu[2].value}" class="select-value correct">
                        ${dataMenu[2].text}
                    </div>
                </div>
            </div>
            <div class="panel"></div>
        `;
        return sectionMenu;
    }
}

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

// Fonction utilitaire pour extraire les paramètres de l'URL
