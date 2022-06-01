//gestion des articles

//récupère les articles du LS
let basket =  JSON.parse(localStorage.getItem("articleSelect"));

//tri de l'affichage des produits par ordre alphabétique
  basket.sort(function(a, b) {
    // comparaisons ignore upper and lowercase
    const nameA = a.name.toUpperCase(); 
    const nameB = b.name.toUpperCase();
    //réorganise les produits par ordre alphabétique 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
      //si égalité reste à sa position
  return 0;
    });

//déclaration des selectors
let cartItems = document.querySelector("#cart__items");
let para = document.getElementById("p");
let containDivImg = document.getElementsByClassName("cart__item__img");
let divDelete = document.getElementsByClassName("cart__item__content__settings__delete");
let pDelete = document.getElementsByClassName("deleteItem");
let inputQte = document.getElementsByClassName("itemQuantity");

displayProductBasket(basket);

//création de l'article
async function displayProductBasket(basket){
    //appel du parent si delete il doit recréer les produits restants
    let listElement = document.querySelector("#cart__items");
    if(listElement){
       await removeElementOfDom(listElement)
    };

    //panier vide alert
    if (basket === null || basket == 0) {
        let para = document.createElement("p");
        para.className = "alerte",
        cartItems.append(para);
        para.textContent = "votre panier est vide !!!";
        window.alert("panier vide");
    }else{
        //boucle puis fetch pour détails selon d'id de l'article dans le LS
        for(let articleSelect in basket){
          
           //fetch récupèrer détails produits qui ne sont pas sur le LS
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

                //conteneur
                let divContent = document.createElement("div");
                    cartItem.appendChild(divContent);
                    divContent.className = "cart__item__content";

                    //description
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

                    //conteneur settings
                    let settings = document.createElement("div");
                        divContent.appendChild(settings);
                        settings.className = "cart__item__content__settings";

                        //quantity conteneur
                        let divQuantity =  document.createElement("div");
                            settings.appendChild(divQuantity);
                            divQuantity.className = "cart__item__content__settings__quantity";

                            //quantity
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

                                //price
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

            //appel des functions totaux et delete
            ({ basket, prix } = cart(inputQte, basket, articleSelect, prix, price));
            listElement.appendChild(cartItem); 
        }
    }
}; 


//enleve l'element du dom suite au deleteItem
async function removeElementOfDom(listElement){
    while(listElement.hasChildNodes()){
        listElement.removeChild(listElement.firstChild)
    }
};

//function qui englobe les functions du panier
function cart(inputQte, basket, articleSelect, prix, price) {
    changeInput();
    deleteItem();
    totalQty();

    //function  qty/price  click changement qty avec conditions si ok calcul prix
    function changeInput() {
        inputQte.addEventListener("change", (e) => {
            quant = e.target.value;
            //condition pour la quantité rentrée nombre entier compris entre 1 et 100
            if (inputQte.value > 0 && inputQte.value < 101 && inputQte.value % 1 == 0) {
                inputQte.value = quant;
                basket[articleSelect].quantity = Number(quant);
                localStorage.setItem("articleSelect", JSON.stringify(basket));
                basket = JSON.parse(localStorage.getItem("articleSelect"));
                prix = basket[articleSelect].quantity * articleData.price;
                price.textContent = prix + "€";
                //appel totalQty pour reclacul
                totalQty();
            } else {
                inputQte.value = basket[articleSelect].quantity;
            }
        });
    };

    /** 
      suppression de l'article à l'écoute du click, 
      on selectionne attribut data-id pour supprimer le bon produit
      on filtre le panier pour supprimer l'article par l'index
      on envoi le panier avec la nouvelle valeur
      et on renvoi l'affichage des article restants
      */
    function deleteItem(){
        
        pDelete.addEventListener("click", function (e) {
            const articleSelectId = this.getAttribute('data-id');
            const tempBasket = basket.filter((value, index) =>{return index != articleSelectId});
            localStorage.removeItem(articleSelect);
            localStorage.setItem('articleSelect', JSON.stringify(tempBasket));
            displayProductBasket(JSON.parse(localStorage.getItem('articleSelect')));
        });
    };

    // total des quantity et prix final
    function totalQty(){
        let totalQuantity = document.getElementById("totalQuantity");
        let totalPrice = document.getElementById("totalPrice");
        let number = 0; //on fixe à zéro   
        let total = 0;
        for(let articleSelect of basket){
          //le total de tous les articles présents * le prix unitaire
            total += articleSelect.quantity * articleData.price;
          //number représente le total d'articles  
            number += JSON.parse(articleSelect.quantity);
        }
        totalQuantity.textContent = number;
        totalPrice.innerText = total;
    };
    return { basket, prix };
    
};


//////////**********///////////
/**
  Expects request to contain:
  contact: {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    email: string
  }
  products: [string] <-- array of product _id
 */

