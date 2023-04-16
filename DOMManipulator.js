import {ElementCreator} from './ElementCreator.js';
class DOMManipulator
{
    static elementCreator = new ElementCreator();
    constructor ()
    { }
    
    static addAddButton()
    {
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0];

        //let elementCreator = new ElementCreator();

        /* let boutonAjoutLivre = document.createElement("button");
        boutonAjoutLivre.textContent="Ajouter un livre";
        boutonAjoutLivre.name="ajoutLivre";
        boutonAjoutLivre.classList.add("clsButton"); */
        let boutonAjoutLivre = this.elementCreator.generateButton("ajoutLivre","Ajouter un livre","clsButton");
        boutonAjoutLivre.addEventListener("click", DOMManipulator.insertFieldSearch.bind(null,"toto")); 
        sectionNouveauLivre.insertBefore(boutonAjoutLivre,strHR );
    }


    static insertFieldSearch (test)
    {
        let sectionNouveauLivre = document.getElementById("myBooks");
        let strHR = document.getElementsByTagName("hr")[0];
        
        //let elementCreator = new ElementCreator();

        //Section recherche
        let sectionRecherche = this.elementCreator.createSection("sectionRechercheName","clsSectionRecherche");
        /* document.createElement("section");
        sectionRecherche.classList.add("clsSectionRecherche");
        sectionRecherche.setAttribute("name","sectionRechercheName"); */

       
       
        //zones de texte
        /* let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre");
        let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur"); */
        
        
          //Ajout des zones de texte  .. A SUPPRIMER
        //let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre","les misérables");
        //let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur","Hugo");
        
        let sTitreLivreTextBox = this.elementCreator.createTextBox ("titreLivre","Titre du livre","les misérables");
        let sAuteurLivreTextBox = this.elementCreator.createTextBox("auteurLivre","Auteur","Hugo");

        //let sTitreLivreTextBox = createTextBox ("titreLivre","Titre du livre","les misérables");


    
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");
        let sBoutonRechercher  = this.elementCreator.generateButton("btnRechercher","Rechercher","clsButton");
        sBoutonRechercher.addEventListener("click", async function ()
        {
            //session
            //sessionStorage.clear();

            //sections resultat et marquepage
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

        
        let sDiv  =  document.createElement("Div");
        //let sBoutonAnnuler = DOMManipulator.generateButton("btnAnnuler","Annuler","clsButton--orange");
        let sBoutonAnnuler = this.elementCreator.generateButton("btnAnnuler","Annuler","clsButton--orange");
        sBoutonAnnuler.addEventListener("click",DOMManipulator.annulerRechercheMarquepage);

        sectionRecherche.appendChild (sTitreLivreTextBox);
        sectionRecherche.appendChild (sAuteurLivreTextBox);
        sectionRecherche.appendChild (sBoutonRechercher);
        sectionRecherche.appendChild (sDiv);
        sectionRecherche.appendChild (sBoutonAnnuler);

        sectionNouveauLivre.insertBefore(sectionRecherche,strHR);

        document.getElementsByName("ajoutLivre")[0].style.display ='none';
    }
  

    /* static generateTextBox(id,sLabel,valueDefault)
    {
        let labelTitreLivre = document.createElement("p");
        labelTitreLivre.innerText = sLabel;
        
        let boutonBr = document.createElement("br");
        let divFormat = document.createElement("div");
        
        //Faire function
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

    } */

    /* //A mettre dans lemen creator
    static generateButton(id,sLabel,sClassName)
    {
        let boutonLivreParag = document.createElement("div");
        let boutonLivre = document.createElement("button");
        boutonLivre.textContent=sLabel;
        boutonLivre.name=id;
        boutonLivre.classList.add(sClassName);
        boutonLivreParag.appendChild(boutonLivre);
        return boutonLivre;
    } */

     
    static affichageResultats (listBooks)
    {
        /* 
        la section qui contiendra les résultats
        la section qui contiendra l'ajout des bookmark (marquage) en même temps
        */

        //let elementCreator = new ElementCreator();

        let sectionNouveauLivre = document.getElementById("myBooks");
        let strContent = document.getElementById("content");

        /* let sectionResultatEtFavoris = document.createElement("section");
        sectionResultatEtFavoris.className = "clsSectionResultatEtLbl";
        sectionResultatEtFavoris.setAttribute("name","sectionResultatEtLblName"); */

        let sectionResultatEtFavoris = this.elementCreator.createSection("sectionResultatEtLblName","clsSectionResultatEtLbl");
        /* sectionResultatEtFavoris.className = "clsSectionResultatEtLbl";
        sectionResultatEtFavoris.setAttribute("name","sectionResultatEtLblName");
 */
        let divResultatRecherche = document.createElement("div");

        let lblResultatRecherche = this.elementCreator.createElementGen("h2","clsLblResultatRecherche","Résultat de recherche");
        /* let lblResultatRecherche = document.createElement("h2");
        lblResultatRecherche.innerHTML += "Résultat de recherche";
        lblResultatRecherche.className = "clsLblResultatRecherche"; */
        
        //let sectionResultat = document.createElement("section");
        //sectionResultat.className = "clsSectionResultat";
        let sectionResultat = this.elementCreator.createSection("clsSectionResultatName","clsSectionResultat");
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

export {DOMManipulator};