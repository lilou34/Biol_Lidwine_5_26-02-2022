let basket =  JSON.parse(localStorage.getItem("articleSelect"));//récupère le produit selectionné 
let cartItems = document.getElementById("cart__items");
let para = document.getElementById("p");
let cartItem = document.getElementsByClassName("cart__item");
let containDivImg = document.getElementsByClassName("cart__item__img");
let divDelete = document.getElementsByClassName("cart__item__content__settings__delete");
let pDelete = document.getElementsByClassName("deleteItem");
let inputQte = document.getElementsByClassName("itemQuantity");
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let prix = 0;
let quantity = 0;

displayProductBasket(basket);

async function displayProductBasket(basket){
    if (basket === null || basket == 0) {
        let para = document.createElement("p");
        para.className = "alerte",
        cartItems.append(para);
        para.textContent = "votre panier est vide !!!";
        window.alert("panier vide");
    }else{
        
        for(let articleSelect in basket){
            await fetch('http://localhost:3000/api/products/' + basket[articleSelect].id)
                .then((res) => res.json())
                .then((data) => (articleData = data))  
                .catch((error) => console.log(error));

            cartItem = document.createElement("article");
            cartItem.className = "cart__item";
            cartItem.setAttribute('data-id', articleData.id);
            cartItem.setAttribute('data-color', articleData.color);
            cartItems.appendChild(cartItem);

                containDivImg = document.createElement("div");
                containDivImg.className = ("cart__item__img");
                cartItem.appendChild(containDivImg);

                    let img = document.createElement("img");
                        containDivImg.appendChild(img);
                        img.src = articleData.imageUrl;
                        img.alt = articleData.altTxt;

                let divContent = document.createElement("div");
                    cartItem.appendChild(divContent);
                    divContent.className = "cart__item__content";

                    let divDescription = document.createElement("div");
                        divContent.appendChild(divDescription);
                        divDescription.className = "cart__item__content__description";

                        let title = document.createElement("h2");
                            divDescription.appendChild(title);
                            title.textContent = articleData.name;

                        let color =  document.createElement("p");
                            divDescription.appendChild(color);
                            color.textContent = basket[articleSelect].color;
  
                    let settings = document.createElement("div");
                        divContent.appendChild(settings);
                        settings.className = "cart__item__content__settings";

                        let divQuantity =  document.createElement("div");
                            settings.appendChild(divQuantity);
                            divQuantity.className = "cart__item__content__settings__quantity";

                            let pQuantity =  document.createElement("p");
                                divQuantity.appendChild(pQuantity);
                                pQuantity.textContent = `Qté : `;

                            let inputQte  =  document.createElement("input");
                                divQuantity.appendChild(inputQte);
                                inputQte.className =  "itemQuantity";
                                inputQte.setAttribute("type", "number");
                                inputQte.setAttribute("class", "itemQuantity");
                                inputQte.setAttribute("name", "itemQuantity");
                                inputQte.setAttribute("min", "0");
                                inputQte.setAttribute("max", "100");
                                inputQte.setAttribute("step", "1");
                                inputQte.setAttribute("value", `${basket[articleSelect].quantity}`);

                                inputQte.addEventListener("input", (event) => {
                                    quant = event.target.value;
                                    console.log(quant);
                                    if(inputQte.value > 0 && inputQte.value < 101 && inputQte.value%1 == 0){
                                        inputQte.value = quant;
                                        basket[articleSelect].quantity = Number(quant);
                                        localStorage.setItem("articleSelect", JSON.stringify(basket));
                                        basket =  JSON.parse(localStorage.getItem("articleSelect"))
                                        prix = basket[articleSelect].quantity * articleData.price;
                                        price.textContent = prix + "€";
                                    }else{
                                        inputQte.value = basket[articleSelect].quantity;
                                    }
                                });
                                
                                let price =  document.createElement("p");
                                    divDescription.appendChild(price);
                                    let prix = basket[articleSelect].quantity * articleData.price;
                                    price.textContent = prix + "€";

                        divDelete =  document.createElement("div");
                        settings.appendChild(divDelete);
                        divDelete.className = "cart__item__content__settings__delete";

                            let pDelete =  document.createElement("p");
                                divDelete.appendChild(pDelete);
                                pDelete.className = "deleteItem";
                                pDelete.textContent = "Supprimer";

                                pDelete.addEventListener("click", (article) => {
                                    basket = localStorage.removeItem(article);
                                });
        }
    }
}



/*function changeQuantity(quantity){//incémenter et décrémenter qte
    basket;//on récupère le panier existant dans le LS 
    let foundProduct = basket.find(p => p.id == articleData.id);//vérifier que le produit n'est pas déjà dans le panier et si oui ajouter seulement la quantité
    if (foundProduct != undefined) { //si il existe déjà dans le panier
        foundProduct.quantity += quantity;//on ajoute
        if (foundProduct.quantity <= 0) {//est pluss petit ou égal 0
            removeFromBasket(foundProduct);//on enlève du panier
        } else {
            saveBasket(basket); //pour sauvegarder
            location.reload(); //rafraichir la page
            basket =  JSON.parse(localStorage.getItem("articleSelect"))//récupérer les article dans le panier
             
        }
    }
}
*/
/*function saveBasket(basket) {//on crée un panier
    localStorage.setItem("basket", JSON.stringify(basket)); // avec JSON stringify l'objet est transfomé en JSON chainede caractère (language du LS) enregistre un panier sur le localStorage
}
*/

function removeFromBasket(product) {//prendre le panier complet et supprimer un produit grace à son id
    
    let basket = basket;//on récupère le panier existant dans le LS
    basket = basket.filter(p => p.id != product.id);//retirer un élément dont l'id est différent de celui que l'on va passer en paramètre
    saveBasket(basket); //pour sauvegarder
    
}


function getNumberProduct() { // function qté totale de produit
    let number = 0; //on fixe à zéro
    for(let articleSelect of basket){ // pour chaque produit du panier
        number += JSON.parse(articleSelect.quantity); // récupère qté pour chaque produit dans le panier les aditionne
    }
    return number; //résultat total 
}
console.log("mon panier est ", basket);
console.log("le nombre de produits est ", getNumberProduct());

function getTotalPrice() {
    let basket = getBasket();//on récupère le panier existant dans le LS 
    let total = 0;//on fixe à zéro
    for (let product of basket) { // pour chaque produit du panier
        total += product.quantity * product.price; // récupère qté multiplie avec le prix pour chaque produit dans le panier les aditionne
    }
    return total; //résultat total
}
function addLS(basket){
    //getBasket();
    
    changeQuantity(quantity);
    saveBasket(basket);
    
    getTotalPrice();
}


//addLS(basket);