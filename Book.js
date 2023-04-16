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

    //si isMarquepage est renseigné alors icone "marquepage", sinon c'est "corbeille"
    static generateBlocLivre(theBook, isMarquepage)
    {
        var idBook= theBook.identifiant;
       
        let blocBook = document.createElement("div");
        blocBook.classList.add("clsBorderBook");
        blocBook.setAttribute ("name",idBook);
        blocBook.setAttribute ("id",idBook);

        //Titre et marque page dans un wrapper pour diviser
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

    
        //Eléments de livre
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
       

        //Les fonctions
        //Ajout Marquepage
        function ajoutSuppressionMarquepageTrash(isMarquepage,idBook)
        {
            console.log ("ajoutSuppressionMarquepageTrash " + idBook);
            console.log ("Marquepavalue:" + isMarquepage);

            if (isMarquepage == Book.staticMarquePage) {
                if (sessionStorage.getItem(idBook)!= null)
                {
                   Book.affichageMessage("Vous ne pouvez ajouter deux fois le même livre");
                } else
                {
                    sessionStorage.setItem(idBook,JSON.stringify(theBook));
                    //console.log (JSON.parse(sessionStorage.getItem(idBook)));
                    Book.affichageMarquepage(idBook);
                }
            }
            else {
                
                let theDoc = document.getElementsByName("sectionMarquepageName")[0];
                //theDoc.removeChild(theDoc.querySelector(`[name = ${idBook}]`)); provoque erreur lorque idBook commence par un chiffre
                theDoc.removeChild(theDoc.querySelector(`[name = ${CSS.escape(idBook)}]`));
                sessionStorage.removeItem(idBook);
 
            }
        }
        return blocBook;
    }


    static affichageMarquepage(theIdBook)
    {
        //Section pour afficher
        //console.log (JSON.parse(sessionStorage.getItem(theIdBook)));
        let sectionMarquepage;
        if (document.getElementsByName("sectionMarquepageName").length > 0)
        {
            sectionMarquepage = document.getElementsByName("sectionMarquepageName")[0];
        }
        else {
            sectionMarquepage = document.createElement("section");
            sectionMarquepage.className = "clsSectionResultat";
            sectionMarquepage.setAttribute("name","sectionMarquepageName");
            sectionMarquepage.setAttribute("id","sectionMarquepageName");
            let blsContent = document.getElementById("content");
            document.getElementById("myBooks").insertBefore (sectionMarquepage,blsContent.nextSibling);
        }
        let blockBookfavoris = Book.generateBlocLivre(JSON.parse(sessionStorage.getItem(theIdBook)),"");
                
        sectionMarquepage.appendChild(blockBookfavoris);
        
    }


    static affichageMessage (strMessage)
    {
        var lblMessage = document.createElement("div");
        lblMessage.setAttribute ("id","snackbar");
        lblMessage.innerHTML += strMessage;
        lblMessage.classList.add("show");
        document.getElementById("content").appendChild(lblMessage);
        setTimeout(function(){ lblMessage.className = lblMessage.className.replace("show", ""); }, 3000);
    }
}