import { apiLogin } from "./config.js";
function connectUser(){
        const formLogin = document.querySelector(".form-login");
        //on ecoute l'evenement submit du formulaire de connection
        formLogin.addEventListener("submit",async function(event){
            event.preventDefault(); //on évite l'actualisation de la page
            //on prépare le body de la requette de connection pour l'api
            const log = {
                    //on récupère le texte des champs mail et password
                    email: event.target.querySelector("[name=email]").value,
                    password: event.target.querySelector("[name=password]").value
            };
            const requeteLog = JSON.stringify(log); //on transforme le body en JSON
            
            try {
                //on tente le login à l'api
                const reponse = await fetch(apiLogin, {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: requeteLog
                });
                //si la réponse de l'api est négative on notifie l'erreur
                if(!reponse.ok){
                    throw new Error("email ou mdp incorrect");
                }
                //si la connection est reussie on stocke le token dans le sessionStorage du navigateur
                const data = await reponse.json();
                sessionStorage.setItem("authToken", data.token);
                //et on retourne directement sur la page d'accueil avec le token stocké
                window.location.href = "index.html";
            } 
            //on récupère l'erreur si elle existe et on ajoute le texte d'erreur de connection pour l'utilisateur 
            catch (Error) {
                const messageErreur =document.createElement("p");
                messageErreur.classList.add("erreur-connect");
                
                messageErreur.innerText = "Mauvais mot de passe et/ou email";
                formLogin.prepend(messageErreur);
            }
            

        });
}
connectUser();