document.addEventListener("DOMContentLoaded", function () {
  function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartContainer = document.getElementById("cart-items-container");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      document.getElementById("cart-total").innerText = "₹0";
      return;
    }

    let total = 0;

    cartItems.forEach((item, idx) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemDiv = document.createElement("div");
      itemDiv.className = "d-flex align-items-center mb-3 border-bottom pb-2";

      itemDiv.innerHTML = `
        <img src="${item.img || '/IMAGES/default.png'}" alt="${item.title}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;margin-right:15px;">
        <div class="flex-grow-1">
          <h6 class="mb-1">${item.title}</h6>
          <small>Quantity: ${item.quantity}</small><br>
          <small>Price: ₹${item.price} x ${item.quantity} = ₹${itemTotal}</small>
        </div>
      `;

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.innerText = "Remove";
      removeBtn.className = "btn btn-sm btn-outline-danger ms-2";
      removeBtn.addEventListener("click", function () {
        const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        updatedCart.splice(idx, 1);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        renderCart();
      });

      itemDiv.appendChild(removeBtn);
      cartContainer.appendChild(itemDiv);
    });

    // Update total
    document.getElementById("cart-total").innerText = `₹${total}`;
    // For other total displays (if any)
    const totalEls = document.querySelectorAll("#order-summary div.fw-bold > div:last-child, .fw-bold.d-flex.justify-content-between > div:last-child");
    totalEls.forEach(el => el.innerText = `₹${total}`);
  }

  renderCart();
});

document.addEventListener("DOMContentLoaded", function () {
  // Payment method logic
  const cardRadio = document.getElementById("card");
  const upiRadio = document.getElementById("upi");
  const cardDetails = document.getElementById("card-details");
  const upiDetails = document.getElementById("upi-details");

  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener("change", function () {
      cardDetails.style.display = cardRadio.checked ? "block" : "none";
      upiDetails.style.display = upiRadio.checked ? "block" : "none";
    });
  });

  // Modal show/hide
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutModal = document.getElementById("checkout-modal");
  const closeModal = document.getElementById("close-modal");

  checkoutBtn.addEventListener("click", function () {
    checkoutModal.style.display = "flex"; // Flex for center alignment
  });

  closeModal.addEventListener("click", function () {
    checkoutModal.style.display = "none";
  });

  // Submit mini checkout form
  document.getElementById("mini-checkout-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Mini Order placed successfully!");
    localStorage.removeItem("cartItems");
    checkoutModal.style.display = "none";
  });

  // Update summary values
  function updateOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });
    const subtotalEl = document.getElementById("cart-subtotal");
    const totalEl = document.getElementById("cart-total-summary");
    if (subtotalEl && totalEl) {
      subtotalEl.innerText = `₹${subtotal}`;
      totalEl.innerText = `₹${subtotal}`;
    }
  }
  updateOrderSummary();
});

document.getElementById("checkout-modal").style.display = "none";

document.getElementById("payment-form").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("checkout-modal").style.display = "none"; // ✅ close modal

  Swal.fire({
    title: '🎉 Order Placed!',
    text: 'Thank you for ordering. Redirecting to homepage...',
    icon: 'success',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didClose: () => {
      window.location.href = "/HTML/index.html";
    }
  });

  this.reset();
});
