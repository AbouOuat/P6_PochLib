class GoogleBooksAPI {

    uRLSearchBook = "https://www.googleapis.com/books/v1/volumes?q={0}+inauthor:{1}+intitle:{2}";
    
    constructor ()
    { }

    async searchBooks (sTitreLivre, sAuteurLivre)
    {
    let request= this.uRLSearchBook.replace("{0}",sTitreLivre).replace("{1}",sAuteurLivre).replace("{2}",sTitreLivre);
    console.log (request);
    let resultat = await fetch(request).then((response)=> {
        return response.json();
        });
    return (resultat);


    }


}