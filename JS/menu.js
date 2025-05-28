document.addEventListener("DOMContentLoaded", function () {
    let quantity = 0;

    // Show modal details
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
            quantity = 0;
            document.getElementById("modalQuantity").textContent = quantity;

            document.getElementById("modalTitle").textContent = item.dataset.title;
            document.getElementById("modalDesc").textContent = item.dataset.description;
            document.getElementById("modalPrice").textContent = item.dataset.price;
            document.getElementById("modalImg").src = item.dataset.img;
        });
    });

    document.getElementById("plusBtn").addEventListener("click", () => {
        quantity++;
        document.getElementById("modalQuantity").textContent = quantity;
    });

    document.getElementById("minusBtn").addEventListener("click", () => {
        if (quantity > 0) quantity--;
        document.getElementById("modalQuantity").textContent = quantity;
    });

    document.getElementById("modalAddToCart").addEventListener("click", () => {
        if (quantity > 0) {
            const item = {
                title: document.getElementById("modalTitle").textContent,
                price: Number(document.getElementById("modalPrice").textContent),
                quantity: quantity,
                img: document.getElementById("modalImg").src // Include image URL
            };

            let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
            const existing = cart.find(i => i.title === item.title);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                cart.push(item);
            }
            localStorage.setItem("cartItems", JSON.stringify(cart));
            alert(`${item.title} (${item.quantity}) added to cart!`);
        }
    });
});



document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function () {
        const title = this.getAttribute('data-title');
        const desc = this.getAttribute('data-description');
        const price = this.getAttribute('data-price');
        const img = this.getAttribute('data-img');

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;
        document.getElementById('modalPrice').textContent = price;
        document.getElementById('modalImg').src = img;

        // Reset quantity to 0
        document.getElementById('modalQuantity').textContent = '0';
    });
});

