const dataMenu = [
    { value: "likes", text: "Popularité" },
    { value: "date", text: "Date" },
    { value: "title", text: "Titre" },
];

export class DisplayMediaMenu {
    constructor() {
        const params = new URL(location.href).searchParams;
        const mediaFilter = params.get("mediaFilter");
        const valueFilter = params.get("valueFilter");

        if (mediaFilter && valueFilter) {
            const filterIndex = dataMenu.findIndex(
                (item) => item.value === mediaFilter
            );
            if (filterIndex !== -1) {
                const filterItem = dataMenu.splice(filterIndex, 1)[0];
                dataMenu.unshift(filterItem);
            }
        }
    }

    displayMediaMenu() {
        const sectionMenu = document.createElement("section");
        sectionMenu.classList.add("panel-photo");
        sectionMenu.innerHTML = `
            <h2 class="hide-title">Medias panel</h2>
            <span class="sort-media">Trier par</span>
            <div
                role="listbox"
                class="btn custom-select"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-label="Ouvre le menu déroulant de tri"
                tabindex="0"
            >
                <div
                    class="select-selected select-value"     
                >
                    <span 
                        data-filter="${dataMenu[0].value}"
                        aria-selected="true"
                        aria-checked="true"
                        role="option"
                        aria-label="Travaux trié par ${dataMenu[0].text}"
                    >
                        ${dataMenu[0].text}
                    </span>
                    <img
                        src="./assets/images/icons/up-arrow.svg"
                        alt="up-arrow"
                        class="up-arrow"
                    />
                </div>
                <div
                    class="hide-start select-items"
                >
                    <div 
                        role="option"
                        aria-selected="false"
                        data-filter="${dataMenu[1].value}" 
                        class="select-value correct"
                        aria-label="Sélèctionne le tri par ${dataMenu[1].text}"
                    >
                        ${dataMenu[1].text}
                    </div>
                    <div 
                        role="option"
                        aria-selected="false"
                        data-filter="${dataMenu[2].value}"
                        class="select-value correct"
                        aria-label="Sélèctionne le tri par ${dataMenu[2].text}"
                    >
                        ${dataMenu[2].text}
                    </div>
                </div>
            </div>
            <div class="panel"></div>
        `;

        return sectionMenu;
    }
}
