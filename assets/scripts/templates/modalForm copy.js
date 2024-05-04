import Modal from "../utils/contactForm.js";

export default class ModalForm extends Modal {
    constructor(data) {
        super();
        this.data = data;
    }

    getModalForm(cssIdName) {
        const name = this.data.name;
        const templateForm = document.getElementById("modal_Form");
        const form = document.importNode(templateForm.content, true);
        const headerName = form.querySelector(".name");
        headerName.textContent = name;

        const closeButton = form.querySelector(".modal button");
        closeButton.addEventListener("click", () => this.closeModal(cssIdName));

        return document.body.appendChild(form);
    }
}
