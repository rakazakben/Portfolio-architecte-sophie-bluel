import { apiLogin } from "./config.js";
function connectUser(){
        const formLogin = document.querySelector(".form-login");
        formLogin.addEventListener("submit",async function(event){
            event.preventDefault();
            const log = {
                
                    email: event.target.querySelector("[name=email]").value,
                    password: event.target.querySelector("[name=password]").value
            };
            const requeteLog = JSON.stringify(log);
            console.log(requeteLog);
            try {
                
                const reponse = await fetch(apiLogin, {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: requeteLog
                });
                if(!reponse.ok){
                    throw new Error('email ou mdp incorrect');
                }

                const data = await reponse.json();
                sessionStorage.setItem("authToken", data.token);
                window.location.href = "index.html";
            } 
            catch (Error) {
                const messageErreur =document.createElement("p");
                messageErreur.classList.add("erreur-connect");
                messageErreur.innerText = "mauvais mot de passe et/ou email";
                formLogin.prepend(messageErreur);
            }
            

        });
}
connectUser();