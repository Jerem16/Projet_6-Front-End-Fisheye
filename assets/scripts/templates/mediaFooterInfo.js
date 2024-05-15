export default class FooterTemplate {
    constructor(price, likes) {
        this.trj = price;
        this.like = likes;
    }

    displayFooterCardDOM() {
        const footer = document.querySelector("footer .info");
        footer.innerHTML = `
        <div class="nb-like">
            <p>${this.like}</p>
            <img
                src="./assets/images/icons/heartBlack.svg"
                alt="il y a : ${this.like} like sur l'image"
            />
        </div>
            <p class="trj">${this.trj} / jour</p>
        `;
        return footer;
    }
}
