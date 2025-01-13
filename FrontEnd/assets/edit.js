import { apiWorks, apiCategory, apiLogin } from "./config.js";
import { genererWorks } from "./works.js";
const stockWorks = await fetch(apiWorks);
const works = await stockWorks.json();
const listeCategories = await fetch(apiCategory);
const categories = await listeCategories.json();
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
export function deleteProject(){
    const deleteElement = document.querySelectorAll(".gallery-modale button");
    //boucle de test de click sur les boutons
    for(let i=0; i<deleteElement.length; i++){
        //on écoute l'evenement click sur un bouton
    deleteElement[i].addEventListener("click", async function(){
        //on requette à l'api de supprimer le projet correspondant 
        const refreshWorks = await fetch(apiWorks);
        const actualWorks = await refreshWorks.json();
        await fetch(apiWorks + "/"+ actualWorks[i].id,{
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
    }}
deleteProject();

export function categoryAjoutModale(categories){
    const selecteurCategorie = document.getElementById("category");
    const choixInitial = document.createElement("option")
    choixInitial.value = ""; // Définit l'attribut value à une chaîne vide
    choixInitial.disabled = true; // Rend l'option non sélectionnable
    choixInitial.selected = true; // Définit l'option comme sélectionnée par défaut
    choixInitial.textContent = "Choisir une catégorie";
    
    selecteurCategorie.innerHTML ="";
    selecteurCategorie.appendChild(choixInitial);
    for(let i =0 ; i < categories.length; i++){
        const categorie = categories[i];
        
        const optionSelecteur = document.createElement("option");
        optionSelecteur.textContent = categorie.name;
        optionSelecteur.value = categorie.id;
        //on créé tous les boutons de catégorie dans la div filtres
        selecteurCategorie.appendChild(optionSelecteur);
    }

}
const fichier = document.getElementById("file-input");
const prevImage = document.querySelector(".preview-project");
const champFichier = document.querySelector(".file-upload-info");
fichier.addEventListener("change", function(){
    console.log(fichier.files);
    champFichier.classList.add("inactive-modale");
    prevImage.classList.remove("inactive-modale");
    prevImage.innerHTML = "";
    const testImage = document.createElement("img");
    testImage.src = window.URL.createObjectURL(fichier.files[0]);
    prevImage.appendChild(testImage);

});

async function sendProject(image, titre, categorie){
    const bodyPost = new FormData();
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
    await sendProject(image, titre, categorie);
    const refreshWorks = await fetch(apiWorks);
    const actualWorks = await refreshWorks.json();
    document.querySelector(".gallery-modale").innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    genererModaleWorks(actualWorks);
    genererWorks(actualWorks);
    genererDeletebutton(actualWorks);
    champFichier.classList.remove("inactive-modale");
    prevImage.classList.add("inactive-modale");
    /*titreInput.value ="";
    const choixInitial = document.querySelector("option")
    choixInitial.selected = true;*/
    projectForm.reset();
    const testImage = document.querySelector(".preview-project img");
    testImage.src = "";
    await deleteProject();


  } else {
    alert("Veuillez remplir tous les champs !");
  }
});

