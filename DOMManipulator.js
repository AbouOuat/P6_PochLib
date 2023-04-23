class DOMManipulator
{
    constructor ()
    { }
    
    static addAddButton()
    {
        let elementCreator = new ElementCreator();
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0];
        let boutonAjoutLivre = elementCreator.generateButton("ajoutLivre","Ajouter un livre","clsButton");
        boutonAjoutLivre.addEventListener("click", DOMManipulator.insertFieldSearch); 
        sectionNouveauLivre.insertBefore(boutonAjoutLivre,strHR );
    }
   
    static insertFieldSearch()
    {
        let elementCreator = new ElementCreator();
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0];
        //Section recherche
        let sectionRecherche = elementCreator.createSection("sectionRechercheName","clsSectionRecherche");

       //zones de texte
        let sTitreLivreTextBox = elementCreator.createTextBox ("titreLivre","Titre du livre","");
        let sAuteurLivreTextBox = elementCreator.createTextBox("auteurLivre","Auteur","");

       //Bouton Rechercher
        let sBoutonRechercher  = elementCreator.generateButton("btnRechercher","Rechercher","clsButton");
        sBoutonRechercher.addEventListener("click", async function ()
        {
            //session
            //sessionStorage.clear();

            //Resultat et marque page
            DOMManipulator.videSectionResultat(); 
            //DOMManipulator.videSectionMarquepage();

            //Recherche
            let googleBooksAPI = new GoogleBooksAPI();
            let titre = document.getElementById("titreLivre").value;
            let auteur = document.getElementById("auteurLivre").value;
            let theGoogleResult = await googleBooksAPI.searchBooks (titre,auteur);
            let listBooks = [];

            if (theGoogleResult.items?.length > 0)
            {
                for (let i=0; i<theGoogleResult.items.length; i++)
                {
                    listBooks.push(new Book (theGoogleResult.items[i]));
                }
            }
            DOMManipulator.affichageResultats(listBooks);
        });

        
        let sDiv  =  elementCreator.createElementGen("DIV","","","","");
        //Bouton Annuler
        let sBoutonAnnuler = elementCreator.generateButton("btnAnnuler","Annuler","clsButton--orange");
        sBoutonAnnuler.addEventListener("click",DOMManipulator.annulerRechercheMarquepage);

        sectionRecherche.appendChild (sTitreLivreTextBox);
        sectionRecherche.appendChild (sAuteurLivreTextBox);
        sectionRecherche.appendChild (sBoutonRechercher);
        sectionRecherche.appendChild (sDiv);
        sectionRecherche.appendChild (sBoutonAnnuler);
        sectionNouveauLivre.insertBefore(sectionRecherche,strHR);

        document.getElementsByName("ajoutLivre")[0].style.display ='none';
    }
  
     
    static affichageResultats (listBooks)
    {
        let elementCreator = new ElementCreator();
        /* 
        la section qui contiendra les résultats
        la section qui contiendra l'ajout des bookmark (marquage) en même temps
        */
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strContent = document.getElementById("content");

        let sectionResultatEtFavoris    = elementCreator.createSection("sectionResultatEtLblName","clsSectionResultatEtLbl");
        let divResultatRecherche        = elementCreator.createElementGen("DIV","","","","");
        let lblResultatRecherche        = elementCreator.createElementGen("h2","clsLblResultatRecherche","clsLblResultatRecherche","Résultat de recherche","");
        let sectionResultat             = elementCreator.createSection("clsSectionResultatName","clsSectionResultat","");
        
        divResultatRecherche.appendChild (lblResultatRecherche);
        sectionResultatEtFavoris.appendChild (divResultatRecherche);
        sectionResultatEtFavoris.appendChild (sectionResultat);
 
        if (listBooks.length > 0)
        {
            //sectionResultat
            for (let i=0; i<listBooks.length; i++)
            {
                let theBook = Book.generateBlocLivre(listBooks[i],"marquePage");
                sectionResultat.appendChild (theBook);
            }
        }
        else {
            sectionResultat.innerHTML += "Aucun livre n'a été trouvé";
        }
        sectionNouveauLivre.insertBefore(sectionResultatEtFavoris,strContent);
   }

    static refreshMarquepage()
    {
        if (sessionStorage.length>0)
        {
            let listBooks = [];
            for (let i=0; i< sessionStorage.length; i++)
            {
                let bookVal = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
                if (bookVal.identifiant != undefined){
                    listBooks.push(bookVal);
                    Book.affichageMarquepage(bookVal.identifiant);
                }
            }
        }
    }

    static annulerRechercheMarquepage()
    {
        //sessionStorage.clear();
        DOMManipulator.videSectionRecherche();
        DOMManipulator.videSectionResultat();
        //DOMManipulator.videSectionMarquepage();

        document.getElementsByName("ajoutLivre")[0].style.display ='block';
    }

    static videSectionRecherche(){
        if (document.getElementsByName("sectionRechercheName").length>0) {
            document.getElementById("myBooks").removeChild(document.getElementsByName("sectionRechercheName")[0]);
            }
    }

    static videSectionResultat(){
        if (document.getElementsByName("sectionResultatEtLblName").length> 0) {
            document.getElementById("myBooks").removeChild(document.getElementsByName("sectionResultatEtLblName")[0]); 
            }
    }

    static videSectionMarquepage()
    {
        if (document.getElementsByName("sectionMarquepageName").length > 0) {
            document.getElementById("myBooks").removeChild(document.getElementsByName("sectionMarquepageName")[0]);
            }
    }
}