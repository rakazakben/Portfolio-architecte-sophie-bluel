import { apiWorks, apiCategory, apiLogin } from "./config.js";
import { genererWorks } from "./works.js";
const stockWorks = await fetch(apiWorks);
const works = await stockWorks.json();
//fonction de génération des travaux dans la galerie de la modale
function genererModaleWorks(works){
    for(let i = 0; i < works.length ; i++){
        const work = works[i];
        const divGallery = document.querySelector(".gallery-modale");
        //création de chaque element contenant un travail de l'architecte
        const elementGallery = document.createElement("figure");
        //création de l'image dans chaque elements + source et alt
        const imageElement = document.createElement("img");
        
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        //creation du texte descriptif de l'element
        //const captionElement = document.createElement("figcaption");
        //captionElement.innerText = work.title;
        //ajout des elements créés dans le DOM
        divGallery.appendChild(elementGallery);
        elementGallery.appendChild(imageElement);
        //elementGallery.appendChild(captionElement);
        
    }
}
//on genere les travaux dans la modale
genererModaleWorks(works);
//fonction de génération des boutons de suppression dans la modale
function genererDeletebutton(works){
    for(let i=0; i< works.length; i++){
    const elementGallery = document.querySelectorAll(".gallery-modale figure");
    const deleteElement = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteElement.classList.add("delete-button");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteElement.appendChild(deleteIcon);
    elementGallery[i].appendChild(deleteElement);
   
}
}
//on génére une première fois les boutons de suppression
genererDeletebutton(works);
//on selectionne tous les boutons de suppression générés
const deleteElement = document.querySelectorAll(".gallery-modale button");
//boucle de test de click sur les boutons
for(let i=0; i<deleteElement.length; i++){
    //on écoute l'evenement click sur un bouton
deleteElement[i].addEventListener("click", async function(){
    //on requette à l'api de supprimer le projet correspondant 
    await fetch(apiWorks + "/"+ works[i].id,{
        method:"DELETE",
            headers: {
                "Authorization": "Bearer "+ sessionStorage.getItem("authToken"),
            },
    });
    //on nettoie les deux galeries
    document.querySelector(".gallery-modale").innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    //on récupère l'etat des travaux de l'api
    const stockWorks = await fetch(apiWorks);
    const worksdeleted = await stockWorks.json();
    //on regenère les galeries avec les nouveaux travaux de l'api
    genererModaleWorks(worksdeleted);
    genererDeletebutton(worksdeleted);
    //on genère les boutons de suppression de nouveau
    genererWorks(worksdeleted);
    });

    

}