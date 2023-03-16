class Book
{
    constructor(googleResponseItem)
    {
        /*

        Pour chaque livre, les éléments suivants doivent être présents :
- identifiant ; item[0].id 
- titre ;item[0].title
- auteur (s’il y a plusieurs auteurs, n’afficher que le premier) ;  : item.volumeInfo.authors[0]

- icône pour garder le livre dans sa liste (bookmark) ;
- description (limitée aux 200 premiers caractères) ; item.searchInfo.textSnippet
- image.
        */
this.identifiant = googleResponseItem.id;
this.titre = googleResponseItem.volumeInfo.title;
this.auteur =googleResponseItem.volumeInfo?.authors?.[0];
this.description = googleResponseItem.searchInfo?.textSnippet;
this.image = googleResponseItem.volumeInfo?.imageLinks?.thumbnail;

//Affiche et Local Storage
//Création css,
//Création livre à partir du DOMManiplator
//grid en css..

console.log (this);
    }
}