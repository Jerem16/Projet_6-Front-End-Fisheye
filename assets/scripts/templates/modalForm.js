import Modal from "../utils/contactForm.js";
// import "../../styles/modal.css";
export default class ModalForm extends Modal {
    constructor(data) {
        super();
        this.data = data;
    }

    getModalForm(modalId) {
        const name = this.data.name;

        const modalPage = document.createElement("div");
        modalPage.setAttribute("id", "contact_modal");
        modalPage.innerHTML = `
            <div class="modal">
            <header>
                <h2>Contactez-moi</h2>
                <button type="button" tabindex="0">
                    <img
                        src="./assets/images/icons/close.svg"
                        alt="close"
                    />
                </button>

                <h2>${name}</h2>
            </header>
            <form>
                <div
                    class="formData firstName"
                    data-error-visible="false"
                    data-error="Veuillez entrer votre prénom, minimum 2 caractères"
                >
                    <label for="firstName">Prénom</label>

                    <input
                        class="text-control"
                        type="text"
                        id="firstName"
                        name="firstName"
                    />
                </div>
                <div
                    class="formData lastName"
                    data-error-visible="false"
                    data-error="Veuillez entrer votre nom, minimum 2 caractères"
                >
                    <label for="lastName">Nom</label>
                    <input
                        class="text-control"
                        type="text"
                        id="lastName"
                        name="lastName"
                        minlength="2"
                    />
                </div>
                <div
                    class="formData email"
                    data-error-visible="false"
                    data-error="Veuillez entrer une adresse électronique valide"
                >
                    <label for="email">Email</label>
                    <input
                        class="text-control"
                        type="email"
                        id="email"
                        name="email"
                        autocomplete="email"
                    />
                </div>
                <div
                    class="formData message"
                    data-error-visible="false"
                    data-error="Veuillez entrer une adresse électronique valide"
                >
                    <label for="message">Votre message</label>
                    <textarea 
                        class="text-control" 
                        id="message" 
                        name="message">
                    </textarea>

                </div>
                <button class="contact_button">Envoyer</button>
            </form>
        </div>
        `;
        const closeButton = modalPage.querySelector(".modal button");
        closeButton.addEventListener("click", () => this.closeModal(modalId));

        return modalPage;
    }
}
