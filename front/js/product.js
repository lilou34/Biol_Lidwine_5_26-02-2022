// récupération id
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
let article = {};

//selectors
let containImg = document.querySelector(".item__img");
let containTitle = document.querySelector("#title");
let containPrice = document.querySelector("#price");
let quantity = document.querySelector("#quantity");
let containDescription = document.querySelector("#description");
let productColor = document.querySelector("#colors");

//fetch permet de récupérer les infos un seul produit
async function fetchArticle(){
    await fetch('http://localhost:3000/api/products/' + idProduct)
    .then((response) => response.json())
    .then((data) => {getOneProduct(data)
        console.log(data);
    })
        .catch((error) => console.log(error));
}
fetchArticle();

//dispatch des infos du produit 
async function getOneProduct(product){ 
    article = product;
    document.title= article.name;
    let img = document.createElement("img");
    containImg.appendChild(img);
    img.setAttribute("src", article.imageUrl);
    img.setAttribute("alt", article.altTxt);
    containTitle.textContent = article.name;
    containPrice.innerText = article.price;

    // le prix change selon la qte
    quantity.addEventListener("change", () => {
        containPrice.innerText = article.price * quantity.value;
    });
    containDescription.innerText = article.description;
    
    //boucle pour créer dans la liste déroulante les couleurs récupérées pour chaque article
    for (let color of article.colors) {
        const optionColor = document.createElement("option");
        optionColor.setAttribute("value", color);
        optionColor.textContent = color;
        productColor.appendChild(optionColor);
      }
};

//ecoute du bouton ajout panier
let btnCart = document.querySelector("#addToCart");
btnCart.addEventListener("click", () => {   
    //création object article selectionné si les conditions sont ok
    let articleSelect = {
        id: idProduct,
        quantity: quantity.value,
        color: productColor.value,
        name: article.name,
    };
    verifyInput(articleSelect);
});

/**
   vérification que la couleur et la quantité sont correctement selectionné 
   si ok ajout local storage et 
   redirection du bouton sur le panier
*/
function verifyInput(articleSelect){

    //si aucune couleur choisie tableau vide alert
    if (productColor.value == []){
        alert("merci de choisir une couleur");

    //vérification que la qty est en accord avec les conditions avec message de confirmation
    }else if((quantity.value > 0 && quantity.value < 101) && (quantity.value%1 == 0)){
        console.log("c'est ok", articleSelect);
        window.confirm(`Votre commande de ${quantity.value} ${article.name} canapé ${productColor.value} est ajoutée au panier Pour consulter votre panier, cliquez sur OK`);

        //renvoi à la function addLS pour stocker le produit commandé et ouvre la page cart
        addLS(articleSelect);
        window.location.assign("cart.html");
    }else{
        //message alert
        alert("merci de saisir une quantité qui est un nombre entier positif et compris en 1 et 100");
    }
}

/** 
    
    function addLocalStorage(articleSelect){JSON.parse
    je transforme en objet JSON les données enregistrées
    je vérifie que si l'article de m^me déclinaison est déjà présent dans le LS on ajoute juste la quantité
    JSON.parse convertit js en json
    JSON.stringify récupère le json et le transforme en string js
*/
function addLS(articleSelect){
    let basket = JSON.parse(localStorage.getItem("articleSelect"));
    
    //si le panier est vide on crée un tableau avec l'article et on l'envoie au LS
    if(basket == null){
        basket = [];

        //envoi dans le tableau le produit avec les infos définies
        basket.push(articleSelect);
        localStorage.setItem("articleSelect", JSON.stringify(basket));
    }else{

        //on cherche .find dans le tableau si une entrée a déjà la même déclinaison
        let getArticle = basket.find((product) => product.id == articleSelect.id && product.color == articleSelect.color);

        //si article déjà présent on ajoute seulement la qté
        if (getArticle) {
            getArticle.quantity = Number(articleSelect.quantity) + Number(getArticle.quantity);
            localStorage.setItem("articleSelect", JSON.stringify(basket));
            
        //sinon j'ajoute l'article au panier
        } else {
            basket.push(articleSelect);
            localStorage.setItem("articleSelect", JSON.stringify(basket));
        }
    }
}