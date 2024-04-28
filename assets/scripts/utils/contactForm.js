// export { displayModal };
export default class Modal {
    constructor() {
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "flex";
    }

    closeModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }
}
