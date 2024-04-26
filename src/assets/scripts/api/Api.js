// Api.js

class Api {
    /**
     * @param {string} url
     */
    constructor(url) {
        this._url = url;
    }
    
    async get() {
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
    constructor(url) {
        super(url);
    }

    async GetAllMediaById() {
        const photographerId = Number(sessionStorage.getItem("photographerId"));
        const data = await this.get();
        return data.media.filter((m) => m.photographerId === photographerId);
    }
}

export class SortMedia extends GetMedia {
    constructor(url) {
        super(url);
        this.selectValue = document.querySelector(".select-selected span");
    }

    async sortAllMediaByFilter() {
        const currentFilter = this.selectValue.getAttribute("data-filter");

        // try {
        const media = await this.GetAllMediaById();

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
                // console.log("media", media);
                break;
        }
        return media;
        // } catch (error) {
        //     console.error(
        //         "Une erreur s'est produite lors de la récupération ou du tri des médias :",
        //         error
        //     );
        //     throw error;
        // }
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
