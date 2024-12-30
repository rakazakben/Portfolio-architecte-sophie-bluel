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

function genererFiltres(categories){
    const divFiltres = document.querySelector(".btn-filtre");
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.classList.add("btn-tous");
    divFiltres.appendChild(btnTous);
    for(let i =0 ; i < categories.length; i++){
        const categorie = categories[i];
        
        const btnFiltre = document.createElement("button");
        btnFiltre.innerText = categorie.name;
        btnFiltre.classList.add("btn"+categorie.id);

        divFiltres.appendChild(btnFiltre);
    }
}
    
genererFiltres(categories);

//système de tri :

const btnTous = document.querySelector(".btn-tous");
const btnCategorie = document.querySelectorAll(".btn-filtre button");

btnTous.addEventListener("click",async function(){
    console.log("bouton clické");
    for(let j=0; j< btnCategorie.length;j++){
        btnCategorie[j].classList.remove("filtre-actif");
    }
    btnTous.classList.add("filtre-actif");
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(works);
});


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

/*btnObjet.addEventListener("click", function(){
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
*/
