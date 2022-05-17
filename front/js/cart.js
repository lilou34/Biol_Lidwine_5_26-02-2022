
let cartItems = document.getElementById("cart__items");
let para = document.getElementById("para");
let cartItem = document.getElementsByClassName("cart__item");
let containDivImg = document.getElementsByClassName("cart__item__img");

let basket =  JSON.parse(localStorage.getItem("articleSelect")); //récupère le produit selectionné 
console.table(basket);
displayProductBasket(basket);
/*let productSelect = {
    id: idProduct,
    price: article.price,
    nameSofa: article.name,
    quantity: quantity.value,
    color: color.value,
    image: article.imageUrl,
    altTxt: article.altTxt
  */
function displayProductBasket(basket){
    
    if (basket === null || basket == 0) {
        let para = document.createElement("p");
        para.className = "para",
        cartItem.appendChild(para);
        para.textContent = "votre panier est vide !!!";
        window.alert("panier vide");
    }else{
        console.log("mon panier ", basket);
        for(let articleSelect in basket){
            let  cartItem = document.createElement("article");
                cartItem.className = "cart__item";
                cartItem.setAttribute('data-id', basket[articleSelect].id);
                cartItem.setAttribute('data-color', basket[articleSelect].color);
                cartItems.appendChild(cartItem);
            let containDivImg = document.createElement("div");
                containDivImg.className = ("cart__item__img");
                cartItem.appendChild(containDivImg);
            let img = document.createElement("img");
                containDivImg.appendChild(img);
                img.src = basket[articleSelect].image;
                img.alt = basket[articleSelect].altTxt;
            let divContent = document.createElement("div");
                cartItems.appendChild(divContent);
                divContent.className = "cart__item__content";
            let divDescription = document.createElement("div");
                divContent.appendChild(divDescription);
                divDescription.className = "cart__item__content__description";
            let title = document.createElement("h2");
                divDescription.appendChild(title);
                title.textContent = basket[articleSelect].nameSofa;
            let color =  document.createElement("p");
                title.appendChild(color);
                color.textContent = basket[articleSelect].color;
            let price =  document.createElement("p");
                color.appendChild(price);
                price.textContent = basket[articleSelect].price + "€";
            let settings = document.createElement("div");
                cartItems.appendChild(settings);
                settings.className = "cart__item__content__settings";
            let divQuantity =  document.createElement("div");
                settings.appendChild(divQuantity);
                divQuantity.className = "cart__item__content__settings__quantity";
            let pQuantity =  document.createElement("p");
                settings.appendChild(pQuantity);
                pQuantity.textContent = `Qté : ${basket[articleSelect].quantity}`;
            let inputQte  =  document.createElement("input");
                divQuantity.appendChild(inputQte);
                inputQte.className =  "itemQuantity";
                inputQte.setAttribute("type", "number");
                inputQte.setAttribute("class", "itemQuantity");
                inputQte.setAttribute("name", "itemQuantity");
                inputQte.setAttribute("min", "1");
                inputQte.setAttribute("max", "100");
                inputQte.setAttribute("value", `${basket[articleSelect].quantity}`);
        }
    }
}





/*function changeQuantity(product, quantity){//incémenter et décrémenter qte
    let basket = getBasket();//on récupère le panier existant dans le LS 
    let foundProduct = basket.find(p => p.id == product.id);//vérifier que le produit n'est pas déjà dans le panier et si oui ajouter seulement la quantité
    if (foundProduct != undefined) { //si il existe déjà dans le panier
        foundProduct.quantity += quantity;//on ajoute
        if (foundProduct.quantity <= 0) {//est pluss petit ou égal 0
            removeFromBasket(foundProduct);//on enlève du panier
        } else {
            saveBasket(basket); //pour sauvegarder
        }
    }
}
changeQuantity(product, quantity);
function getNumberProduct() { // function qté totale de produit
    let basket = getBasket();//on récupère le panier existant dans le LS 
    let number = 0; //on fixe à zéro
    for(let product of basket){ // pour chaque produit du panier
        number += product.quantity; // récupère qté pour chaque produit dans le panier les aditionne
    }
    return number; //résultat total
}
getNumberProduct();

function getTotalPrice() {
    let basket = getBasket();//on récupère le panier existant dans le LS 
    let total = 0;//on fixe à zéro
    for (let product of basket) { // pour chaque produit du panier
        total += product.quantity * product.price; // récupère qté multiplie avec le prix pour chaque produit dans le panier les aditionne
    }
    return total; //résultat total
}
getTotalPrice();*/