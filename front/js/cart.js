let basket =  JSON.parse(localStorage.getItem("articleSelect"));//récupère les articles du LS

//tri de l'affichage des produits par ordre alphabétique
basket.sort(function(a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
      // names must be equal
  return 0;
    });

    console.table(basket);

let cartItems = document.querySelector("#cart__items");
let para = document.getElementById("p");

let containDivImg = document.getElementsByClassName("cart__item__img");
let divDelete = document.getElementsByClassName("cart__item__content__settings__delete");
let pDelete = document.getElementsByClassName("deleteItem");
let inputQte = document.getElementsByClassName("itemQuantity");

displayProductBasket(basket);

async function displayProductBasket(basket){
    //panier vide alert
    
    let listElement = document.querySelector("#cart__items");
    if(listElement){
       await removeElementOfDom(listElement)
    };
    
    if (basket === null || basket == 0) {
        let para = document.createElement("p");
        para.className = "alerte",
        cartItems.append(para);
        //para.textContent = "votre panier est vide !!!";
       // window.alert("panier vide");
    }else{//boucle avec fetch pour récupérer image et détail selon d'id de l'article dans le LS
        for(let articleSelect in basket){
           
            await fetch('http://localhost:3000/api/products/' + basket[articleSelect].id)
                .then((res) => res.json())
                .then((data) => (articleData = data))  
                .catch((error) => console.log(error));

            //création article
            
            let cartItem = document.createElement("article");
            cartItem.className = "cart__item";
            
            cartItem.setAttribute('data-color', articleData.color);
            
            

                //image
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
                        //title
                        let title = document.createElement("h2");
                            divDescription.appendChild(title);
                            title.textContent = articleData.name;
                        //color
                        let color =  document.createElement("p");
                            divDescription.appendChild(color);
                            color.textContent = basket[articleSelect].color;
                    
                    let settings = document.createElement("div");
                        divContent.appendChild(settings);
                        settings.className = "cart__item__content__settings";
                        //quantity
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
                                //gestion du prix avec la qty de chaque article
                                let price =  document.createElement("p");
                                    divDescription.appendChild(price);
                                let prix = basket[articleSelect].quantity * articleData.price;
                                    price.textContent = prix + "€";

                                //article delete
                                divDelete =  document.createElement("div");
                                settings.appendChild(divDelete);
                                divDelete.className = "cart__item__content__settings__delete";
                                pDelete =  document.createElement("p");
                                divDelete.appendChild(pDelete);
                                pDelete.className = "deleteItem";
                                pDelete.textContent = "Supprimer";
                                pDelete.setAttribute('data-id', articleSelect);

            ({ basket, prix } = cart(inputQte, basket, articleSelect, prix, price));
            listElement.appendChild(cartItem); 
        }
    }
} 

async function removeElementOfDom(listElement){
    while(listElement.hasChildNodes()){
        listElement.removeChild(listElement.firstChild)
    }
}
function cart(inputQte, basket, articleSelect, prix, price) {
    changeInput();
    deleteItem();
    totalQty();
    //écoute click changement qty avec conditions si ok calcul prix
    function changeInput() {
        inputQte.addEventListener("change", (e) => {
            quant = e.target.value;

            if (inputQte.value > 0 && inputQte.value < 101 && inputQte.value % 1 == 0) {
                inputQte.value = quant;
                basket[articleSelect].quantity = Number(quant);
                localStorage.setItem("articleSelect", JSON.stringify(basket));
                basket = JSON.parse(localStorage.getItem("articleSelect"));
                prix = basket[articleSelect].quantity * articleData.price;
                price.textContent = prix + "€";
                //location.reload();
                totalQty();
            } else {
                inputQte.value = basket[articleSelect].quantity;
            }
        });
    };

    function deleteItem() {
        //boucle suppression de l'article à l'écoute du click
        pDelete.addEventListener("click", function (e) {
            //dans le dom
            const articleSelectId = this.getAttribute('data-id');
            console.log(articleSelect, basket, this.getAttribute('data-id'));
            const tempBasket = basket.filter((value, index) =>{return index != articleSelectId});
            console.log("notre nouveau basket est ", tempBasket);
            localStorage.removeItem(articleSelect);
            localStorage.setItem('articleSelect', JSON.stringify(tempBasket));
            displayProductBasket(JSON.parse(localStorage.getItem('articleSelect')));
        });
    };

    function totalQty() {
        let totalQuantity = document.getElementById("totalQuantity");
        let totalPrice = document.getElementById("totalPrice");
        let number = 0; //on fixe à zéro   
        let total = 0;
        for (let articleSelect of basket) {
            total += articleSelect.quantity * articleData.price;
            number += JSON.parse(articleSelect.quantity);
        }
        totalQuantity.textContent = number;
        totalPrice.innerText = total;
    };
    
    return { basket, prix };
}

let formulaire = document.getElementsByClassName("cart__order__form");
let firstname = document.getElementById("firstName").value;
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastname = document.getElementById("lastName").value;
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let address = document.getElementById("address").value;
let addressErrorMsg = document.getElementById("addressErrorMsg");
let email = document.getElementById("email").value;
let emailErrorMsg = document.getElementById("emailErrorMsg");
let city = document.getElementById("city").value;
let cityErrorMsg = document.getElementById("cityErrorMsg");
let submit = document.getElementById("order");

