class DOMManipulator
{
    static addSearchButton()
    {
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0]; //Crochet avec 0 pour prendre le premier hr
        let boutonAjoutLivre = document.createElement("button");
        boutonAjoutLivre.textContent="Ajout de livre";
        boutonAjoutLivre.name="ajoutLivre";
        // boutonAjoutLivre.addEventListener("click", function(event)
        //     {
        //         let sectionNouveauLivre = document.getElementById("myBooks");
        //         let strHR = document.getElementsByTagName("hr")[0]; //Crochet avec 0 pour prendre le premier hr

        //         sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre");
        //         sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur");

        //         sectionNouveauLivre.insertBefore (sTitreLivreTextBox,strHR);
        //         sectionNouveauLivre.insertBefore (sAuteurLivreTextBox, strHR);
        //         event.target.parentNode.removeChild(event.target);
                
        //     }
        
        // )


        //boutonAjoutLivre.addEventListener("click", DOMManipulator.insertFieldSearch.bind(null,"toto")); //On appelle DOMManipulator.insertFieldSearch variable = function
      //ou

        boutonAjoutLivre.addEventListener("click", DOMManipulator.insertFieldSearch.bind(null,"toto")); //On appelle DOMManipulator.insertFieldSearch variable = function
      

        //console.log(sTitreLivreTextBox);

        sectionNouveauLivre.insertBefore(boutonAjoutLivre,strHR );
       


        // generateTextBox(id,sLabel)
        // {
        //     let labelTitreLivre = document.createElement("p");
        //     labelTitreLivre.innerText = sLabel;
        //     let titreLivre = document.createElement("INPUT");
        //     titreLivre.setAttribute ("type", "text");
        //     titreLivre.setAttribute ("name",id);
        //     titreLivre.setAttribute ("id",id);
    
    
        // }

       
    }


    static insertFieldSearch (test)
    {
        // console.log(event);
        console.log (test);
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0]; //Crochet avec 0 pour prendre le premier hr

        //Ajout des zones de texte
        let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur");

        //Ajout des boutons
        //Vendredi 17/02/2023
        let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher");

        sBoutonRechercher.addEventListener("click", async function (){
            console.log ("Test");
            let googleBooksAPI = new GoogleBooksAPI();
            let titre = document.getElementById("titreLivre").value;
            let auteur = document.getElementById("auteurLivre").value;
            console.log ("titre:" + titre + "auteur: "+ auteur);
            let theGoogleResult = await googleBooksAPI.searchBooks (titre,auteur);
            console.log (theGoogleResult);
            let listBooks = [];
            for (let i=0; i<theGoogleResult.items.length; i++)
            {
                listBooks.push(new Book (theGoogleResult.items[i]));

            }
            console.log (listBooks);

        });

        
        //sBoutonRechercher.addEventListener("click", function (){console.log("Toto d")});
          //Toutes ces classes sont appelées depuis une classe mère  (pochlib.js par exemple)
        //On appelle une classe à laquelle on transmet les arguments et on fait la recherche de l'api
        // 1 classe pour accueillir et netoyer le résultat..liste de livre nettoyer
        // 1 classe pour afficher depuis l'objet nettoyé (DomManipulator pour le livre)
        //Dans le la fonction, il faut appler la classe  ..à laquelle on transmet les arguments et on fait la recherche
        


        //
        let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler");
        //Sur click de Annuler , ondoit réafficher les elments via css  (notamment).

        //Insertion dnas le DOM
        sectionNouveauLivre.insertBefore (sTitreLivreTextBox,strHR);
        sectionNouveauLivre.insertBefore (sAuteurLivreTextBox, strHR);

        sectionNouveauLivre.insertBefore (sBoutonRechercher,strHR);
        sectionNouveauLivre.insertBefore (sBoutonAnnuler, strHR);

        //On supprime le bouton sur lequel on a cliqué
        event.target.parentNode.removeChild(event.target);
        //A modifier , on doit le cacher  (via CSS) ..et non le supprimer finalement

        //Gestion des événéments des boutons Rechercher et Ajouter
        
        
    }


    addTextBox()
    {
        //Création de balises pour Titre et Auteur du livre
        let labelTitreLivre = document.createElement("p");
        labelTitreLivre.innerText = "Titre du livre";
        let titreLivre = document.createElement("INPUT");
        titreLivre.setAttribute ("type", "text");
        titreLivre.setAttribute ("name","titreLivre");


        let labelAuteurLivre = document.createElement("p");
        labelAuteurLivre.innerText = "Auteur";
        let auteurLivre = document.createElement("INPUT");
        titreLivre.setAttribute ("type", "text");
        titreLivre.setAttribute ("name","auteurLivre");
    }

    static generateTextBox(id,sLabel)
    {
         let labelTitreLivre = document.createElement("p");
        labelTitreLivre.innerText = sLabel;
        
        let titreLivre = document.createElement("INPUT");
        titreLivre.setAttribute ("type", "text");
        titreLivre.setAttribute ("name",id);
        titreLivre.setAttribute ("id",id);

        labelTitreLivre.appendChild(titreLivre);
        //console.log(labelTitreLivre);
        return labelTitreLivre;

    }

    static generateButton(id,sLabel)
    {
        let boutonLivreParag = document.createElement("p");
       

        let boutonLivre = document.createElement("button");
        boutonLivre.textContent=sLabel;
        boutonLivre.name=id;
            
        console.log(boutonLivre);

        boutonLivreParag.appendChild(boutonLivre);

        return boutonLivre;
        //return boutonLivreParag;

    }


}