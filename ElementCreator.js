class ElementCreator
{

    constructor ()
    {}
    
    createTextBox(id,sLabel,valueDefault)
    {

        let divFormat = document.createElement("div");

        let labelTitreLivre = document.createElement("label");
        labelTitreLivre.setAttribute ("value", sLabel);
        labelTitreLivre.setAttribute ("for", id);
        labelTitreLivre.innerHTML += sLabel; 
       
        let titreLivre = document.createElement("INPUT");
        titreLivre.setAttribute ("type", "text");
        titreLivre.setAttribute ("name",id);
        titreLivre.setAttribute ("id",id);
        if (valueDefault) {titreLivre.setAttribute ("value",valueDefault);};
        titreLivre.setAttribute ("class","clsInput");

        divFormat.appendChild (labelTitreLivre);
        divFormat.appendChild (titreLivre);
        return divFormat;

    
    }
    

    generateButton(id,sLabel,sClassName)
    {
        let boutonLivreParag = document.createElement("div");
        let boutonLivre = document.createElement("button");
        boutonLivre.textContent=sLabel;
        boutonLivre.name=id;
        boutonLivre.classList.add(sClassName);
        boutonLivreParag.appendChild(boutonLivre);
        return boutonLivre;
    }


    createSection (sName,sClassName) {
        let theSection = document.createElement("section");
        theSection.setAttribute("name",sName);
        theSection.classList.add(sClassName);
        return theSection;
    }

    createElementGen (sType,sName,sClassName,sText, sId)
    {
        let theElement = document.createElement(sType);
        if (sName) {theElement.setAttribute("name",sName);};
        if (sClassName) {theElement.classList.add(sClassName);};
        if (sText){theElement.innerHTML += sText;};
        if (sId){theElement.setAttribute ("id",sId);};
        return theElement;
    }
}