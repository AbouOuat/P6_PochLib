class Book
{
    constructor(googleResponseItem)
    {
        this.identifiant = googleResponseItem.id;
        this.titre = googleResponseItem.volumeInfo.title;
        this.auteur =googleResponseItem.volumeInfo?.authors?.[0];
        this.description = googleResponseItem.searchInfo?.textSnippet;
        this.image = googleResponseItem.volumeInfo?.imageLinks?.thumbnail;

        //Affiche et Local Storage
        //Création livre à partir du DOMManiplator
        //grid en css..

        /* console.log ("---");
        console.log (this);  //Objet JAvaScript
        console.log (googleResponseItem); // Objet JAvascript de la reponse
        console.log (JSON.stringify(this));  //JSON
        console.log ("---"); */

        //Stockage dans une session
        /* sessionStorage.setItem(this.identifiant,JSON.stringify(this));
        console.log (JSON.parse(sessionStorage.getItem(this.identifiant))); */

        //console.log ("Affichage de la session");

        /* console.log (sessionStorage.getItem(googleResponseItem.id));
        console.log ("AAA");
        console.log (sessionStorage.getItem(googleResponseItem.id).identifiant);
        console.log ("Fin affichage de la session A");
        */   
    }  

    static generateBlocLivre(theBook)
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

        let lblImage = document.createElement("div");
        lblImage.classList.add("clsImageContent");
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

               
        lblImage.appendChild (objImage);

        blocBook.appendChild(lblTitreMarquepage);
        blocBook.appendChild(lblIdentifiant);
        blocBook.appendChild(lblAuteur);
        blocBook.appendChild(lblDescription);
        blocBook.appendChild(lblImage);
        //blocBook.appendChild(btnTrash);
        console.log(" Le bloc" );
        console.log(blocBook);


        //Les fonctions

        //Ajout Marquepage
        function ajoutMarquepage()
        {
            console.log ("ajoutMarquepage " + idBook);
            //Stockage dans une session
            sessionStorage.setItem(idBook,JSON.stringify(theBook));
            console.log (JSON.parse(sessionStorage.getItem(idBook)));
           affichageMarquepage(idBook);

        }

        //Liste des marques
        function affichageMarquepage(theIdBook)
        {
            //Reconstituion de l'objet
            console.log("affichageMarquepage");
            console.log (JSON.parse(sessionStorage.getItem(theIdBook)));


            //Copie vers ligne en dessous (MaPoche List)
            /* const div1 = document.getElementById("div1");
        const div1Paras = div1.getElementsByTagName("p"); */
        let blsContent = document.getElementById("content");
        let blsPochList = blsContent.getElementsByTagName("h2");
        let blockBookfavoris = generateBloc(JSON.parse(sessionStorage.getItem(theIdBook)));

            blsPochList.appendChild (blockBookfavoris);
            //Remplacement du bouton marque page par bouton supprimer
        }
        return blocBook;
    }
}