export default class PhotographerTemplate {
    constructor(data) {
        this.data = data;
        const portrait = data.portrait;
        this.portrait = portrait;
        this.picture = `./assets/images/photographers/${portrait}`;
    }

    getUserCardDOM() {
        const { name, city, country, tagline, price, id } = this.data;
        const { picture } = this;

        const article = document.createElement("article");
        article.setAttribute("data-id", id);
        article.innerHTML = `
            <div class="image-container">
            <img 
                src="${picture}"
                alt="${name}"
                width="224"
                height="224"
            />
            </div>
            <h2>${name}</h2>
            <p class="location">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>
            <p class="trj">${price}/jours</p>
            <a 
                class="card" 
                href="./photographer.html?id=${id}" 
                tabindex="0"
            >
                link to ${name}
            </a>
        `;

        const link = article.querySelector("a.card");

        link.addEventListener("click", () => {
            const photographerId = article.getAttribute("data-id");
            sessionStorage.setItem("photographerId", photographerId);
        });

        return article;
    }
}
