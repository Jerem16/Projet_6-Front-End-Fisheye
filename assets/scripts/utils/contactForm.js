// export { displayModal };
export default class Modal {
    constructor() {
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
        } else {
            console.error(`Modal with ID ${modalId} not found.`);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        } else {
            console.error(`Modal with ID ${modalId} not found.`);
        }
    }
}

//
