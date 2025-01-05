import { apiWorks, apiCategory, apiLogin } from "./config.js";
import { genererWorks } from "./works.js";
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


const editLink = document.querySelector(".edit-project a");

genererModaleWorks(works);
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
genererDeletebutton(works);
const deleteElement = document.querySelectorAll(".gallery-modale button");
for(let i=0; i<deleteElement.length; i++){
deleteElement[i].addEventListener("click", async function(){
    console.log(apiWorks + "/"+ works[i].id);
    await fetch(apiWorks + "/"+ works[i].id,{
        method:"DELETE",
            headers: {
                "Authorization": "Bearer "+ sessionStorage.getItem("authToken"),
            },
    });
    document.querySelector(".gallery-modale").innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    const stockWorks = await fetch(apiWorks);
    const worksdeleted = await stockWorks.json();
    genererModaleWorks(worksdeleted);
    genererDeletebutton(worksdeleted);
    genererWorks(worksdeleted);
    });

    

}