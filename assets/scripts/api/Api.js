// Api.js

class Api {
    /**
     * @param {string} url
     */
    constructor(url) {
        this._url = url;
    }

    async get() {
        this._url = "./assets/data/photographers.json";
        try {
            const response = await fetch(this._url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
            throw error;
        }
    }
}

export class GetPhotographers extends Api {
    async getPhotographers() {
        const data = await this.get();
        return data.photographers;
    }
}

export class GetPhotographer extends Api {
    async getPhotographerById(id) {
        const data = await this.get();
        return data.photographers.find((p) => p.id === id);
    }
}

export class GetMedia extends Api {
    async GetAllMediaById() {
        const photographerId = Number(sessionStorage.getItem("photographerId"));
        const data = await this.get();
        return data.media.filter((m) => m.photographerId === photographerId);
    }
}

export class SortMedia extends GetMedia {
    constructor() {
        super();
        this.selectValue = document.querySelector(".select-selected span");
    }

    async sortAllMediaByFilter() {
        const currentFilter = this.selectValue
            ? this.selectValue.getAttribute("data-filter")
            : null;

        const media = await this.GetAllMediaById(currentFilter);

        switch (currentFilter) {
            case "date":
                sortByDate(media);
                console.log("date", media);
                break;
            case "likes":
                sortByPopularity(media);
                console.log("likes", media);
                break;
            case "title":
                sortByTitle(media);
                console.log("title", media);
                break;
            default:
                return media;
        }
        return media;
    }
}
function sortByDate(data) {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    return data;
}
function sortByPopularity(data) {
    data.sort((a, b) => b.likes - a.likes);
    return data;
}
function sortByTitle(data) {
    data.sort((a, b) => a.title.localeCompare(b.title));
    return data;
}
