const products = [
    {
        id:1,
        name:"Laptop",
        price:5000000,
        image:"https://picsum.photos/200?1"
    },
    {
        id:2,
        name:"Mouse",
        price:150000,
        image:"https://picsum.photos/200?2"
    },
    {
        id:3,
        name:"Keyboard",
        price:300000,
        image:"https://picsum.photos/200?3"
    },
    {
        id:4,
        name:"Headset",
        price:250000,
        image:"https://picsum.photos/200?4"
    },
    {
        id:5,
        name:"Monitor",
        price:2000000,
        image:"https://picsum.photos/200?5"
    }
];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const badge = document.getElementById("badge");

let cart = [];

function renderProducts(){

    productsContainer.innerHTML = "";

    products.forEach(product => {

        productsContainer.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>Rp ${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Tambah ke Keranjang
                </button>
            </div>
        `;

    });

}

function addToCart(id){

    const item = cart.find(p => p.id === id);

    if(item){
        item.quantity++;
    }else{

        const product = products.find(p => p.id === id);

        cart.push({
            ...product,
            quantity:1
        });

    }

    renderCart();

}

function renderCart(){

    cartItems.innerHTML = "";

    let total = 0;
    let totalItem = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        totalItem += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <h4>${item.name}</h4>

                <p>
                    Rp ${item.price}
                </p>

                <p>
                    Jumlah: ${item.quantity}
                </p>

                <button onclick="changeQty(${item.id},1)">
                    +
                </button>

                <button onclick="changeQty(${item.id},-1)">
                    -
                </button>

                <button onclick="removeItem(${item.id})">
                    Hapus
                </button>

            </div>
        `;

    });

    totalElement.textContent = total;
    badge.textContent = totalItem;

}

function changeQty(id, change){

    const item = cart.find(p => p.id === id);

    item.quantity += change;

    if(item.quantity <= 0){
        cart = cart.filter(p => p.id !== id);
    }

    renderCart();

}

function removeItem(id){

    cart = cart.filter(p => p.id !== id);

    renderCart();

}

document.getElementById("checkout")
.addEventListener("click", function(){

    if(cart.length === 0){
        alert("Keranjang kosong!");
        return;
    }

    let summary = "=== Checkout ===\n";

    cart.forEach(item => {

        summary += `
${item.name} x ${item.quantity}
`;

    });

    summary += `
Total: Rp ${totalElement.textContent}
`;

    alert(summary);

});

renderProducts();