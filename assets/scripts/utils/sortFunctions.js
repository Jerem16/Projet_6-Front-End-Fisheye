import { GetMedia } from "../api/Api.js";

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
