import Modal from "../utils/contactForm.js";

export default class MediaElement extends Modal {
    constructor(data) {
        super();
        this.data = data;
        this.object = JSON.parse(sessionStorage.getItem("mediaId")); 
    }

    createElement(className) {
        const { title, photographerId, image, video, id } = this.data;
        const mediaContainer = document.createElement("div");
        mediaContainer.classList.add(className);
        // console.log(this.object);
        if (image) {
            mediaContainer.innerHTML = `
                <img
                    data-media="${id}"
                    src="./assets/images/photo/${photographerId}/${image}"
                    alt="${title}"
                />
            `;
        } else {
            mediaContainer.innerHTML = `
                <video
                    data-media="${id}"
                    src="./assets/images/photo/${photographerId}/${video}"
                    controls
                    alt="${title}"
                >
                    <track
                        src="#"
                        kind="subtitles"
                        srclang="fr"
                        label="French"
                    />
                </video>
            `;
        }
        return mediaContainer;
    }
}
