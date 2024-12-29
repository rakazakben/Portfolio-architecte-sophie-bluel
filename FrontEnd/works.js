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

//système de tri :

const btnTous = document.querySelector(".btn-tous");
const btnObjet = document.querySelector(".btn-objet");
const btnAppart = document.querySelector(".btn-appart");
const btnResto = document.querySelector(".btn-resto")

btnTous.addEventListener("click", function(){
    btnTous.classList.add("filtre-actif");
    btnObjet.classList.remove("filtre-actif");
    btnAppart.classList.remove("filtre-actif");
    btnResto.classList.remove("filtre-actif");
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(works);
});

btnObjet.addEventListener("click", function(){
    btnObjet.classList.add("filtre-actif");
    btnTous.classList.remove("filtre-actif");
    btnAppart.classList.remove("filtre-actif");
    btnResto.classList.remove("filtre-actif");
    document.querySelector(".gallery").innerHTML = "";
    const worksFiltre = works.filter(function(works){
        return works.category.id === 1;
    });
    genererWorks(worksFiltre);
    

});

btnAppart.addEventListener("click", function(){
    btnAppart.classList.add("filtre-actif");
    btnTous.classList.remove("filtre-actif");
    btnObjet.classList.remove("filtre-actif");
    btnResto.classList.remove("filtre-actif");
    document.querySelector(".gallery").innerHTML = "";
    const worksFiltre = works.filter(function(works){
        return works.category.id === 2;
    });
    genererWorks(worksFiltre);
});

btnResto.addEventListener("click", function(){
    btnResto.classList.add("filtre-actif");
    btnTous.classList.remove("filtre-actif");
    btnObjet.classList.remove("filtre-actif");
    btnAppart.classList.remove("filtre-actif");
    document.querySelector(".gallery").innerHTML = "";
    const worksFiltre = works.filter(function(works){
        return works.category.id === 3;
    });
    genererWorks(worksFiltre);
});

