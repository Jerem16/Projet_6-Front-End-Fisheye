export async function preloadImages(imageUrls) {
    const head = document.querySelector("head");
    imageUrls.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.type = "image/webp";
        link.as = "image";
        link.href = url;
        link.setAttribute("fetchpriority", "low");
        head.appendChild(link);
    });
}

function loadImageInBackground(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () =>
            reject(new Error(`Impossible de charger l'image ${url}`));
        img.src = url;
    });
}

export async function downloadImagesInBackground(imageUrls) {
    try {
        const promises = imageUrls.map(loadImageInBackground);
        const downloadedImages = await Promise.all(promises);
        return downloadedImages;
    } catch (error) {
        throw new Error(
            "Une erreur s'est produite lors du téléchargement des images en arrière-plan : " +
                error.message
        );
    }
}
