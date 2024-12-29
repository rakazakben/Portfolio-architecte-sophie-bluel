const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

function genererWorks(works){
    for(let i = 0; i < works.length ; i++){
        const work = works[i];
        const divGallery = document.querySelector(".gallery");
        //création de chaque element contenant un travail de l'architecte
        const elementGallery = document.createElement("figure");
        //création de l'image dans chaque elements + source et alt
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl ;
        imageElement.alt = work.title ;
        //creation du texte descriptif de l'element
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = work.title;
        //ajout des elements créés dans le DOM
        divGallery.appendChild(elementGallery);
        elementGallery.appendChild(imageElement);
        elementGallery.appendChild(captionElement);
    }
}
genererWorks(works);