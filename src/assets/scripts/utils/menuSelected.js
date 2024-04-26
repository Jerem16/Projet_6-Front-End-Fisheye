import { GetPhotographer, SortMedia } from "../api/Api.js";

class FilterableMedia extends SortMedia {
    constructor(url) {
        super(url);
        this.photographerId = Number(sessionStorage.getItem("photographerId"));
        this.selectSelected = document.querySelector(".select-selected");
        this.selectValue = document.querySelector(".select-selected span");
        this.selectItems = document.querySelector(".select-items");
        this.arrow = document.querySelector(".up-arrow");

        this.selectSelected.addEventListener("click", () => {
            this.selectItems.classList.toggle("active");
            this.selectItems.classList.remove("hidde-start");
            this.arrow.classList.toggle("down-arrow");
        });

        this.selectItems.addEventListener("click", (event) => {
            if (event.target.tagName === "DIV") {
                const currentSelectedFilter =
                    this.selectValue.getAttribute("data-filter");
                this.selectValue.setAttribute(
                    "data-filter",
                    event.target.getAttribute("data-filter")
                );
                event.target.setAttribute("data-filter", currentSelectedFilter);

                const currentSelectedContent = this.selectValue.textContent;
                this.selectValue.textContent = event.target.textContent;
                event.target.textContent = currentSelectedContent;
                this.selectItems.classList.remove("active");
                this.arrow.classList.toggle("down-arrow");

                this.updateMedia();
            }
        });
    }

    updateMedia() {
        const getMedia = new SortMedia(url);
        getMedia
            .sortAllMediaByFilter()
            .then((media) => {
                console.log("media", media);
                // return media;
            })
            .catch((error) => {
                console.error(
                    "Une erreur s'est produite lors de la récupération des médias :",
                    error
                );
            });
    }
}

const url = "../../../assets/data/photographers.json";
const filterableMedia = new FilterableMedia(url);
