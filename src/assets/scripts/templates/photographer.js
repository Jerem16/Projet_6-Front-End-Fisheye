
function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    this.picture = `../../../assets/images/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        article.innerHTML = `
        <img
            src= ${picture}
            alt=${name}
        />
        <h2>${name}</h2>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
        <p class="trj">${price}/jours</p>
        <a class="card" href="./photographer.html" tabindex="0">link to ${name}</a>
        `;

        return article;
    }

    return { getUserCardDOM };
}
