//stocker les function sur un fichier basket.js et par exemple sur un addEventListenervon appel notre function addBasket

/////////////////////////////////
//POO
//charger l'instance de classe au démarrage de la page html
//let basket = new Basket(); //pour appeler la classe et se servir de ses méthodes basket.add ou basket.get
/*
class Basket {
    constructor() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            this.basket = []; // un panier vide
        } else {
            this.basket = JSON.parse(basket); //si le panier contient des éléments il encode
        }
    }

    save(){//on crée un panier
        localStorage.setItem("basket", JSON.stringify(this.basket)); // avec JSON stringify l'objet est transfomé en JSON chainede caractère (language du LS) enregistre un panier sur le localStorage
    }

    add(product) {//ajoute au panier avec conditions et incré
        let foundProduct = this.basket.find(p => p.id == productSelect.id);//vérifier que le produit n'est pas déjà dans le panier et si oui ajouter seulement la quantité
        if (foundProduct != undefined) { //si il est différent undefined = existe déjà dans le panier
            foundProduct.quantity++;//on ajoute seulement la quantité
        } else {
            article.quantity = 1;//sinon on fixe par défaut une qte à 1 au produit
            this.basket.push(product); //ajouter produit  selectionné dans getBasket
        }
        this.save();// et on enregistre le nouveau panier
        }
    

    remove(productSelect){//prendre le panier complet et supprimer un produit grace à son id
        this.basket = this.basket.filter(p => p.id != productSelect.id);//retirer un élément dont l'id est différent de celui que l'on va passer en paramètre
        this.save(); //pour sauvegarder
    }

    changeQuantity(productSelect, quantity){//incémenter et décrémenter qte
        let foundProduct = this.basket.find(p => p.id == productSelect.id);//vérifier que le produit n'est pas déjà dans le panier et si oui ajouter seulement la quantité
        if (foundProduct != undefined) { //si il existe déjà dans le panier
            foundProduct.quantity += quantity;//on ajoute
            if (foundProduct.quantity <= 0) {//est pluss petit ou égal 0
                this.remove(foundProduct);//on enlève du panier
            } else {
                this.save(); //pour sauvegarder
            }
        }
    }

    getNumberProduct(){ // function qté totale de produit
        let number = 0; //on fixe à zéro
    for (let product of this.basket) { // pour chaque produit du panier
            number += product.quantity; // récupère qté pour chaque produit dans le panier les aditionne
        }
        return number; //résultat total
    }

    getTotalPrice(){
        let total = 0;//on fixe à zéro
        for (let product of this.basket) { // pour chaque produit du panier
            total += product.quantity * product.price; // récupère qté multiplie avec le prix pour chaque produit dans le panier les aditionne
        }
        return total; //résultat total
    }
}*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//décomposition des functions
/*function saveBasket(basket) {//on crée un panier
    localStorage.setItem("basket", JSON.stringify(basket)); // avec JSON stringify l'objet est transfomé en JSON chainede caractère (language du LS) enregistre un panier sur le localStorage

}

function getBasket() {//on récupère les infos
    let basket =  localStorage.getItem("basket"); //récupère le produit selectionné par l'user et le retransforme de chaine de caractère en tableau ou objet (language site)
    
    if (basket == null) {
        return []; //si le panier est vide il retourne un tableau vide
    } else {
        return JSON.parse(basket); //si le panier contient des éléments il encode
    }
}

function addBasket(product) {//on ajoute au panier
    let basket = getBasket();//on récupère le panier existant dans le LS 
    let foundProduct = basket.find(p => p.id == product.id);//vérifier que le produit n'est pas déjà dans le panier et si oui ajouter seulement la quantité
    if (foundProduct != undefined) { //si il est différent undefined = existe déjà dans le panier
        foundProduct.quantity++;//on ajoute seulement la quantité
    } else {
        product.quantity = 1;//sinon on fixe par défaut une qte à 1 au produit
        basket.push(product); //ajouter produit  selectionné dans getBasket
    }
    saveBasket(basket);// et on enregistre le nouveau panier
    /*function removeFromBasket(product) {
        let basket = getBasket();
    }
}


function removeFromBasket(product) {//prendre le panier complet et supprimer un produit grace à son id
    let basket = getBasket();//on récupère le panier existant dans le LS
    basket = basket.filter(p => p.id != product.id);//retirer un élément dont l'id est différent de celui que l'on va passer en paramètre
    saveBasket(basket); //pour sauvegarder
}

function changeQuantity(product, quantity){//incémenter et décrémenter qte
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

function getNumberProduct() { // function qté totale de produit
    let basket = getBasket();//on récupère le panier existant dans le LS 
    let number = 0; //on fixe à zéro
    for(let product of basket){ // pour chaque produit du panier
        number += product.quantity; // récupère qté pour chaque produit dans le panier les aditionne
    }
    return number; //résultat total
}


function getTotalPrice() {
    let basket = getBasket();//on récupère le panier existant dans le LS 
    let total = 0;//on fixe à zéro
    for (let product of basket) { // pour chaque produit du panier
        total += product.quantity * product.price; // récupère qté multiplie avec le prix pour chaque produit dans le panier les aditionne
    }
    return total; //résultat total
}*/
/** function addLS(productSelect, basket){
    
    getBasket();
    addBasket(productSelect);
    changeQuantity(productSelect, quantity);
    saveBasket(basket);
    getNumberProduct();
    getTotalPrice();
}*/