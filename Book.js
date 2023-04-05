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

    }  

    //si isMarquepage est renseigné alors on ajoute icone "marquepage", sinon c'est "corbeille"
    static generateBlocLivre(theBook, isMarquepage)
    {
        var idBook= theBook.identifiant;
       
        let blocBook = document.createElement("div");
        blocBook.classList.add("clsBorderBook");
        blocBook.setAttribute ("name",idBook);
        blocBook.setAttribute ("id",idBook);

        //Pour Titre et marque page.. on prend un wrapper pour diviser
        let lblTitreMarquepage = document.createElement("div");
        lblTitreMarquepage.classList.add("wrapper");
        
        let lblTitre = document.createElement("div");
        lblTitre.innerHTML+="Titre : " + theBook.titre;
        lblTitre.classList.add("clsTitre");
        
        let btnMarquepageTrash;
        let objMarquepageTrash;
        btnMarquepageTrash = document.createElement ("button");
        btnMarquepageTrash.classList.add("clsButtonGeneral");
        objMarquepageTrash = document.createElement("i");
        if (isMarquepage=="marquePage"){
           objMarquepageTrash.classList.add("fa-solid", "fa-bookmark");
                       
        } else{
            objMarquepageTrash.classList.add("fa-solid", "fa-trash");
        }
        objMarquepageTrash.classList.add("clsMarquepage");

    
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
     
    
        //Gestion des événements
        //btnMarquepageTrash.addEventListener("click", ajoutSuppressionMarquepageTrash);
        btnMarquepageTrash.addEventListener("click", function ()
            {ajoutSuppressionMarquepageTrash(isMarquepage,idBook);         
            }
        );
        
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
                                  
                sessionStorage.getItem(idBook)?console.log ("Déja ajoute"): console.log ("Non ajouté");
                //sessionStorage.getItem(idBook)?Book.affichageMessage("Vous ne pouvez ajouter deux fois le même livre"):"";
                
                if (sessionStorage.getItem(idBook)!= null)
                {
                   Book.affichageMessage("Vous ne pouvez ajouter deux fois le même livre");
                } else
                {
                     //Stockage dans une session . et afficahge
                    sessionStorage.setItem(idBook,JSON.stringify(theBook));
                    console.log (JSON.parse(sessionStorage.getItem(idBook)));
                    Book.affichageMarquepage(idBook);
                }
            }
            else {
                console.log ("on supprime :" + isMarquepage + " id de :  " + idBook);
                sessionStorage.removeItem(idBook);
                let theDoc = document.getElementsByName("sectionMarquepageName")[0];
                
                //Attention dans cette partie à la gestion de la valeur de retour entre Node et Element(HTML)..surtout pour 
                //document.getElementsByName("sectionMarquepageName")[0].removeChild(document.getElementsByName(idBook)[1]);
                //fonction document.getElementsByName(idBook)[1]  si on a 2 sections.. (parfois on en a 1 si on fait par exemple on click sur 
                //le bouton annuler, 
                //et on a 2 qd on est dans la recherche normale sans avoir fait annuler)
                //Si on a 1 section, on peut pas utiliser, du coup on doit se positionner sur la bonne section et rechercher l'élément souhaité
                //depuis la section
                //==> let theDoc = document.getElementsByName("sectionMarquepageName")[0];
                //==> theDoc.removeChild(theDoc.querySelector(`[name = ${idBook}]`));
                //au lieu de 
                //document.getElementsByName("sectionMarquepageName")[0].removeChild(document.getElementsByName(idBook)[1]);

                theDoc.removeChild(theDoc.querySelector(`[name = ${idBook}]`));
                
                //document.querySelector("div.user-panel.main input[name='login']");
                let docAA = document.querySelector(`[name = ${idBook}]`);
                let docBB = theDoc.querySelector(`[name = ${idBook}]`);

                //document.getElementById("myBooks").re

                console.log  ("AAAA document.getElementsByName");
                console.log (document.getElementsByName(`${idBook}`));
                //console.log (document.getElementsByName(`${idBook}`));
                console.log ("BBB");
                //console.log (theDoc.getElementsByName(`${idBook}`));
                //document.getElementsByName("sectionMarquepageName")[0].get
                console.log ("CCC");
                console.log (docAA);
                console.log ("DDDD");
                console.log (docBB);
                console.log ("EEE");
                //document.getElementsByName("sectionMarquepageName")[0]...
                //document.getElementsByName("sectionMarquepageName")[0].querySelector('[id="3AuREAAAQBAJ"]')
                //let docu = document.querySelector(name=idBook)

                
                console.log ("Suppression faite");                
            }
        }

        //Liste des marques
        //Book.affichageMarquepage(idBook);
        
        return blocBook;
    }


    static affichageMarquepage(theIdBook)
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
            sectionMarquepage.setAttribute("id","sectionMarquepageName");
            let blsContent = document.getElementById("content");
            //blsContent.appendChild (sectionMarquepage);
            document.getElementById("myBooks").insertBefore (sectionMarquepage,blsContent.nextSibling);
        }
        console.log ( "Valeur Id book");
        console.log (theIdBook);    
        let blockBookfavoris = Book.generateBlocLivre(JSON.parse(sessionStorage.getItem(theIdBook)),"");
                
        //blsContent.appendChild (blockBookfavoris);
        sectionMarquepage.appendChild(blockBookfavoris);
        
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
        console.log (" Après le messsage");
    }
}