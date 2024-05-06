import Modal from "../utils/openAndCoseModal.js";
// import { validate } from "../utils/form-validation.js";

// import Modal from "../utils/openAndCloseModal.js";
// import { validate } from "../utils/form-validation.js";

class ModalForm extends Modal {
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

        const contactForm = form.getElementById("contactMessage");

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("non valide");
            if (this.validate()) {
                console.log("valide");

                // this.reserveForm.dataset.readyToSubmit = true;
                // this.endValidationMessage.classList.remove("hidden");
                //! If the form has been validated and submitted, it will be automatically submitted upon modal closure. See modal.js line 17.
            }
        });
        return document.body.appendChild(form);
    }

    validateName(inputVerification, printError, regexNumber, nb) {
        if (
            inputVerification.value.length < nb ||
            regexNumber.test(inputVerification.value)
        ) {
            printError.setAttribute("data-error-visible", "true");
        } else {
            printError.setAttribute("data-error-visible", "false");
        }
        inputVerification.addEventListener("change", () => {
            this.validateName(inputVerification, printError, regexNumber);
        });
    }

    validateEmail(inputVerification, printError) {
        let emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegExp.test(inputVerification.value)) {
            printError.setAttribute("data-error-visible", "true");
        } else {
            printError.setAttribute("data-error-visible", "false");
        }

        // Add input event to reevaluate validation on every change
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