//je déclare contact et products je vais le remplir au fur et à mesure de la validation
 let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};


let formulaire = document.querySelector('.cart__order__form input[type= "submit"]');
let inputs = document.querySelector(".cart__order__form__question");

let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let email = document.querySelector("#email");
let city = document.querySelector("#city");

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");

//regex test
let firstNameRegex = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
let lastNameRegex = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
let addressRegex = /^(.){2,50}$/;
let cityRegex = /^[a-zA-Zéèàïêç\-\s]{2,30}$/;
let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;


let submit = document.querySelector("#order");

////condition avec regex et return des valeur boléennes selon condition remplie ou paspour chaque input
/////////firstName/////////
firstName.addEventListener("input", function (e) {
  //arrête d'écouter après le résultat valide
  e.preventDefault();
  //récupération des valeurs pour construire l'objet contact
  contact.firstName = e.target.value;
});

function validFirstName(firstName) {
  //on déclare la validation sur faux
  let valid = false;
  //on test la regex
  let testName = firstNameRegex.test(firstName);
  if(testName){
    //si il n'y a pas de message d'erreur valid ok
    firstNameErrorMsg.textContent = "";
    valid = true;
  }else{
    //si il y a un message d'erreur valide reste false
    firstNameErrorMsg.textContent = "le prénom doit avoir 3 lettres minimum et pas de caractère spéciaux ou chiffres merci !!!";
    //on retourne le résultat de valid pour chaque champ
    valid = false;
  }
  return valid;
}

/////////lastName/////////
lastName.addEventListener("input", function (e) {
    e.preventDefault();
    contact.lastName = e.target.value;
});

function validLastName(lastName) {
  let valid = false;
  let testLastName = lastNameRegex.test(lastName);
  if(testLastName){
    errLastName.innerText = "";
    valid = true;
  }else{
    lastNameErrorMsg.textContent = "le nom doit avoir 3 lettres minimum et pas de caractère spéciaux ou chiffres merci !!!";
    valid = false;
  }
  return valid;
}

/////////adress/////////
address.addEventListener("input", function (e) {
  validAddress(e.target.value);
  contact.address = e.target.value;
});

function validAddress(address) {
  let valid = false;
  let testAddress = addressRegex.test(address);
  if(testAddress){
    addressErrorMsg.textContent = "";
    valid = true;
  }else{
    addressErrorMsg.textContent = "merci de rentrer une adresse valide, max 50 caractères";
    valid = false;
  }
  return valid;
}

/////////city/////////
city.addEventListener("input", function (e) {
  validCity(e.target.value);
  contact.city = e.target.value;
});

function validCity(city) {
  let valid = false;
  let testCity = cityRegex.test(city);
  if(testCity){
    cityErrorMsg.textContent = "";
    valid = true;
  }else{
    cityErrorMsg.textContent = "merci de rentrer le nom de votre ville ou village, pas de code postal !!! ";
    valid = false;
  }
  return valid;
}

/////////email/////////
email.addEventListener("input", function (e) {
  validEmail(e.target.value);
  contact.email = e.target.value;
});

function validEmail(email) {
  let valid = false;
  let testEmail = emailRegex.test(email);
  if(testEmail){
    emailErrorMsg.textContent = "";
    valid = true;
  }else{
    emailErrorMsg.textContent  = "Email non valide, il doit contenir un @ et 1 point suivi de maxixum 4 lettres, exemple toto@monmail.fr";
    valid = false;
  }
  return valid;
}
let products = [];
//listen orderButton
let ordeButton = document.querySelector("#order").addEventListener("click", (e) => {
  e.preventDefault();
    if (
        firstNameRegex.test(firstName.value) == false ||
        lastNameRegex.test(lastName.value) == false ||
        addressRegex.test(address.value) == false ||
        cityRegex.test(city.value) == false ||
        emailRegex.test(email.value) == false
    ){
      window.alert("Vos informations de contact ne correspondent pas aux standats demandés !");
    }else if(
      firstName.value === "" ||
      lastName.value === "" ||
      address.value === "" ||
      city.value === "" ||
      email.value === ""
    ){
      window.alert("Vous devez renseigner vos coordonnées pour valider votre commande !");
    }else {
      //création contact sur LS
      localStorage.setItem("contact", JSON.stringify(contact));
      
      // order sera composé de contact et products
      for(let articleSelect of basket){
        products.push(articleSelect.id)};

      let order = {
        contact: contact,
        products: products,
      };
      
      
      /** 
       * fetch avec POST transforme JSON grace aux headers informations
       * méthode http body = données que l'on souhaite envoyer
      */
      fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        body: JSON.stringify(order),
        headers: { 
        'Content-Type': 'application/json' 
        },
      })
          .then((res) => res.json())
          .then((data) => {
            let orderId = data.orderId;
            window.location.assign("confirmation.html?id=" + orderId)
            
          });
          
    }
});
