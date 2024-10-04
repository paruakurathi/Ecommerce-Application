let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let allProducts = [];

fetch('https://fakestoreapi.com/products')
.then(response => response.json())
.then(data =>{
    allProducts = data;
    displayProducts(allProducts);
});

const displayProducts = (products) =>{
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';
    products.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('productsContainer');

        const img = document.createElement('img');
        img.setAttribute('src',item.image);

        const title = document.createElement('h3');
        title.textContent = item.title.length > 8 ?item.title.substring(0,8) + '...' : item.title;

        const description = document.createElement('p');
        description.textContent = item.description.length > 70 ?item.description.substring(0,60) + '...' : item.description;

        const hr = document.createElement('hr');
        const price = document.createElement('h3');
        price.textContent = `$${item.price}`;

        const hr1 = document.createElement('hr');

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';

        const cartButton = document.createElement('button');
        cartButton.textContent = 'Add to Cart';
        cartButton.addEventListener('click',()=>{
            addtoCart(item);
        });

        productDiv.appendChild(img);
        productDiv.appendChild(title);
        productDiv.appendChild(description);
        productDiv.appendChild(hr);
        productDiv.appendChild(price);
        productDiv.appendChild(hr1);
        productDiv.appendChild(detailsButton);
        productDiv.appendChild(cartButton);

        productContainer.appendChild(productDiv);
});
};

const CategorybyFilter = (category)=>{
    if(category === 'all'){
        displayProducts(allProducts);
    }
    else{
        const filteredProducts = allProducts.filter(item => item.category === category);
        displayProducts(filteredProducts);
}
};
    document.getElementById('all').addEventListener('click', () => CategorybyFilter('all')); 
    document.getElementById("men's_clothing").addEventListener('click', () => CategorybyFilter("men's clothing")); 
    document.getElementById("women's_clothing").addEventListener('click', () => CategorybyFilter("women's clothing")); 
    document.getElementById('jewelery').addEventListener('click', () => CategorybyFilter('jewelery')); 
    document.getElementById('electronics').addEventListener('click', () => CategorybyFilter('electronics')); 
  

const addtoCart = (item) => {
    const exisitItem = cartItems.find(cartItem => cartItem.id === item.id);
    if(exisitItem){
        exisitItem.quantity += 1;
    }
    else{
        item.quantity = 1;
        cartItems.push(item);
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
        updateCart();
};

const updateCart = () => {
    const totaluniqueItems = cartItems.length;
    document.querySelector('.cart-count').textContent = totaluniqueItems;
};

   
document.addEventListener('DOMContentLoaded', updateCart);
document.getElementById('cartIcon').addEventListener('click', () =>
{
    window.location.href = 'cart.html';
});
    