
 //Recuperation des données du local storage
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));
//let idStorage = JSON.parse(localStorage.getItem("orderId"));
/*
if (idStorage) {
    console.log("1"+idStorage);
}
else {
    console.log("2"+idStorage);
}

*/


if (!productLocalStorage) {
     // Ajout des balises titre et cart du html
    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");
    
    titleCart.innerHTML = "Vous n'avez aucun produit dans votre panier !";
    sectionCart.style.display = "none";
    
} else {
    // Creation d'une boucle pour les differents produits du local storage avec incrémentation +1
    for (let i=0; i < productLocalStorage.length; i++) {

        // Inseretion des informations produits dans "article"

       

        


        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);

        // Inseretion des informations produits dans "div"
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Ajout de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productLocalStorage[i].imgKanap;

        
        // Ajout de la description du produit dans "div"
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Ajout de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Ajout du titre H2
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = productLocalStorage[i].nameKanap;

        // Ajout du choix de la couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productLocalStorage[i].colorKanap;
        productColor.style.fontSize = "20px";

        // Ajout du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = productLocalStorage[i].priceKanap + " €";

        // Ajout de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        // Ajout de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // Ajout de "Qté : "
        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = "Qté : ";

        // Ajout de la quantité avec un minimum de 1 et un max de 100 dans la balise input avec un attribut de type number
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = productLocalStorage[i].qtyKanap;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Ajout de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Ajout du texte Supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        productSupprimer.addEventListener("click", (e) => {
            e.preventDefault;
        
            // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
            let deleteId = productLocalStorage[i].idKanap;
            let deleteColor = productLocalStorage[i].colorKanap;

            // filtrer l'élément cliqué par le bouton supprimer
            productLocalStorage = productLocalStorage.filter( elt => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor);

            // Mise a jour du local storage
            localStorage.setItem('cart', JSON.stringify(productLocalStorage));               

            // messsage d'alerte 
            alert('Article supprimé.');
            
            //Si il n'y a plus de produits dans le local storage alors on affiche vide
            if (productLocalStorage.length === 0) {
                localStorage.clear();
            }
            //Rafraichissement de la page
            location.reload();
        });
    }
}

function getTotals(){

    // Calcul des quantités avec une boucle pour chaque produit
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }
    // Ajout de la quantité calculée dans le html 
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // calcul du prix total : quntité de chaque element x prix par kanap
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * productLocalStorage[i].priceKanap);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
getTotals();
//Modification des quantités
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k= 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productLocalStorage[k].qtyKanap;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = productLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.qtyKanap = qttModifValue;
            productLocalStorage[k].qtyKanap = resultFind.qtyKanap;

            localStorage.setItem("cart", JSON.stringify(productLocalStorage));
        
            // Rafraichissement de la page pour mettre les mofifs a jour
            location.reload();
        })
    }
}
modifyQtt();


//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ, lettres seulement';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ, lettres seulement';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email, dont contenir du texte, un arobase puis du texte.';
        }
    };
    }
getForm();
 //Ecoute de l evenement click du bouton order 
//Creation de la fonciton postform
function postForm() {
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
    event.preventDefault();
  
    // Creation d un objet regroupant les infos utilisateur
    const contact = {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value
    }

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i<productLocalStorage.length;i++) {
        products.push(productLocalStorage[i].idKanap);
    }
    console.log(products);
  
    // Creation d'un objet avec le contact et le produit
    const sendFormData = {
      contact,
      products,
    }
  
    // j'envoie le formulaire au serveur grâce a la méthode post
  
    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json',
      }
    };
  
    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
        console.log(productLocalStorage)
        const orderIdElement = document.getElementById("orderId")
        orderIdElement.innerHTML = data.orderId;
        console.log(orderIdElement);
      });
      
  }); 
  } 
// Utilisation de la fonction postForm précedement créée
  postForm();

  console.log(localStorage)
  console.log(localStorage.cart)
  console.log(localStorage.orderId)
  document.querySelector("orderId").innerHTML = localStorage;

  const orderId = getOrderId()
  displayOrderId(orderId)
  removeAllCache()
  // lorsqu'on clique sur order la fonction getOrder s execute
  order.addEventListener('click', getOrderId())
  function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
  }
  console.log(getOrderId)
  
  function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = localStorage.orderId;
  }
  
  function removeAllCache() {     //supprimer le cache total une fois la commande validée
    const cache = window.localStorage
    cache.clear()
  }