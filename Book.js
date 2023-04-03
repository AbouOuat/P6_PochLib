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

    //si isMarquepage est renseigné alors on ajoute icone "marquepage", sinon c'est "corbeille"
    static generateBlocLivre(theBook, isMarquepage)
    {
        var idBook= theBook.identifiant;
        //Création d'un bloc contenant tous les éléments ci-dessous
        let blocBook = document.createElement("div");
        blocBook.classList.add("clsBorderBook");
        
        // on ajoute un nom pour après pouvoir le supprimer
        blocBook.setAttribute ("name",idBook);

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
        //btnMarquepageTrash.addEventListener("click", ajoutSuppressionMarquepageTrash);
        btnMarquepageTrash.addEventListener("click", function ()
        {
            //Marquepage
            /* if (isMarquepage == Book.staticMarquePage)
            { */
                ajoutSuppressionMarquepageTrash(isMarquepage,idBook);
             /*    //Si c'est déjà ajouté, on ajoute un texte ?

            } else{  //Corbeille

            } */


        }
        );
        //btnTrash.addEventListener("click",suppressionLivre);

        //Présentation des éléments


        btnMarquepageTrash.appendChild(objMarquepageTrash);

        lblTitreMarquepage.appendChild (lblTitre);
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
        function ajoutSuppressionMarquepageTrash(isMarquepage,idBook)
        {
            console.log ("ajoutSuppressionMarquepageTrash " + idBook);
            console.log ("Marquepavalue:" + isMarquepage);

            if (isMarquepage == Book.staticMarquePage) {
                console.log ("Marquepavalue IN:" + isMarquepage);
                // Si ajout marquepage, 
                //alors on check si ça existe, si oui alors on affiche msg..
               
                sessionStorage.getItem(idBook)?console.log ("Déja ajoute"): console.log ("Non ajouté");
                //sessionStorage.getItem(idBook)?Book.affichageMessage("Vous ne pouvez ajouter deux fois le même livre"):"";
                
                if (sessionStorage.getItem(idBook)!= null)
                {
                    console.log ("Dans déja ajouté");
                    Book.affichageMessage("Vous ne pouvez ajouter deux fois le même livre");
                } else
                {
                    console.log ("Dans Pas encore ajouté");
                    //Si ça existe pas alors on ajoute
                    //Stockage dans une session
                    sessionStorage.setItem(idBook,JSON.stringify(theBook));
                    console.log (JSON.parse(sessionStorage.getItem(idBook)));
                    affichageMarquepage(idBook);
                }
            }
            else {
                console.log ("on supprime :" + isMarquepage + " id de :  " + idBook);
                sessionStorage.removeItem(idBook);
                document.getElementsByName("sectionMarquepageName")[0].removeChild(document.getElementsByName(idBook)[1]);
                //document.getElementsByName(idBook)[1].innerHTML="";
                console.log ("Suppression faite");                
            }

           //Si suppression trask, alors on supprime


        }

        //Liste des marques
        function affichageMarquepage(theIdBook)
        {
            //Creation de section pour afficher
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
                sectionMarquepage.setAttribute("name","sectionMarquepageName");
                let blsContent = document.getElementById("content");
                blsContent.appendChild (sectionMarquepage);
            }
            

        
            let blockBookfavoris = Book.generateBlocLivre(JSON.parse(sessionStorage.getItem(theIdBook)),"");
      
            
            //blsContent.appendChild (blockBookfavoris);


         
            sectionMarquepage.appendChild(blockBookfavoris);
           
        }


       
        return blocBook;
    }

    static affichageMessage (strMessage)
    {
        var lblMessage = document.createElement("div");
        lblMessage.setAttribute ("id","snackbar");
        lblMessage.innerHTML += strMessage;
        lblMessage.classList.add("show");
        document.getElementById("content").appendChild(lblMessage);
        console.log(strMessage);
        console.log(" le mesage " + strMessage);
        setTimeout(function(){ lblMessage.className = lblMessage.className.replace("show", ""); }, 3000);
        console.log (" Après le mesdsage");

       /*  { <div id="snackbar">Some text some message..</div>
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000); } */

    }
}