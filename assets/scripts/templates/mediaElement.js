import Modal from "../utils/openAndCoseModal.js";

class MediaFactory {
    constructor(data) {
        this.data = data;
        this.thumbnails;
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
    createElement(className, thumbnails) {
        const mediaElement = this.factory.createMediaElement(
            className,
            thumbnails
        );
        return mediaElement
            ? mediaElement.createElement(className, thumbnails)
            : null;
    }
}

class ImageElement {
    constructor(data) {
        this.data = data;
    }

    createElement(className, thumbnails) {
        const { title, photographerId, image, id } = this.data;
        let imagePath = `./assets/images/photo/${photographerId}/`;

        if (thumbnails) {
            imagePath += `thumbnails/thumb-${image}`;
        } else {
            imagePath += image;
        }
        // imagePath = `./assets/images/photo/${photographerId}/${image}`;
        const imageContainer = document.createElement("div");
        imageContainer.classList.add(className);
        imageContainer.innerHTML = `
            <img
                data-media="${id}"
                src="${imagePath}"
                alt="${title}"
            />
        `;
        return imageContainer;
    }
}

class VideoElement {
    constructor(data) {
        this.data = data;
    }

    createElement(className, thumbnails) {
        const { title, photographerId, video, id } = this.data;
        let imagePath = `./assets/images/photo/${photographerId}/${video}`;

        const videoContainer = document.createElement("div");
        videoContainer.classList.add(className);
        videoContainer.innerHTML = `
            <video
                data-media="${id}"
                src="${imagePath}"
                controls
            >
                <track
                    src="#"
                    label="${title}"
                    srclang="fr"
                    label="French"
                />
            </video>
        `;
        return videoContainer;
    }
}

export default MediaElement;
