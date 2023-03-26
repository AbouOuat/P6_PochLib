class DOMManipulator
{
    
    /* constructor ()
    { 
        console.log ("Avant");
        addSearchButton;
        console.log ("Apres");
    } */
    
    static addSearchButton()
    {
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0]; //Crochet avec 0 pour prendre le premier hr
        let boutonAjoutLivre = document.createElement("button");
        boutonAjoutLivre.textContent="Ajouter un livre";
        boutonAjoutLivre.name="ajoutLivre";
        boutonAjoutLivre.classList.add("clsButton");
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
         

        sectionNouveauLivre.insertBefore(boutonAjoutLivre,strHR );
             
    }


    static insertFieldSearch (test)
    {
        // console.log(event);
        console.log (test);
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0]; //Crochet avec 0 pour prendre le premier hr

        /* //Ajout des zones de texte    COMMENTAIRES A DECOMMENTER
        let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre");
        
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur");
        */
       


         //Ajout des zones de texte  .. A SUPPRIMER
         let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre","les misérables");
     
         let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur","Hugo");
        


        //Ajout des boutons
        //Vendredi 17/02/2023
        let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");

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
            //Affichage des resultats
           if (listBooks.length>0)
           {
            DOMManipulator.affichageResultats(listBooks);
           }
                   

        });

        
        let sDiv  =  document.createElement("Div");

        //sBoutonRechercher.addEventListener("click", function (){console.log("Toto d")});
          //Toutes ces classes sont appelées depuis une classe mère  (pochlib.js par exemple)
        //On appelle une classe à laquelle on transmet les arguments et on fait la recherche de l'api
        // 1 classe pour accueillir et netoyer le résultat..liste de livre nettoyer
        // 1 classe pour afficher depuis l'objet nettoyé (DomManipulator pour le livre)
        //Dans le la fonction, il faut appler la classe  ..à laquelle on transmet les arguments et on fait la recherche
        


        //
        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton clsButton--orange");
        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton");
        
        //sBoutonAnnuler.classList.add("clsButton--orange");

        let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton--orange");
        //Sur click de Annuler , ondoit réafficher les elments via css  (notamment).


        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton--test1");

        //Insertion dans le DOM
        sectionNouveauLivre.insertBefore (sTitreLivreTextBox,strHR);
        sectionNouveauLivre.insertBefore (sAuteurLivreTextBox, strHR);

        sectionNouveauLivre.insertBefore (sBoutonRechercher,strHR);
        sectionNouveauLivre.insertBefore (sDiv,strHR);
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

        titreLivre.setAttribute("value","les misérables" );


        let labelAuteurLivre = document.createElement("p");
        labelAuteurLivre.innerText = "Auteur";
        let auteurLivre = document.createElement("INPUT");
        titreLivre.setAttribute ("type", "text");
        titreLivre.setAttribute ("name","auteurLivre");
    }

    static generateTextBox(id,sLabel,valueDefault)
    {
         let labelTitreLivre = document.createElement("p");
        labelTitreLivre.innerText = sLabel;
        
        let titreLivre = document.createElement("INPUT");
        titreLivre.setAttribute ("type", "text");
        titreLivre.setAttribute ("name",id);
        titreLivre.setAttribute ("id",id);
        titreLivre.setAttribute ("value",valueDefault);

        labelTitreLivre.appendChild(titreLivre);
        //console.log(labelTitreLivre);
        return labelTitreLivre;

    }

    static generateButton(id,sLabel,sClassName)
    {
        let boutonLivreParag = document.createElement("p");
        let boutonLivre = document.createElement("button");
        boutonLivre.textContent=sLabel;
        boutonLivre.name=id;
        boutonLivre.className=sClassName;
        //boutonLivre.classList.add(sClassName);
            
        console.log(boutonLivre);

        boutonLivreParag.appendChild(boutonLivre);

        return boutonLivre;
        //return boutonLivreParag;

    }

    static generateBloc(theBook)
    {

        //Création d'un bloc contenant tous les éléments ci-dessous
        let blocBook = document.createElement("div");
        blocBook.classList.add("clsBorderBook");
                
        let lblTitre = document.createElement("div");
        lblTitre.innerHTML+="Titre : " + theBook.titre;
        lblTitre.classList.add("clsTitre");
        //lblTitre.className = "clsTitre";
        
        
    
        let lblIdentifiant = document.createElement("div");
        lblIdentifiant.innerHTML+="Id : " + theBook.identifiant;
        lblIdentifiant.classList.add("clsIdentifiant");


        let lblAuteur = document.createElement("div");
        lblAuteur.innerHTML+="Auteur : " + theBook.auteur;
        lblAuteur.classList.add("clsAuteur");


        let theDesc = theBook.description ? theBook.description.slice(0,200) : "Information manquante";
        let lblDescription = document.createElement("div");
        lblDescription.innerHTML+="Description : " +  theDesc;
        lblDescription.classList.add("clsDescription");


        let objImage = document.createElement("img");
        objImage.classList.add("clsImage");
        objImage.src = theBook.image ? theBook.image : "/images/unavailable.png" ;
        //href=""
        //objImage.alt = "Pas d'image pour ce resultat de recherche";
        /* objImage.innerHTML+="Description : " +  theBook.image?.slice(0,200);
        objImage.classList.add("clsImage"); */

        blocBook.appendChild(lblTitre);
        blocBook.appendChild(lblIdentifiant);
        blocBook.appendChild(lblAuteur);
        blocBook.appendChild(lblDescription);
        blocBook.appendChild(objImage);
        console.log(" Le bloc" );
        console.log(blocBook);
        return blocBook;
    }
    
    static affichageResultats (listBooks)
    {
        //
        //console.log("Affichage reultalt:" + listBooks.length );
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strContent = document.getElementById("content");

        //On doit se postionner sur la page et afficher 
        //let lblResultatRecherche = document.createElement("p");
        let lblResultatRecherche = document.createElement("h2");
        lblResultatRecherche.innerHTML += "Résultat de recherche";
        lblResultatRecherche.className = "clsLblResultatRecherche";
        
        /* // Exemple ajouter ou supprimer plusieurs classes
div.classList.add("foo", "bar", "baz");
div.classList.remove("foo", "bar", "baz"); */

        let sectionResultat = document.createElement("section");
        sectionResultat.className = "clsSectionResultat";
        //sectionResultat
        for (let i=0; i<listBooks.length; i++)
        {
         /*  console.log(" ABCD :" + i );    */ 
         let theBook = DOMManipulator.generateBloc(listBooks[i]);
         sectionResultat.appendChild (theBook);
        }


        //positionnnemt des balises
        sectionNouveauLivre.insertBefore(lblResultatRecherche,strContent);
        sectionNouveauLivre.insertBefore(sectionResultat,strContent);
        
    }


}