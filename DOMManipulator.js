class DOMManipulator
{
    
     constructor ()
    { }
    
    static addAddButton()
    {
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0]; //Crochet avec 0 pour prendre le premier hr
        let boutonAjoutLivre = document.createElement("button");
        boutonAjoutLivre.textContent="Ajouter un livre";
        boutonAjoutLivre.name="ajoutLivre";
        boutonAjoutLivre.classList.add("clsButton");
        

        //boutonAjoutLivre.addEventListener("click", DOMManipulator.insertFieldSearch.bind(null,"toto")); //On appelle DOMManipulator.insertFieldSearch variable = function
      //ou

        boutonAjoutLivre.addEventListener("click", DOMManipulator.insertFieldSearch.bind(null,"toto")); //On appelle DOMManipulator.insertFieldSearch variable = function
         

        sectionNouveauLivre.insertBefore(boutonAjoutLivre,strHR );
             
    }


    static insertFieldSearch (test)
    {
        // console.log(event);
        //console.log (test);
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0]; //Crochet avec 0 pour prendre le premier hr

        //Section avec la zone de recherche
        let sectionRecherche = document.createElement("section");
        sectionRecherche.classList.add("clsSectionRecherche");

        /* //Ajout des zones de texte    COMMENTAIRES A DECOMMENTER
        let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur");
        */
       


          //Ajout des zones de texte  .. A SUPPRIMER
         let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre","les misérables");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur","Hugo");


      /*    let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre","les ZSZDZDZ");
     
         let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur","Hugo"); */
        


        //Ajout des boutons
        //Vendredi 17/02/2023
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton clsButton__rechercher2");
        
        let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton__rechercher2");
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");
        sBoutonRechercher.classList.add("clsButtonrechercher");
        sBoutonRechercher.addEventListener("click", async function (){
            let googleBooksAPI = new GoogleBooksAPI();
            let titre = document.getElementById("titreLivre").value;
            let auteur = document.getElementById("auteurLivre").value;
            console.log ("titre:" + titre + "  auteur: "+ auteur);
            let theGoogleResult = await googleBooksAPI.searchBooks (titre,auteur);
            console.log (theGoogleResult);
            let listBooks = [];

            if (theGoogleResult.items?.length > 0) //Si pas de retour, on ne rempli pas le tableau
            {
                for (let i=0; i<theGoogleResult.items.length; i++)
                {
                    listBooks.push(new Book (theGoogleResult.items[i]));
                }
            }
           //Affichage des resultats
           DOMManipulator.affichageResultats(listBooks); //On gère le contenu vide ou non, de listBooks, dans la méthode affichageResultat
             

        });

        
        let sDiv  =  document.createElement("Div");
        //
        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton clsButton--orange");
        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton");
        
        //sBoutonAnnuler.classList.add("clsButton--orange");

        let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton--orange");
        //Sur click de Annuler , ondoit réafficher les elments via css  (notamment).
        //sBoutonAnnuler.addEventListener("click", )


        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton--test1");

        //Insertion dans le DOM
        /* sectionNouveauLivre.insertBefore (sTitreLivreTextBox,strHR);
        sectionNouveauLivre.insertBefore (sAuteurLivreTextBox, strHR);

        sectionNouveauLivre.insertBefore (sBoutonRechercher,strHR);
        sectionNouveauLivre.insertBefore (sDiv,strHR);
        sectionNouveauLivre.insertBefore (sBoutonAnnuler, strHR); */


        sectionRecherche.appendChild (sTitreLivreTextBox);
        sectionRecherche.appendChild (sAuteurLivreTextBox);

        sectionRecherche.appendChild (sBoutonRechercher);
        sectionRecherche.appendChild (sDiv);
        sectionRecherche.appendChild (sBoutonAnnuler);

        sectionNouveauLivre.insertBefore(sectionRecherche,strHR);

        //On supprime le bouton sur lequel on a cliqué
        event.target.parentNode.removeChild(event.target);
        //A modifier , on doit le cacher  (via CSS) ..et non le supprimer finalement
       

        //Gestion des événéments des boutons Rechercher et Ajouter
   
        
    }
  

    static generateTextBox(id,sLabel,valueDefault)
    {
         let labelTitreLivre = document.createElement("p");
        labelTitreLivre.innerText = sLabel;
        
        let boutonBr = document.createElement("br");
        let divFormat = document.createElement("div");
        
        let titreLivre = document.createElement("INPUT");
        titreLivre.setAttribute ("type", "text");
        titreLivre.setAttribute ("name",id);
        titreLivre.setAttribute ("id",id);
        titreLivre.setAttribute ("value",valueDefault);
        titreLivre.setAttribute ("class","clsInput");
       

        divFormat.appendChild (titreLivre);
        labelTitreLivre.appendChild (boutonBr);
        labelTitreLivre.appendChild(divFormat);
      /* labelTitreLivre.appendChild (boutonBr);
        labelTitreLivre.appendChild(titreLivre);
       */
        return labelTitreLivre;

    }

    static generateButton(id,sLabel,sClassName)
    {
        let boutonLivreParag = document.createElement("div");
        let boutonBr = document.createElement("br");
        let boutonLivre = document.createElement("button");
        boutonLivre.textContent=sLabel;
        boutonLivre.name=id;
        //boutonLivre.className=sClassName;
        boutonLivre.classList.add(sClassName);
        boutonLivreParag.appendChild(boutonBr);    
        boutonLivreParag.appendChild(boutonLivre);

        return boutonLivre;
        //return boutonLivreParag;

    }

    
    static affichageResultats (listBooks)
    {
        /* 
        la section qui contiendra les résultats
        la section qui contiendra l'ajout des bookmark (marquage) en même temps
        */

        let sectionNouveauLivre = document.getElementById("myBooks");
        let strContent = document.getElementById("content");

        let lblResultatRecherche = document.createElement("h2");
        lblResultatRecherche.innerHTML += "Résultat de recherche";
        lblResultatRecherche.className = "clsLblResultatRecherche";
        
        let sectionResultat = document.createElement("section");
        sectionResultat.className = "clsSectionResultat";



        if (listBooks.length > 0)
        {
            console.log ("Nombrede res:"+listBooks.length);
            //sectionResultat
            for (let i=0; i<listBooks.length; i++)
            {
                let theBook = Book.generateBlocLivre(listBooks[i],"marquePage");
                console.log ("Après call Book");
               sectionResultat.appendChild (theBook);
            }
        }
        else {
            sectionResultat.innerHTML += "Aucun livre n'a été trouvé";
        }

        //positionnnemt des balises
        sectionNouveauLivre.insertBefore(lblResultatRecherche,strContent);
        sectionNouveauLivre.insertBefore(sectionResultat,strContent);
        
    }
}