import { apiWorks, apiCategory } from "./config.js";
import { genererWorks } from "./works.js";

const stockWorks = await fetch(apiWorks);
const works = await stockWorks.json();
const listeCategories = await fetch(apiCategory);
const categories = await listeCategories.json();
/********************  fonction de génération des travaux dans la galerie de la modale  *************************/
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
/****************************************************************************************************************/


/*********************  fonction de génération des boutons de suppression dans la modale  *****************************/
function genererDeletebutton(works) {
  //selection de la galerie dans la modale de suppression
    const divGallery = document.querySelector(".gallery-modale");
    for (let i = 0; i < works.length; i++) {
        const elementGallery = divGallery.querySelectorAll("figure")[i];
        const deleteElement = document.createElement("button");
        const deleteIcon = document.createElement("i");

        deleteElement.classList.add("delete-button");
        deleteIcon.classList.add("fa-solid", "fa-trash-can");

        deleteElement.appendChild(deleteIcon);
        elementGallery.appendChild(deleteElement);
    }
}
//on génére une première fois les boutons de suppression
genererDeletebutton(works);
/**********************************************************************************************************************/

/*************************** gestion de la suppression des projets **************************************/
//on selectionne la galerie de suppression pour gerer les evenements de clic sur les boutons de suppression
const divGallery =document.querySelector(".gallery-modale");
divGallery.addEventListener("click", async function (event) {
  //si le click est sur un bouton de suppression
    if (event.target.closest(".delete-button")) {
        
        const button = event.target.closest(".delete-button");
        const figure = button.closest("figure");
        //index récupère le numero de la figure correspondant au bouton de suppression cliqué
        const index = Array.from(document.querySelectorAll(".gallery-modale figure")).indexOf(figure);
        //on actualise la liste des travaux avant de supprimer
        const refreshWorks = await fetch(apiWorks);
        const updatedWorks = await refreshWorks.json();
        //si le clic trouve bien une figure correspondante :
        if (index !== -1) {
            // Suppression via API
            const response = await fetch(apiWorks + "/" + updatedWorks[index].id, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
                },
            });

            if (response.ok) {
                // Actualiser la galerie
                document.querySelector(".gallery-modale").innerHTML = "";
                document.querySelector(".gallery").innerHTML = "";

                // Récupérer les nouveaux travaux
                const refreshWorks = await fetch(apiWorks);
                const updatedWorks = await refreshWorks.json();

                // Regénérer les galeries
                genererModaleWorks(updatedWorks);
                genererWorks(updatedWorks);
                genererDeletebutton(updatedWorks); // Regénère les boutons
            } else {
                console.error("Erreur lors de la suppression :", response.statusText);
            }
        }
    }
});
/****************************************************************************************************************/


/*****************  ajout des categories dans le menu déroulant  *************************/
export function categoryAjoutModale(categories){
    const selecteurCategorie = document.getElementById("category");
    const choixInitial = document.createElement("option")
    choixInitial.value = ""; // Définit l'attribut value à une chaîne vide
    choixInitial.disabled = true; // Rend l'option non sélectionnable
    choixInitial.selected = true; // Définit l'option comme sélectionnée par défaut
    choixInitial.textContent = "Choisir une catégorie";

    //on ajoute la categorie par defaut au menu déroulant.
    selecteurCategorie.innerHTML ="";
    selecteurCategorie.appendChild(choixInitial);

    for(let i =0 ; i < categories.length; i++){
        const categorie = categories[i];
        
        const optionSelecteur = document.createElement("option");
        optionSelecteur.textContent = categorie.name;
        optionSelecteur.value = categorie.id;
        //on ajoute tous les boutons de catégorie dans le menu déroulant
        selecteurCategorie.appendChild(optionSelecteur);
    }

}
/*****************************************************************************************/


/*********  gestion de la prévisualisation de l'image à envoyer ***************/

//on récupère le champ d'envoie de fichier
const fichier = document.getElementById("file-input");
//on récupère l'emplacement de la prévisualisation
const prevImage = document.querySelector(".preview-project");
//on récupère la div des info sur l'upload pour l'utilisateur
const champFichier = document.querySelector(".file-upload-info");

//lorsque il y a changement dans le champ d'envoie de fichier (lorsque l'utilisateur a selectionné unr image)
fichier.addEventListener("change", function(){
    //on cache la div des infos d'upload
    champFichier.classList.add("inactive-modale");
    //on affiche à la place la div de prévisualisation
    prevImage.classList.remove("inactive-modale");
    //on actualise l'affichage de la div
    prevImage.innerHTML = "";

    //on créé une image avec comme source l'image envoyée par l'utilisateur dans le champs de fichier
    const testImage = document.createElement("img");
    testImage.src = window.URL.createObjectURL(fichier.files[0]);

    //on affiche l'image dans la zone de prévisualisation
    prevImage.appendChild(testImage);

});
/*******************************************************************************/


/****************** fonction de l'ajout de projets via l'api ************************/
async function sendProject(image, titre, categorie){
    //on créé on form data qui contiendra le corps de la requette
    const bodyPost = new FormData();
    //on ajoute dans le corps de la requette les elements en arguments de la fonction
    bodyPost.append("image", image);
    bodyPost.append("title", titre);
    bodyPost.append("category", categorie);


    try {
        // Envoie la requête POST avec fetch
        const response = await fetch(apiWorks, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("authToken")}`, // Ajoute le token d'autorisation
          },
          body: bodyPost, // Ajoute les données
        });
    
        // Vérifie la réponse
        if (response.ok) {
          const result = await response.json(); // Parse la réponse JSON
          console.log('Succès :', result);
        } else {
          console.error('Erreur lors de la requête :', response.status, response.statusText);
        }
      } 
      catch (error) {
        console.error('Erreur réseau ou autre :', error);
      }
}
/********************************************************************************************/



/************************* Gestion de l'ajout de projet par le formulaire ************************/

//on selectionne les champs du formulaire (le champ de fichier est déjà déclaré plus haut pour gerer la preview)
const titreInput = document.getElementById("title"); // Champ pour le titre
const categorieInput = document.getElementById("category"); // Champ pour la catégorie

// Ajoute un écouteur d'événement au formulaire
const projectForm = document.querySelector(".photo-form");
projectForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  const image = fichier.files[0]; // Fichier sélectionné par l'utilisateur
  const titre = titreInput.value; // Titre entré par l'utilisateur
  const categorie = categorieInput.value; // Catégorie choisie

  if (image && titre && categorie) {
    //envoie du projet avec les elements récupérés dans le formulaire
    await sendProject(image, titre, categorie);

    //on actualise les travaux après ajout via l'api
    const refreshWorks = await fetch(apiWorks);
    const actualWorks = await refreshWorks.json();

    //on actualise l'affichage des galeries
    document.querySelector(".gallery-modale").innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    genererModaleWorks(actualWorks);
    genererWorks(actualWorks);
    genererDeletebutton(actualWorks);

    // on retire l'affichage de la preview de l'image et on remet la div avec le champ de fichier
    champFichier.classList.remove("inactive-modale");
    prevImage.classList.add("inactive-modale");
    
    //on reset les champs du formulaire à leur valeur par defaut
    projectForm.reset();
    const testImage = document.querySelector(".preview-project img");
    testImage.src = "";
    


  } else {
    alert("Veuillez remplir tous les champs !"); //on notifie l'utilisateur d'un champ non rempli
  }
});
/*************************************************************************************************/



