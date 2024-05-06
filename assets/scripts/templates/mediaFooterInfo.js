export default class FooterTemplate {
    constructor(price, likes) {
        this.trj = price;
        this.like = likes;
    }

    creatLikeSection() {
        const likeSection = document.createElement("div");
        likeSection.classList.add("nb-like");
        likeSection.innerHTML = `
            <p>${this.like}</p>
            <img
                src="./assets/images/icons/heartBlack.svg"
                alt="like"
            />
        `;
    }

    displayFooterCardDOM() {
        const footer = document.querySelector("footer .info");
        footer.innerHTML = `
        <div class="nb-like">
            <p>${this.like}</p>
            <img
                src="./assets/images/icons/heartBlack.svg"
                alt="like"
            />
        </div>
        <p class="trj">${this.trj} / jour</p>
        `;
        return footer;
    }
}
