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


         /* let sTitreLivreTextBox  = DOMManipulator.generateTextBox("titreLivre","Titre du livre","les ZSZDZDZ");
     
         let sAuteurLivreTextBox = DOMManipulator.generateTextBox("auteurLivre","Auteur","Hugo"); */
        


        //Ajout des boutons
        //Vendredi 17/02/2023
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton clsButton__rechercher2");
        
        let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton__rechercher2");
        //let sBoutonRechercher  = DOMManipulator.generateButton("btnRechercher","Rechercher","clsButton");
        sBoutonRechercher.classList.add("clsButtonrechercher");

        sBoutonRechercher.addEventListener("click", async function (){
            console.log ("Test");
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
        //boutonLivre.className=sClassName;
        boutonLivre.classList.add(sClassName);
            
        //console.log(boutonLivre);
        boutonLivreParag.appendChild(boutonLivre);

        return boutonLivre;
        //return boutonLivreParag;

    }

    static generateBloc(theBook)
    {
        var idBook= theBook.identifiant;
        //Création d'un bloc contenant tous les éléments ci-dessous
        let blocBook = document.createElement("div");
        blocBook.classList.add("clsBorderBook");
        

        //Pour Titre et marque page.. on prend un wrapper pour diviser
        let lblTitreMarquepage = document.createElement("div");
        lblTitreMarquepage.classList.add("wrapper");
        
        let lblTitre = document.createElement("div");
        lblTitre.innerHTML+="Titre : " + theBook.titre;
        lblTitre.classList.add("clsTitre");
                
        let btnMarquepage = document.createElement ("button");
        btnMarquepage.classList.add("clsButtonGeneral");
        let objMarquepage = document.createElement("i");
        objMarquepage.classList.add("fa-solid", "fa-bookmark");
        objMarquepage.classList.add("clsMarquepage");
        //objMarquepage.setAttribute ("Id","idMarquepage");
       
        
    
        //Création des éléments de livre
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
     
        /* let btnTrash = document.createElement ("button");
        let objTrash = document.createElement("i");
        objTrash.classList.add("fa-solid", "fa-trash"); */


        //Gestion des événements
        btnMarquepage.addEventListener("click", ajoutMarquepage);
        //btnTrash.addEventListener("click",suppressionLivre);

        //Présentation des éléments
        lblTitreMarquepage.appendChild (lblTitre);

        btnMarquepage.appendChild(objMarquepage);
        lblTitreMarquepage.appendChild(btnMarquepage);

               
        blocBook.appendChild(lblTitreMarquepage);
        blocBook.appendChild(lblIdentifiant);
        blocBook.appendChild(lblAuteur);
        blocBook.appendChild(lblDescription);
        blocBook.appendChild(objImage);
        //blocBook.appendChild(btnTrash);
        console.log(" Le bloc" );
        console.log(blocBook);


        //Les fonctions

        //Ajout Marquepage
        function ajoutMarquepage()
        {
            console.log ("ajoutMarquepage" + idBook);
            //Stockage dans une session
            sessionStorage.setItem(idBook,JSON.stringify(theBook));
            console.log (JSON.parse(sessionStorage.getItem(idBook)));
           // affichageMarquepage(idBook);

        }

        //Liste des marques
        /* function affichageMarquepage(theIdBook)
        {

        } */
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
        

        let sectionResultat = document.createElement("section");
        sectionResultat.className = "clsSectionResultat";

        if (listBooks.length > 0)
        {
            console.log ("Nombrede res:"+listBooks.length);
            //sectionResultat
            for (let i=0; i<listBooks.length; i++)
            {
                let theBook = DOMManipulator.generateBloc(listBooks[i]);
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