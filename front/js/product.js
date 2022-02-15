//utilisation de window. https://www.w3schools.com/js/js_window_location.asp
let str = window.location.href;
//creation de la nouvelle URL grace au constructeur
let url = new URL(str);
//utilisation de la méthode get pour récuperer l'id du produit
let idProduct = url.searchParams.get("id");
console.log(idProduct);
//Definition de la variable article
let article = "";

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");
//console.log(url.searchParams);
getArticle();

// Creation du retour de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })
// Verification pour savoir si les données du dom ont été récuperées
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.log(article);
// Récuperation de l'array sous forme de table plus lisible
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    
function getPost(article){
    // definition de la variable image produit et creation de la balise img avec createElement pour injecter dans le html
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // injection du javascript dans H1/titre
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // ajout du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // ajout de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Creation de la variable colors pour la boucle for of https://openclassrooms.com/fr/courses/6175841-apprenez-a-programmer-avec-javascript/6279104-utilisez-la-bonne-boucle-pour-repeter-les-taches-for-while#/id/r-7179203

      for (let colors of article.colors){
        console.log(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
   
    addToCart(article);
}

//Ajout de la gestion du panier avec le btn atc
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

//Création de l'évenement permettant d'ajouter au panier lors du clique. Quantité <100 et couleur non nulle
btn_envoyerPanier.addEventListener("click", (event)=>{
    if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    //creation des variable choix de la couleur (event)
    let choixCouleur = colorPicked.value;
                
    //creation des variable choix de la quantité
    let choixQuantite = quantityPicked.value;

    //Récupération des données de l'array + quantité
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite)
    };

    //Initialisation du local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
//test si les quantités actuelles + les nouvelles restent inférieures à 100

    //fenêtre pop-up de confirmation d'ajout produit
    const popupConfirmation =() =>{
        if(window.confirm(`Ce/ces produits vont être ajoutés au panier ${choixQuantite} ${article.name} ${choixCouleur} `)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit commandé est déjà dans le panier (pour éviter doublon)
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}
}