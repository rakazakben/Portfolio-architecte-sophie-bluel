import { apiWorks, apiCategory } from "./config.js";
import { categoryAjoutModale} from "./edit.js";

const stockWorks = await fetch(apiWorks); //appel GET sur la route works de l'api
const works = await stockWorks.json();
const listeCategories = await fetch(apiCategory);
const categories = await listeCategories.json();
const tokenTest = sessionStorage.getItem("authToken");
//on vérifie la présence du token de connection et change le lien login/logout en fonction
const statusConnect = document.querySelectorAll(".status")
//etat authentifié ==>


/************************** Gestion du mode edition après authentification ********************************/    
if(tokenTest !== null){
    /******************gestion de la page d'accueil authentifiée ********************/
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
    /*******************************************************************************/

    /***********gestion de l'apparition de la modale ************/
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
    /************************************************************/

    /********** gestion de la modale d'ajout ********************/
    const divDeleteModale = document.querySelector(".delete-modale");
    const divAjoutModale = document.querySelector(".ajout-modale");
    const ajoutButton = document.getElementById("ajout-photo");
    //apparition de la modale d'ajout de projet lors du clic sur "Ajouter une photo"
    ajoutButton.addEventListener("click", function(){
        divAjoutModale.classList.remove("inactive-modale")
        divDeleteModale.classList.add("inactive-modale");
        categoryAjoutModale(categories);
    });
    const retourModale = document.querySelector(".fa-arrow-left");
    //retour à la modale de suppression lors du clic sur la fleche retour
    retourModale.addEventListener("click", function(){
        divAjoutModale.classList.add("inactive-modale")
        divDeleteModale.classList.remove("inactive-modale");
        
    });
    /************************************************************/
}

/*********** gestion de la deconnection ******************/
const logout = document.querySelector(".logout");
//deconnection lors du clic sur logout
logout.addEventListener("click", function(){
    //suppression du token d'authentification
    sessionStorage.removeItem("authToken");
    //Actualisation de la page pour checker l'absence de token dans le if(tokenTest ==! null)
    window.location.href = "index.html";
});
/******************************************************/

/***************** Fonction d'affichage des travaux dans la galerie *************************/
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
//affichage des travaux lors du lancement de la page
genererWorks(works);
/********************************************************************************************/


/****************génération des filtres en fonction des catégories sur l'api**************/
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
//génération des filtres au lancement de la page    
genererFiltres(categories);
/*****************************************************************************************/


/**************************  système de tri *************************************/

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
    const refreshWorks = await fetch(apiWorks);
    const actualWorks = await refreshWorks.json();
    genererWorks(actualWorks);
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
        const refreshWorks = await fetch(apiWorks);
        const actualWorks = await refreshWorks.json();
        const worksFiltre = actualWorks.filter(function(works){
        return works.category.id === i;
    });
    //on affiche uniquement les elements de la catégorie clickée
    genererWorks(worksFiltre);
    });
}
/*********************************************************************************/
