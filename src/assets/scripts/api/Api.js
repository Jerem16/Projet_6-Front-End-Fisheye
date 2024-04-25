// Api.js

class Api {
    /**
     * @param {string} url
     */
    constructor(url) {
        this._url = url;
    }
    async get() {
        return fetch(this._url)
            .then((res) => res.json())
            .then((res) => res)
            .catch((err) => console.log("an error occurs", err));
    }
}

export class GetPhotographers extends Api {
    async getPhotographers() {
        const data = await this.get();
        const photographers = data.photographers;
        return photographers;
    }
}
export class GetPhotographer extends Api {
    constructor(url) {
        super(url);
    }

    async getPhotographerById(id) {
        const data = await this.get();
        const photographer = data.photographers.find((p) => p.id === id);
        return photographer;
    }
}

export class GetMedia extends Api {
    constructor(url) {
        super(url);
    }

    async GetAllMediaById(photographerId) {
        const data = await this.get();
        const media = data.media.filter(
            (m) => m.photographerId === photographerId
        );
        return media;
    }
}
