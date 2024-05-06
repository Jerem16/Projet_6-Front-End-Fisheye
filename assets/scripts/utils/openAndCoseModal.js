import { removeURLParameter } from "./urlUtils.js";
export default class Modal {
    constructor() {
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.value = [];
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        document.addEventListener("click", this.handleDocumentClick);
    }

    openModal(cssIdName) {
        const modal = document.getElementById(cssIdName);
        if (modal) {
            this.value.push(modal.getAttribute("id"));
            modal.style.display = "flex";
        } else {
            console.error(`Modal with ID ${cssIdName} not found.`);
        }
        return this.value;
    }

    closeModal(cssIdName) {
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
            modal.style.display = "none";
        }
    }
}
