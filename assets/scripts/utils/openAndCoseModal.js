export default class Modal {
    constructor() {
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.value = [];
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener("click", this.handleDocumentClick);
        document.addEventListener("keydown", this.handleKeyDown);
        this.header = document.querySelector("header");
        this.main = document.querySelector("main");
        this.footer = document.querySelector("footer");
    }

    openModal(cssIdName) {
        this.main.setAttribute("aria-hidden", true);
        this.footer.setAttribute("aria-hidden", true);
        this.header.setAttribute("aria-hidden", true);
        const modal = document.getElementById(cssIdName);
        if (modal) {
            this.value.push(modal.getAttribute("id"));
            modal.style.display = "flex";
            const firstFocusableElement = modal.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        } else {
            console.error(`Modal with ID ${cssIdName} not found.`);
        }
        return this.value;
    }

    closeModal(cssIdName) {
        this.header.setAttribute("aria-hidden", false);
        this.main.setAttribute("aria-hidden", false);
        this.footer.setAttribute("aria-hidden", false);
        const modal = document.getElementById(cssIdName);
        if (modal) {
            modal.style.display = "none";
        } else {
            console.error(`Modal with ID ${cssIdName} not found.`);
        }
    }

    handleDocumentClick(event) {
        const modal = document.getElementById("contact_modal");
        event.stopPropagation();
        if (event.target === modal) {
            this.closeModal(modal.getAttribute("id"));
        }
    }

    handleKeyDown(event) {
        const modal = document.getElementById("contact_modal");
        if (event.key === "Escape" && modal.style.display === "flex") {
            this.closeModal(modal.getAttribute("id"));
        }
    }
}
