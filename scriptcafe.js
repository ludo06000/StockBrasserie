// Création de la class Boisson//
class Boisson {
    constructor (select, name, quantite, paht, pvht){
    this.select=select,
    this.name=name;
    this.quantite=quantite;
    this.paht=paht;
    this.pvht=pvht;
    }
}
// création de l'extension de la Classe Boisson par la Classe Alcolisée
class Alcolisee extends Boisson {
    constructor (select, name, quantite, paht, pvht, degres){
        super(select, name, quantite, paht, pvht);
        this.degres=degres
    }
}

// récupération du DOM //
let validButton = document.querySelector(".validButton");
let form = document.querySelector("#formContain");
let choixBoisson =  document.querySelector("#choixBoisson");
let allItemForm = document.querySelector(".allItemForm");
// création du visuel de la liste en tableau sur HTML //
let boissonListItem = document.querySelector(".boissonListItem")
// création du tableau DrinkARRAY //
let drinkArray

//recupration du localStorage
drinkArray = JSON.parse(localStorage.getItem("@saveDrink"));


//Création du IF selon si le local storage est vide ou plein lors de l'Ouverture du Navigateur
if (drinkArray){
    showItem();
}else{
    drinkArray = [];
}

/*
var valueChoix = choixBoisson.options[choixBoisson.selectedIndex].value;
let degresDrink = document.getElementByClassName("degresDrink");
console.log(valueChoix);

// Si les choix Sans Alcool et Autres sont choisi cela grise la case degres.

choixBoisson.addEventListener("change", function(){
    if(valueChoix != "bAChoice"){
        degresDrink.disabled = true;
    }
})
*/

// action sur le boutton valider du form //
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("click")





// recupération des données du form saisie dans les inputs //
    let data = new FormData(form);

// création de l'objet avec les conditions //
    let drinkItem 
   
    if (data.get("choixBoisson") == "bAChoice"){



        drinkItem = new Alcolisee(
            data.get("choixBoisson"),
            data.get("nameDrink"),
            data.get("qTeDrink"),
            data.get("pahtDrink"),
            data.get("pvhtDrink"),
            data.get("degresDrink"), 
                  
        )
    }else if(data.get("choixBoisson") == "bNaChoice"){
            
        drinkItem = new Boisson(
            data.get("choixBoisson"),
            data.get("nameDrink"),
            data.get("qTeDrink"),
            data.get("pahtDrink"),
            data.get("pvhtDrink"), 
            
        )
    }else {
        drinkItem = new Boisson(
            data.get("choixBoisson"),
            data.get("nameDrink"),
            data.get("qTeDrink"),
            data.get("pahtDrink"),
            data.get("pvhtDrink"), 
        )
    }
    
// pousser les data dans le tableau //
    drinkArray.push(drinkItem);

    saveLocal();

    showItem();

    form.reset(); //réinitialisation du formulaire

})
/* créer la fonction pour remonter les données dans le html
afin que ses dernière soit visible sur le web */
function showItem(){
    //Création de la liste Drink. Il faut mettre les double quote car on attend une string, sinon un undefind parrait sur le HTML au premier appel
    let drinkList = "";


    drinkArray.forEach((drink) =>{
    if (drink.select == "bAChoice"){
        drinkList +=
        `
        <tr>
            <td>${drink.name}</td>
            <td>${drink.degres}°</td>
            <td>${drink.paht}</td>
            <td>${drink.pvht}</td>
            <td>${(drink.pvht*1.20).toFixed(2)}</td>
            <td>${(((drink.pvht-drink.paht) / (drink.paht))*100).toFixed(2)} %</td>
            <td class="colorAlert">${drink.quantite}</td>
            <td>
                 <button class="actualisButton" type="button">📂Actualiser</button>
                <button  class="deleteButton" type="button">🗑️Supprimer</button>
            </td>
        </tr>
        `


    
        }
    else if (drink.select == "bNAChoice"){
        drinkList +=
        `
        <tr>
            <td>${drink.name}</td>
            <td>0°</td>
            <td>${drink.paht}</td>
            <td>${drink.pvht}</td>
            <td>${(drink.pvht*1.20).toFixed(2)}</td>
            <td>${(((drink.pvht-drink.paht) / (drink.paht))*100).toFixed(2)} %</td>
            <td class="colorAlert">${drink.quantite}</td>
            <td>
                <button class="actualisButton" type="button">📂Actualiser</button>
                <button  class="deleteButton" type="button">🗑️Supprimer</button>
            </td>
        </tr>
        `
    }
    else{
        drinkList +=
        `
        <tr>
            <td>${drink.name}</td>
            <td>0°</td>
            <td>${drink.paht}</td>
            <td>${drink.pvht}</td>
            <td>${(drink.pvht*1.20).toFixed(2)}</td>
            <td>${(((drink.pvht-drink.paht) / (drink.paht))*100).toFixed(2)} %</td>
            <td class="colorAlert">${drink.quantite}</td>
            <td>
                <button class="actualisButton" type="button">📂Actualiser</button>
                <button  class="deleteButton" type="button">🗑️Supprimer</button>
            </td>
        </tr>
         `
    }

    //On envoit la liste dans le HTML
    boissonListItem.innerHTML = drinkList;


    /*Création du bouton Modifier / Actualisation.On clique sur actualiser, ce qui permet de renvoyer les éléments dans le form HTML.
    *On supprime ensuite également l'élément du tableau.
    *On sauvegarde sur le local.
    *Et la liste est mise à jour.
    */


    let actualisButton = document.querySelectorAll(".actualisButton");

    actualisButton.forEach((button,index) =>{

        button.addEventListener("click", function(){
           
                document.querySelector(".nameDrink").value = drink.name;
                document.querySelector(".pahtDrink").value = drink.paht;
                document.querySelector(".pvhtDrink").value = drink.pvht;
                document.querySelector(".qTeDrink").value = drink.quantite;
                document.querySelector(".degresDrink").value = drink.degres;
                drinkArray.splice(index,1)
                console.log(drinkArray)
                saveLocal()
                showItem()
           

    
        })
    })
    // Le bouton delette permet se supprimer un produit si et seulement si il a un niveau de stock à ZERO
    let buttonDelete = document.querySelectorAll(".deleteButton");

    buttonDelete.forEach((button, index) =>{
        button.addEventListener("click", function(){
                console.log("button delette OK")
                drinkArray.splice(index, 1);
                saveLocal();
                showItem();
            })
        })
    })   
}

//Création de la fonction Local storage
function saveLocal(){
    const saveDrink = JSON.stringify(drinkArray);
    localStorage.setItem("@saveDrink", saveDrink)
}


