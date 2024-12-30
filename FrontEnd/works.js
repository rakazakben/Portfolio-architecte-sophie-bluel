const stockWorks = await fetch("http://localhost:5678/api/works");
const works = await stockWorks.json();
const listeCategories = await fetch("http://localhost:5678/api/categories");
const categories = await listeCategories.json();

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
//génération des filtres en fonction des catégories sur l'api
function genererFiltres(categories){
    //on se place dans la div filtre
    const divFiltres = document.querySelector(".btn-filtre");
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.classList.add("btn-tous");
    btnTous.classList.add("filtre-actif");
    //on créé le bouton "Tous" qui sera toujours présent 
    divFiltres.appendChild(btnTous);
    for(let i =0 ; i < categories.length; i++){
        const categorie = categories[i];
        
        const btnFiltre = document.createElement("button");
        btnFiltre.innerText = categorie.name;
        //on créé tous les boutons de catégorie dans la div filtres
        divFiltres.appendChild(btnFiltre);
    }
}
    
genererFiltres(categories);

//système de tri :

const btnTous = document.querySelector(".btn-tous");
const btnCategorie = document.querySelectorAll(".btn-filtre button");
//affichage de tous les works lors du clic sur le bouton "Tous"
btnTous.addEventListener("click",async function(){
    console.log("bouton clické");
    for(let j=0; j< btnCategorie.length;j++){
        btnCategorie[j].classList.remove("filtre-actif");
    }
    btnTous.classList.add("filtre-actif");
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(works);
});

//tri en fonction des id des catégories
for(let i =1; i< btnCategorie.length; i++){
    btnCategorie[i].addEventListener("click", async function(){
        for(let j=0; j< btnCategorie.length;j++){
            btnCategorie[j].classList.remove("filtre-actif");
        }
        
        btnCategorie[i].classList.add("filtre-actif");
        document.querySelector(".gallery").innerHTML = "";
        const worksFiltre = works.filter(function(works){
        return works.category.id === i;
    });
    genererWorks(worksFiltre);
    });
}
