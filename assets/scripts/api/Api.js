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