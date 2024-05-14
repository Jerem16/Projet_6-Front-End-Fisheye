export class KeyboardNavigation {
    constructor(links) {
        this.links = links;
        this.currentIndex = 0;
    }

    keyListeners() {
        const articles = document.querySelectorAll("article");
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                case "ArrowLeft":
                    this.currentIndex = this.handleArrowLeft(articles.length);
                    break;
                case "ArrowDown":
                case "ArrowRight":
                    this.currentIndex = this.handleArrowRight(articles.length);
                    break;
                default:
                    return;
            }

            const targetElement = articles[this.currentIndex].querySelector(
                this.links
            );
            if (targetElement) {
                targetElement.focus();
            }
        });
    }

    handleArrowLeft(totalMedia) {
        return this.currentIndex === 0 ? totalMedia - 1 : this.currentIndex - 1;
    }

    handleArrowRight(totalMedia) {
        return this.currentIndex === totalMedia - 1 ? 0 : this.currentIndex + 1;
    }
}
