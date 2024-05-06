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
    async getPhotographerById(id) {
        const data = await this.get();
        return data.photographers.find((p) => p.id === id);
    }
}

export class GetMedia extends Api {
    constructor(url) {
        super(url);
        this._photographerId = Number(sessionStorage.getItem("photographerId"));
    }
    async getAllMediaById() {
        const data = await this.get();
        return data.media.filter(
            (m) => m.photographerId === this._photographerId
        );
    }
    async getMediaById(id) {
        const data = await this.get();
        const media = data.media.find((item) => item.id === id);
        return media;
    }
}

export class SortMedia extends GetMedia {
    constructor(url) {
        super(url);
        this.selectValue = document.querySelector(".select-selected span");
    }

    async sortAllMediaByFilter() {
        const currentFilter = this.selectValue
            ? this.selectValue.getAttribute("data-filter")
            : null;

        let media = await this.getAllMediaById();
        let sortedMedia = [];
        switch (currentFilter) {
            case "date":
                sortedMedia = sortByDate([...media]);
                break;
            case "likes":
                sortedMedia = sortByPopularity([...media]);
                break;
            case "title":
                sortedMedia = sortByTitle([...media]);
                break;
            default:
                sortedMedia = [...media];
                break;
        }
        return sortedMedia;
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

export function likesCalculator(media) {
    const likesReducer = (accumulator, media) => accumulator + media.likes;
    const totalLikes = media.reduce(likesReducer, 0);
    return totalLikes;
}
