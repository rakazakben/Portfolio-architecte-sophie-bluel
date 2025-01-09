import { apiWorks, apiCategory, apiLogin } from "./config.js";
const stockWorks = await fetch(apiWorks);
const works = await stockWorks.json();
const listeCategories = await fetch(apiCategory);
const categories = await listeCategories.json();
const tokenTest = sessionStorage.getItem("authToken");
//on vérifie la présence du token de connection et change le lien login/logout en fonction
const statusConnect = document.querySelectorAll(".status")
//etat authentifié ==>
if(tokenTest !== null){
    //changement du lien login en logout
    statusConnect[0].classList.add("connected");
    statusConnect[1].classList.remove("connected");
    //ajout du lien modifier à coté du titre h2
    const divProject = document.querySelector(".edit-project");
    const editLink = document.createElement("span");
    const titleproject= document.querySelector("#portfolio h2");
    titleproject.classList.add("edit-link");
    const editIcon= document.createElement("i");
    editIcon.classList.add("fa-regular", "fa-pen-to-square");
    editLink.innerText ="  modifier";
    editLink.prepend(editIcon);
    divProject.appendChild(editLink);
    //ajout de la banière mode edition
    const header = document.querySelector("header");
    const divEdit = document.createElement("div");
    divEdit.classList.add("edit-mode");
    const textBaniere = document.createElement("p");
    const iconBaniere = document.createElement("i");
    iconBaniere.classList.add("fa-regular", "fa-pen-to-square")
    textBaniere.innerText = " Mode édition";
    textBaniere.prepend(iconBaniere);
    divEdit.appendChild(textBaniere);
    header.prepend(divEdit);
    const backgroundModale = document.querySelector(".background-modale");
    //apparition de la modale lors du click sur le bouton modifier
    editLink.addEventListener("click", function(){
        backgroundModale.classList.add("active-modale");
        const xmark = document.querySelectorAll(".fa-xmark");
    //disparition de la modale lors du click sur la croix
    for(let i =0; i< xmark.length ; i++){
        xmark[i].addEventListener("click", function(){
            backgroundModale.classList.remove("active-modale");
    });
    }
       
    //disparition de la modale lors du click sur le fond
        backgroundModale.addEventListener("click", (event) =>{
            if(event.target === backgroundModale){
            backgroundModale.classList.remove("active-modale");
            }
        });
    });
}
const logout = document.querySelector(".logout");
logout.addEventListener("click", function(){
    sessionStorage.removeItem("authToken");
    statusConnect[0].classList.remove("connected");
    statusConnect[1].classList.add("connected");
    window.location.href = "index.html";
});
//génération de l'affichage des travaux
export function genererWorks(works){
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
    //lors du click sur un des bouton on rend tous les filtres inactifs
    for(let j=0; j< btnCategorie.length;j++){
        btnCategorie[j].classList.remove("filtre-actif");
    }
    //on rend le bouton "Tous" actif
    btnTous.classList.add("filtre-actif");
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(works);
});

//tri en fonction des id des catégories
for(let i =1; i< btnCategorie.length; i++){
    btnCategorie[i].addEventListener("click", async function(){
        //lors du click sur un des bouton on rend tous les filtres inactifs
        for(let j=0; j< btnCategorie.length;j++){
            btnCategorie[j].classList.remove("filtre-actif");
        }
        //on rend le filtre clické actif
        btnCategorie[i].classList.add("filtre-actif");
        document.querySelector(".gallery").innerHTML = "";
        const worksFiltre = works.filter(function(works){
        return works.category.id === i;
    });
    //on affiche uniquement les elements de la catégorie clickée
    genererWorks(worksFiltre);
    });
}
