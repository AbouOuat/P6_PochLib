class Book
{
    constructor(googleResponseItem)
    {
this.identifiant = googleResponseItem.id;
this.titre = googleResponseItem.volumeInfo.title;
this.auteur =googleResponseItem.volumeInfo?.authors?.[0];
this.description = googleResponseItem.searchInfo?.textSnippet;
this.image = googleResponseItem.volumeInfo?.imageLinks?.thumbnail;

//Affiche et Local Storage
//Création livre à partir du DOMManiplator
//grid en css..

/* console.log ("---");
console.log (this);  //Objet JAvaScript
console.log (googleResponseItem); // Objet JAvascript de la reponse
console.log (JSON.stringify(this));  //JSON
console.log ("---"); */

//Stockage dans une session
/* sessionStorage.setItem(this.identifiant,JSON.stringify(this));
console.log (JSON.parse(sessionStorage.getItem(this.identifiant))); */

//console.log ("Affichage de la session");

/* console.log (sessionStorage.getItem(googleResponseItem.id));
console.log ("AAA");
console.log (sessionStorage.getItem(googleResponseItem.id).identifiant);
console.log ("Fin affichage de la session A");
 */   
 }
}