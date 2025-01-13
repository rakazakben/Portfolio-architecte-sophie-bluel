/********************* fichier de gestion du serveur backend  ****************************/

const backend ="http://localhost:5678";//remplacer par l'adresse de deploiement de l'api

export const apiWorks = backend +"/api/works";
export const apiCategory =backend +"/api/categories";
export const apiLogin = backend + "/api/users/login";