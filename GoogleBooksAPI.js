class GoogleBooksAPI {

    uRLSearchBook = "https://www.googleapis.com/books/v1/volumes?q={0}+inauthor:{1}+intitle:{2}";
    
    constructor ()
    {


    }

    async searchBooks (sTitreLivre, sAuteurLivre)
    {
    let request= this.uRLSearchBook.replace("{0}",sTitreLivre).replace("{1}",sAuteurLivre).replace("{2}",sTitreLivre);
    console.log (request);
    let resultat = await fetch(request).then((response)=> {
        //console.log (response.json());
        return response.json();
        });
    return (resultat);

//Retrvailler pour prendre que ce dont on a besoin..//
//on met dans une classe Livre
//c'est cette calsse on va manipuler pour la suite.
// cette on va l'instancier dans Dommmanipul.. ou DomMAnipulator2 par exemple.. Et dans tous les cas c'est Domanipulator qui affche.

        //console.log ("Avant Fetch Titre:" + strTitre +  " Auteur:" + strAuteur);
//     //let variableAPI = fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms").then((response)=> console.log(response.json()));

//     // let variableAPI =
//     // let reponseGoogle;
 
    }


}