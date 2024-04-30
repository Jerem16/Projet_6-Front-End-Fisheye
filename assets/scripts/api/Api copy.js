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



export class MediaApi extends Api {
    constructor(url) {
        super(url);
        this._photographerId = Number(sessionStorage.getItem("photographerId"));
    }

    async getAllMedia() {
        const data = await this.get();
        return data.media;
    }

    async getMediaByPhotographerId() {
        const data = await this.get();
        return data.media.filter((m) => m.photographerId === this._photographerId);
    }

    async getMediaById(id) {
        const data = await this.get();
        const media = data.media.find((item) => item.id === id);
        return media ? media.image : null;
    }
}

class SortMedia {
    constructor(selectValue) {
        this.selectValue = selectValue;
    }

    async sortAllMediaByFilter() {
        const mediaApi = new MediaApi("./assets/data/photographers.json");
        const currentFilter = this.selectValue
            ? this.selectValue.getAttribute("data-filter")
            : null;

        let media;
        switch (currentFilter) {
            case "date":
                media = await mediaApi.getMediaByPhotographerId();
                return sortByDate(media);

            case "likes":
                media = await mediaApi.getMediaByPhotographerId();
                return sortByPopularity(media);

            case "title":
                media = await mediaApi.getMediaByPhotographerId();
                return sortByTitle(media);

            default:
                media = await mediaApi.getAllMedia();
                return media;
        }
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

// Exemple d'utilisation
async function displayImageById(id) {
    const mediaApi = new MediaApi("./assets/data/photographers.json");
    try {
        const imageName = await mediaApi.getMediaById(id);
        if (imageName) {
            console.log(`L'image avec l'ID ${id} est : ${imageName}`);
        } else {
            console.log(`Aucune image trouvée avec l'ID ${id}`);
        }
    } catch (error) {
        console.error(
            "Une erreur s'est produite lors de la récupération de l'image :",
            error
        );
    }
}

// Appel de la fonction pour afficher une image par son ID
// ID de l'image à rechercher
const imageId = Number(sessionStorage.getItem("mediaId"));
displayImageById(imageId);
