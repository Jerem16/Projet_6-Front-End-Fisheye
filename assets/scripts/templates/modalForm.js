import Modal from "../utils/openAndCoseModal.js";

class ModalForm extends Modal {
    constructor(data) {
        super();
        this.data = data;
    }

    async loadTemplate() {
        const response = await fetch("../../../templates.html");
        const templateText = await response.text();
        const parser = new DOMParser();
        const templateDoc = parser.parseFromString(templateText, "text/html");
        return templateDoc.getElementById("modal_Form");
    }

    async getModalForm(cssIdName) {
        const name = this.data.name;
        const templateForm = await this.loadTemplate();
        const form = document.importNode(templateForm.content, true);
        const modal = form.getElementById("contact_modal");

        const headerName = form.querySelector(".name");
        headerName.textContent = name;

        const closeButton = form.querySelector(".modal button");
        closeButton.addEventListener("click", () => this.closeModal(cssIdName));

        const contactForm = form.getElementById("contactMessage");
        modal.setAttribute("aria-hidden", false);
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const firstFocusableElement = modal.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
            if (this.validate()) {
                const formData = new FormData(event.target);
                for (const entry of formData.entries()) {
                    console.log(entry[0] + ": " + entry[1]);
                }
                contactForm.reset();
                this.closeModal(cssIdName);
            }
        });
        return document.body.appendChild(form);
    }

    validateName(inputVerification, printError, regexNumber, nb) {
        const errorMessage = printError.getAttribute("data-error");

        if (
            inputVerification.value.length < nb ||
            regexNumber.test(inputVerification.value)
        ) {
            printError.setAttribute("data-error-visible", "true");
            inputVerification.setAttribute("aria-label", errorMessage);
        } else {
            printError.setAttribute("data-error-visible", "false");
        }

        inputVerification.addEventListener("input", () => {
            this.validateName(inputVerification, printError, regexNumber, nb);
        });
    }

    validateEmail(inputVerification, printError) {
        const errorMessage = printError.getAttribute("data-error");
        let emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegExp.test(inputVerification.value)) {
            printError.setAttribute("data-error-visible", "true");
            inputVerification.setAttribute("aria-label", errorMessage);
        } else {
            printError.setAttribute("data-error-visible", "false");
        }
        inputVerification.addEventListener("change", () => {
            this.validateEmail(inputVerification, printError);
        });
    }

    validate() {
        const firstNameInput = document.getElementById("firstName");
        const firstNameError = document.querySelector(
            ".firstName[data-error-visible]"
        );
        const lastNameInput = document.getElementById("lastName");
        const lastNameError = document.querySelector(
            ".lastName[data-error-visible]"
        );
        const regexNumber = /[0-9]/;
        const regexSans = /^[]+$/;
        const emailInput = document.getElementById("email");
        const emailError = document.querySelector(".email[data-error-visible]");
        const textareaInput = document.getElementById("message");
        const textareaError = document.querySelector(
            ".message[data-error-visible]"
        );
        this.validateName(firstNameInput, firstNameError, regexNumber, 2);
        this.validateName(lastNameInput, lastNameError, regexNumber, 2);
        this.validateName(textareaInput, textareaError, regexSans, 2);
        this.validateEmail(emailInput, emailError);

        const errors = document.querySelectorAll("[data-error-visible=true]");
        return errors.length === 0;
    }
}

export default ModalForm;
