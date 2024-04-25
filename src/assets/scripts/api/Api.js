// Api.js

export class Api {
    /**
     * @param {string} url
     */
    constructor(url) {
        this._url = url;
    }

    async get() {
        return fetch(this._url)
            .then((res) => res.json())
            .then((res) => res.photographers)
            .catch((err) => console.log("an error occurs", err));
    }
}

export default class GetPhotographers extends Api {
    /**
     * @param {string} url
     */
    constructor(url) {
        super(url);
    }

    async getMovies() {
        return await this.get();
    }
}
