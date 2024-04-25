async function getPhotographers() {
    try {
        // const response = await fetch("../../data/photoTest.json");
        const response = await fetch("../../data/photographers.json");
        const data = await response.json();
        console.log("data", data.photographers);
        const photographers = data.photographers;
        return photographers;
    } catch (e) {
        console.log(e);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
