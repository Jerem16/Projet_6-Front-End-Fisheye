// export { displayModal };
export default class Modal {
    constructor() {
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal(cssIdName) {
        const modal = document.getElementById(cssIdName);
        if (modal) {
            modal.style.display = "flex";
        } else {
            console.error(`Modal with ID ${cssIdName} not found.`);
        }
    }

    closeModal(cssIdName) {
        const modal = document.getElementById(cssIdName);
        if (modal) {
            modal.style.display = "none";
        } else {
            console.error(`Modal with ID ${cssIdName} not found.`);
        }
    }
}

//
