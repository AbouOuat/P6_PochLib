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
        boutonAjoutLivre.addEventListener("click", DOMManipulator.insertFieldSearch.bind(null,"toto")); //On appelle DOMManipulator.insertFieldSearch variable = function
        sectionNouveauLivre.insertBefore(boutonAjoutLivre,strHR );
    }


    static insertFieldSearch (test)
    {
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0];

        //Section avec la zone de recherche
        let sectionRecherche = document.createElement("section");
        sectionRecherche.classList.add("clsSectionRecherche");
        sectionRecherche.setAttribute("name","sectionRechercheName");

        /* //Ajout des zones de texte    COMMENTAIRES A DECOMMENTER
        let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur");
        */
       
          //Ajout des zones de texte  .. A SUPPRIMER
        let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre","les misérables");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur","Hugo");


      /*    
        let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre","les ZSZDZDZ");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur","Hugo"); */
        


        //Ajout des boutons
        //Vendredi 17/02/2023
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton clsButton__rechercher2");
        
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton__rechercher2");
        let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");
        //sBoutonRechercher.classList.add("clsButtonrechercher");

        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton__rechercher2");
        //sBoutonRechercher.classList.add("clsButtonclsButtonrechercher");
        sBoutonRechercher.addEventListener("click", async function (){
            //Vide la session
            //sessionStorage.clear();

            //Vide le contenu des sections resultat et marquepage
            DOMManipulator.videSectionResultat(); 
            //DOMManipulator.videSectionMarquepage();

            //Lance la recherche
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
           DOMManipulator.affichageResultats(listBooks);
        });

        
        let sDiv  =  document.createElement("Div");
        //
        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton clsButton--orange");
        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton");
        
        //sBoutonAnnuler.classList.add("clsButton--orange");

        let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton--orange");
        sBoutonAnnuler.addEventListener("click",DOMManipulator.annulerRechercheMarquepage);


        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton--test1");

        sectionRecherche.appendChild (sTitreLivreTextBox);
        sectionRecherche.appendChild (sAuteurLivreTextBox);

        sectionRecherche.appendChild (sBoutonRechercher);
        sectionRecherche.appendChild (sDiv);
        sectionRecherche.appendChild (sBoutonAnnuler);

        sectionNouveauLivre.insertBefore(sectionRecherche,strHR);

        //On supprime le bouton sur lequel on a cliqué
        //event.target.parentNode.removeChild(event.target);
        //A modifier , on doit le cacher  (via CSS) ..et non le supprimer finalement
        //ajoutLivre
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
        //let boutonBr = document.createElement("br");
        let boutonLivre = document.createElement("button");
        boutonLivre.textContent=sLabel;
        boutonLivre.name=id;
        //boutonLivre.className=sClassName;
        boutonLivre.classList.add(sClassName);
        //boutonLivreParag.appendChild(boutonBr);    
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
        //sectionResultat.appendChild (divResultatRecherche);


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
        sectionNouveauLivre.insertBefore(sectionResultatEtFavoris,strContent);
   }



    static refreshMarquepage()
    {
        //Converire le session storage ne liste de lvre
        //passer à 
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
            console.log ("FROM MArquepage");
            console.log (listBooks);
            /* array.forEach( Book => {
                
            }); */
            
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
        console.log ("Suppression des donneées");
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