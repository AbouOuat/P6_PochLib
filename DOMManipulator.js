class DOMManipulator
{
    constructor ()
    { }
    
    static addAddButton()
    {
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0];
        let boutonAjoutLivre = document.createElement("button");
        boutonAjoutLivre.textContent="Ajouter un livre";
        boutonAjoutLivre.name="ajoutLivre";
        boutonAjoutLivre.classList.add("clsButton");
        boutonAjoutLivre.addEventListener("click", DOMManipulator.insertFieldSearch.bind(null,"toto")); 
        sectionNouveauLivre.insertBefore(boutonAjoutLivre,strHR );
    }


    static insertFieldSearch (test)
    {
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0];

        //Section recherche
        let sectionRecherche = document.createElement("section");
        sectionRecherche.classList.add("clsSectionRecherche");
        sectionRecherche.setAttribute("name","sectionRechercheName");

        //zones de texte
        /* let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur"); */
        
          //Ajout des zones de texte  .. A SUPPRIMER
        let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre","les misérables");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur","Hugo");


        let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");
        sBoutonRechercher.addEventListener("click", async function ()
        {
            //Vide la session
            //sessionStorage.clear();

            //Vide sections resultat et marquepage
            DOMManipulator.videSectionResultat(); 
            //DOMManipulator.videSectionMarquepage();

            //Lance la recherche
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

        
        let sDiv  =  document.createElement("Div");
        let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton--orange");
        sBoutonAnnuler.addEventListener("click",DOMManipulator.annulerRechercheMarquepage);

        sectionRecherche.appendChild (sTitreLivreTextBox);
        sectionRecherche.appendChild (sAuteurLivreTextBox);
        sectionRecherche.appendChild (sBoutonRechercher);
        sectionRecherche.appendChild (sDiv);
        sectionRecherche.appendChild (sBoutonAnnuler);

        sectionNouveauLivre.insertBefore(sectionRecherche,strHR);

        document.getElementsByName("ajoutLivre")[0].style.display ='none';
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
        return labelTitreLivre;

    }

    static generateButton(id,sLabel,sClassName)
    {
        let boutonLivreParag = document.createElement("div");
        let boutonLivre = document.createElement("button");
        boutonLivre.textContent=sLabel;
        boutonLivre.name=id;
        boutonLivre.classList.add(sClassName);
        boutonLivreParag.appendChild(boutonLivre);
        return boutonLivre;
    }

     
    static affichageResultats (listBooks)
    {
        /* 
        la section qui contiendra les résultats
        la section qui contiendra l'ajout des bookmark (marquage) en même temps
        */

        let sectionNouveauLivre = document.getElementById("myBooks");
        let strContent = document.getElementById("content");

        let sectionResultatEtFavoris = document.createElement("section");
        sectionResultatEtFavoris.className = "clsSectionResultatEtLbl";
        sectionResultatEtFavoris.setAttribute("name","sectionResultatEtLblName");

        let divResultatRecherche = document.createElement("div");
        let lblResultatRecherche = document.createElement("h2");
        lblResultatRecherche.innerHTML += "Résultat de recherche";
        lblResultatRecherche.className = "clsLblResultatRecherche";
        
        let sectionResultat = document.createElement("section");
        sectionResultat.className = "clsSectionResultat";
        divResultatRecherche.appendChild (lblResultatRecherche);

        sectionResultatEtFavoris.appendChild (divResultatRecherche);
        sectionResultatEtFavoris.appendChild (sectionResultat);
 
        if (listBooks.length > 0)
        {
            console.log ("Nombrede res:"+listBooks.length);
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
        //Vider la session
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