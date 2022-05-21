// récupération id
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
let article = {};
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
    //création object produit selectionné
    let productSelect = {
        id: idProduct,
        quantity: quantity.value,
        color: productColor.value,
    };
    verifyInput(productSelect);
});

/**
   vérification que la couleur et la quantité sont correctement selectionné 
   si ok ajout local storage et 
   redirection du bouton sur le panier
*/
function verifyInput(productSelect){
    if (productColor.value == []){
        alert("merci de choisir une couleur");
    }else if((quantity.value > 0 && quantity.value < 101) && (quantity.value%1 == 0)){
        console.log("c'est ok", productSelect);
        window.confirm(`Votre commande de ${quantity.value} ${article.name} canapé ${productColor.value} est ajoutée au panier Pour consulter votre panier, cliquez sur OK`);
        //renvoi à la function LS pour stocker le produit commandé et ouvre la page cart
        addLS(productSelect);
        window.location.assign("cart.html");
    }else{
        alert("merci de saisir une quantité qui est un nombre entier positif et compris en 1 et 100");
    }
}

/** 
    récupération de l'objet et transformation en json
    function addLocalStorage(article){
    je transforme en objet JSON les données enregistrées
    je vérifie que si l'article de m^me déclinaison est déjà présent dans le LS on ajoute juste la quantité
*/
function addLS(productSelect){
    let sofa = JSON.parse(localStorage.getItem("articleSelect"));
    if(sofa == null){
        sofa = [];
        sofa.push(productSelect);
        localStorage.setItem("articleSelect", JSON.stringify(sofa));
    }else{
        let getArticle = sofa.find((product) => productSelect.id == product.id && productSelect.colors == productColor.value);
        if (getArticle) {
            getArticle.quantity = Number(productSelect.quantity) + Number(getArticle.quantity);
            localStorage.setItem("articleSelect", JSON.stringify(sofa));
        } else {
            sofa.push(productSelect);
            localStorage.setItem("articleSelect", JSON.stringify(sofa));
        }
    }
}