import { apiWorks, apiCategory, apiLogin } from "./config.js";
const stockWorks = await fetch(apiWorks);
const works = await stockWorks.json();
export function genererModaleWorks(works){
    for(let i = 0; i < works.length ; i++){
        const work = works[i];
        const divGallery = document.querySelector(".gallery-modale");
        //création de chaque element contenant un travail de l'architecte
        const elementGallery = document.createElement("figure");
        //création de l'image dans chaque elements + source et alt
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl ;
        imageElement.alt = work.title ;
        //creation du texte descriptif de l'element
        //const captionElement = document.createElement("figcaption");
        //captionElement.innerText = work.title;
        //ajout des elements créés dans le DOM
        divGallery.appendChild(elementGallery);
        elementGallery.appendChild(imageElement);
        //elementGallery.appendChild(captionElement);
    }
}


const editLink = document.querySelector(".edit-project a");

genererModaleWorks(works);