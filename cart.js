let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const displayCartItem = () =>
{
    const cart = document.getElementById('cart-items');
    const os = document.getElementById('order-summary');
    cart.innerHTML = '';
    os.innerHTML = '';
    if(cartItems.length === 0){
        cart.innerHTML = `<h3  id = "cart_container">Your Cart is empty</h3>
        <button id="empty-cart" >
        <i class ="fa-solid fa-arrow-left"></i> Continue Shopping</button>`;
        document.getElementById('empty-cart').addEventListener('click', () => {
            window.location.href = "index.html";
        })
    }
    else{
        cartItems.forEach(item => {
            const divElement = document.createElement('div');
            divElement.innerHTML = `
            <img src = "${item.image}" alt="${item.title}"/>
            <h2>${item.title}</h2>
            <button onclick = "changequantity(${item.id},'decrease')"> - </button>
            <span>${item.quantity}</span>
            <button onclick = "changequantity(${item.id},'increase')"> + </button>
            <hr>
            `;
            cart.appendChild(divElement);
        });
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = cartItems.reduce((sum, item) => sum +item.price * item.quantity, 0).toFixed(2);
        const shippingAmount = calculate(totalItems);
        const total = parseFloat(totalAmount) + parseFloat(shippingAmount);
        os.innerHTML = `
            <h2>Order Summary</h2>
            <h4>Products (${totalItems}) <span>$${totalAmount}</span></h4>
            <h4>Shipping: <span>$${shippingAmount.toFixed(2)}</span></h4>
            <h4>Total amount <span>$${total}<span></h4>
            <button>Go to Checkout</button>
            `;
                
        };
    } 
const addtoCart = (item) => {
    const exisitItem = cartItems.find(cartItem => cartItem.id === item.id);
    if(exisitItem){
        exisitItem.quantity += 1;
    }
    else{
        product.quantity = 1;
        cartItems.push(item);
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    displayCartItem();
    updateCart();
};
const changequantity = (itemId, action) => 
{
    const cartitem = cartItems.find(cartitem => cartitem.id === itemId);
    if(cartitem){
        if (action === 'increase') {
            cartitem.quantity += 1;
        }
        else if (action === 'decrease' && cartitem.quantity > 1)
        {
            cartitem.quantity -= 1;
        }
        else {
            cartItems = cartItems.filter(cartitem => cartitem.id !== itemId);
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItem();
    updateCart();
};
const updateCart = () => {
    const totaluniqueItems = cartItems.length;
    document.querySelector('.cart-count').textContent = totaluniqueItems;
};
const calculate = (totalItems) => {
    if(totalItems === 0) {
        return 0;
    }
    return totalItems > 3 ? 5 : 10;
};

document.addEventListener('DOMContentLoaded', () => {
    displayCartItem();
    updateCart();
});    
displayCartItem(); 
