(async function(){
  let products = await getArticles("http://localhost:3000/api/products");
    displayProducts(products);
  
})()

async function getArticles(url) {
  try {
  let res = await fetch(url);
  return await res.json();
  }
  catch(error) {
    console.log("problème pour récupérer les produits : " + error);
  }
}

function displayProducts(products) {
  var container = document.getElementById('items');
  for (let i in products) {
    let product = products[i];
    console.log(products);

    var productDiv ='<a href="./product.html?id=' + product._id + '">' + '<article>' + ' <img src="' + product.imageUrl + '" alt="'+ product.altTxt + '">'+ '<h3 class="productName">'+  product.name +'</h3>'  + '<p class="productDescription">' + product.description + '</p>' + '</article> </a>';
    container.innerHTML += productDiv;
  }
}