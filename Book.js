class Book
{
    static staticMarquePage = "marquePage";
    static staticTrash = "corbeille";
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

    static generateBlocLivre(theBook, isMarquepage)
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
        
        let btnMarquepageTrash;
        let objMarquepageTrash;
        if (isMarquepage=="marquePage"){
            btnMarquepageTrash = document.createElement ("button");
            btnMarquepageTrash.classList.add("clsButtonGeneral");
            objMarquepageTrash = document.createElement("i");
            objMarquepageTrash.classList.add("fa-solid", "fa-bookmark");
            objMarquepageTrash.classList.add("clsMarquepage");
            //objMarquepageTrash.setAttribute ("Id","idMarquepage");
        } else{
            btnMarquepageTrash = document.createElement ("button");
            btnMarquepageTrash.classList.add("clsButtonGeneral");
            objMarquepageTrash = document.createElement("i");
            objMarquepageTrash.classList.add("fa-solid", "fa-trash");
            objMarquepageTrash.classList.add("clsMarquepage");
        }
        
    
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
        //btnMarquepageTrash.addEventListener("click", ajoutMarquepageTrash);
        btnMarquepageTrash.addEventListener("click", function ()
        {
            if (isMarquepage == Book.staticMarquePage)
            ajoutMarquepageTrash(isMarquepage);
        }
        );
        //btnTrash.addEventListener("click",suppressionLivre);

        //Présentation des éléments
        lblTitreMarquepage.appendChild (lblTitre);

        btnMarquepageTrash.appendChild(objMarquepageTrash);
        lblTitreMarquepage.appendChild(btnMarquepageTrash);

               
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
        function ajoutMarquepageTrash(isMarquepage)
        {
            console.log ("ajoutMarquepageTrash " + idBook);
            console.log ("Marquepavalue:" + isMarquepage);
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

            let sectionMarquepage;
            if (document.getElementsByName("sectionMarquepageName").length > 0)
            {
                console.log (" Dans la sacrion: " + document.getElementsByName("sectionMarquepageName").length);
                sectionMarquepage = document.getElementsByName("sectionMarquepageName")[0];
            }
            else {
                sectionMarquepage = document.createElement("section");
                sectionMarquepage.className = "clsSectionResultat";
                console.log (" Dans la sacrion AAAA"); 
                sectionMarquepage.setAttribute("name","sectionMarquepageName");
                console.log (" Dans la sacrion AAAA B"); 

                let blsContent = document.getElementById("content");
                blsContent.appendChild (sectionMarquepage);
                

            }
            

            //Copie vers ligne en dessous (MaPoche List)
            /* const div1 = document.getElementById("div1");
            const div1Paras = div1.getElementsByTagName("p"); */
            
            /* let blsContent = document.getElementById("content");
            let blsPochList = blsContent.getElementsByTagName("h2"); */
            let blockBookfavoris = Book.generateBlocLivre(JSON.parse(sessionStorage.getItem(theIdBook)),"");
            //console.log(" Nb Element: "+ blsPochList.length);
            
            //blsContent.appendChild (blockBookfavoris);


            console.log ("Avant A");
            sectionMarquepage.appendChild(blockBookfavoris);
            console.log ("Avant B");
            //blsPochList.appendChild
            //Remplacement du bouton marque page par bouton supprimer
        }

        /* function isSectionMarquepage ()
        {
            let blsContent = document.getElementById("content");
            let blsPochList = blsContent.getElementsByTagName("h2");
            let sectionMarquepage;
            if (document.getElementsByName("sectionMarquepageName"))
            {
                    console.log (" Dans la sacrion");
            } else {console.log (" Dans la sacrion AAAA"); }

        } */
        return blocBook;
    }
}