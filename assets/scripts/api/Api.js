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
        return media ? media : null;
    }
}

export class SortMedia extends GetMedia {
    constructor(url) {
        super(url);
        this.mediaApi = new GetMedia(url);
        this.selectValue = document.querySelector(".select-selected span");
    }

    async sortAllMediaByFilter() {
        const currentFilter = this.selectValue
            ? this.selectValue.getAttribute("data-filter")
            : null;

        let media = await this.mediaApi.getAllMediaById();
        let sortedMedia = [];
        switch (currentFilter) {
            case "date":
                sortedMedia = sortByDate([...media]); // Créez une copie triée du tableau
                break;
            case "likes":
                sortedMedia = sortByPopularity([...media]); // Créez une copie triée du tableau
                break;
            case "title":
                sortedMedia = sortByTitle([...media]); // Créez une copie triée du tableau
                break;
            default:
                sortedMedia = [...media]; // Par défaut, retournez une copie non triée du tableau
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

// async function displayImageById(id) {
//     const getMediaId = new GetMedia("./assets/data/photographers.json");

//     try {
//         const mediaId = await getMediaId.getMediaById(id);

//         if (mediaId) {
//             console.log(`L'image avec l'ID ${id} est : ${mediaId.title}`);
//         } else {
//             console.log(`Aucune image trouvée avec l'ID ${id}`);
//         }
//     } catch (error) {
//         console.error(
//             "Une erreur s'est produite lors de la récupération de l'image :",
//             error
//         );
//     }
// }
// const imageId = Number(sessionStorage.getItem("mediaId"));
// displayImageById(imageId);
