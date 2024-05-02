import Modal from "../utils/contactForm.js";

class MediaFactory {
    constructor(data) {
        this.data = data;
    }
    createMediaElement() {
        const { image, video } = this.data;
        if (image) {
            return new ImageElement(this.data);
        } else if (video) {
            return new VideoElement(this.data);
        } else {
            console.error("No data provided to create media element.");
            return null;
        }
    }
}

class MediaElement extends Modal {
    constructor(data) {
        super();
        this.factory = new MediaFactory(data);
    }
    createElement(className) {
        const mediaElement = this.factory.createMediaElement(className);
        return mediaElement ? mediaElement.createElement(className) : null;
    }
}

class ImageElement {
    constructor(data) {
        this.data = data;
    }

    createElement(className) {
        const { title, photographerId, image, id } = this.data;
        const imageContainer = document.createElement("div");
        imageContainer.classList.add(className); 
        imageContainer.innerHTML = `
            <img
                data-media="${id}"
                src="./assets/images/photo/${photographerId}/${image}"
                alt="${title}"
            />
        `;
        return imageContainer;
    }
}

// Élément média pour les vidéos
class VideoElement {
    constructor(data) {
        this.data = data;
    }

    createElement(className) {
        const { title, photographerId, video, id } = this.data;
        const videoContainer = document.createElement("div");
        videoContainer.classList.add(className); 
        videoContainer.innerHTML = `
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
        return videoContainer;
    }
}

export default MediaElement;
