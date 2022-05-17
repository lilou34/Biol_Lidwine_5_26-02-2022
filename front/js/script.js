//ma var products est un tableau
let products = [];
//je récupère mon tableau avec unu fonction async car elle doit attendre de recevoir une réponse
async function getListProducts(){
    await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((datas) => (products = datas))
    .catch((error) => console.log(error));
  }
  console.log(products);
//je crée une function pour dispacher les produits qui attend la promise
async function showListProducts(){
    await getListProducts();
    let article = document.getElementById("items");
    for (let i = 0; i < products.length; i++) {
    let a = document.createElement('a');
    a.setAttribute("href", `./product.html?id=${products[i]._id}`);
      //ainsi de suite pour les autres éléments
    let article = document.createElement('article');
    let img = document.createElement('img');
    img.setAttribute("src", products[i].imageUrl);
    img.setAttribute("alt", products[i].altTxt);
    let h3 = document.createElement("h3");
    h3.setAttribute("class", "productName");
    h3.textContent = products[i].name;
    let p = document.createElement("p");
    p.setAttribute("class", "productDescription");
    p.textContent = products[i].description;
      //je les insère ensuite chacun dans son parent 
    article.append(img, h3, p);
    a.append(article);
    document.getElementById("items").append(a);
    document.getElementById('a');
    }
    console.log("la liste des produits est : ", products);
    };
    showListProducts();