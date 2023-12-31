document.addEventListener("DOMContentLoaded", function() {
  // Get all menu sections
  var sections = document.querySelectorAll('.menu-category');
  // Show only the first section
  sections[0].classList.add('active');

  // Function to switch to the selected menu category
  function switchMenuCategory(categoryId) {
      // Hide all sections
      sections.forEach(function(section) {
          section.classList.remove('active');
      });

      // Show the selected section
      var selectedSection = document.getElementById(categoryId);
      if (selectedSection) {
          selectedSection.classList.add('active');
      }
  }

  // Event listeners for menu category buttons in the header
  document.getElementById('first-restaurant-btn').addEventListener('click', function() {
      switchMenuCategory('first-restaurant');
  });

  document.getElementById('second-restaurant-btn').addEventListener('click', function() {
      switchMenuCategory('second-restaurant');
  });

  document.getElementById('third-restaurant-btn').addEventListener('click', function() {
      switchMenuCategory('third-restaurant');
  });

  document.getElementById('fourth-restaurant-btn').addEventListener('click', function() {
      switchMenuCategory('fourth-restaurant');
  });

  document.getElementById('fifth-restaurant-btn').addEventListener('click', function() {
      switchMenuCategory('fifth-restaurant');
  });

  document.getElementById('sixth-restaurant-btn').addEventListener('click', function() {
      switchMenuCategory('sixth-restaurant');
  });

});   

// Initialize an empty cart object to store items
const cart = {};

// Get a reference to the cart button and the cart popup
const cartButton = document.getElementById("cart-button");
const cartPopup = document.getElementById("cartPopup");

// Function to update the cart display
function updateCartDisplay() {
  // Get a reference to the cart content element
  const cartContent = cartPopup.querySelector(".cart-content");

  // Clear the cart content
  cartContent.innerHTML = "";

  // Loop through the items in the cart and display them
  for (const itemName in cart) {
    const itemPrice = cart[itemName];

    // Create a new cart item element
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Create elements for item name, price, and quantity
    const itemNameElement = document.createElement("span");
    itemNameElement.textContent = itemName;
    const itemPriceElement = document.createElement("span");
    itemPriceElement.textContent = `KSH${itemPrice.toFixed(2)}`;

    // Append the elements to the cart item
    cartItem.appendChild(itemNameElement);
    cartItem.appendChild(itemPriceElement);

    // Append the cart item to the cart content
    cartContent.appendChild(cartItem);
  }
}

// Function to calculate and update the total amount
function updateTotalAmount() {
  const totalAmountElement = cartPopup.querySelector(".total-amount");
  let totalAmount = 0;

  for (const itemName in cart) {
    totalAmount += cart[itemName];
  }

  totalAmountElement.textContent = `Total: KSH${totalAmount.toFixed(2)}`;
}

// Clear Cart Button
const clearCartButton = document.getElementById("clearCartButton");
clearCartButton.addEventListener("click", () => {
  for (const itemName in cart) {
    delete cart[itemName];
  }

  // Update the cart display and total amount
  updateCartDisplay();
  updateTotalAmount();
});

// Event listener for the "Order Now" buttons
const orderButtons = document.querySelectorAll(".order-now");
orderButtons.forEach(button => {
  button.addEventListener("click", function () {
    // Get the food name and price from the button's data attributes
    const foodName = this.getAttribute("food-name");
    const foodPrice = parseFloat(this.getAttribute("food-price"));

    // Check if the food item is already in the cart
    if (cart[foodName]) {
      // If it is, increase the quantity by one
      cart[foodName] += foodPrice;
    } else {
      // If it's not, add it to the cart with quantity 1
      cart[foodName] = foodPrice;
    }

    // Update the cart display
    updateCartDisplay();

    // Calculate and update the total amount
    updateTotalAmount();
  });
});

const checkoutButton = document.getElementById('checkoutButton');
const checkoutScreen = document.getElementById('checkoutScreen');
const placeOrderButton = document.getElementById('placeOrderButton');
const orderConfirmation = document.getElementById('orderConfirmation');
const checkoutForm = document.getElementById('checkoutForm');

// Event listener for the "Checkout" button
checkoutButton.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    // Display a message if the cart is empty
    alert('Empty cart. Please add items to the cart.');
  } else {
    cartPopup.style.display = 'none';
    checkoutScreen.style.display = 'block';
  }
});

// Event listener for the "Place Order" button
placeOrderButton.addEventListener('click', () => {
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  const totalAmount = calculateTotalAmount(); // Implement the function to calculate total amount

  // Display a confirmation message based on the selected payment method
  let confirmationMessage = '';
  if (paymentMethod === 'mpesa') {
    confirmationMessage = 'Your order has been received. Please complete the payment via M-Pesa.';
  } else if (paymentMethod === 'payUponDelivery') {
    confirmationMessage = 'Your order has been received. Payment will be collected upon delivery.';
  }

  orderConfirmation.textContent = confirmationMessage;
  checkoutForm.style.display = 'none';
  orderConfirmation.style.display = 'block';
});

// Function to calculate the total amount
function calculateTotalAmount() {
  // Your total amount calculation logic
}

// Event listener for the cart button to show/hide the cart popup
cartButton.addEventListener("click", function () {
  cartPopup.style.display = "block";
});

// Event listener to close the cart popup
const closeCartButton = document.getElementById("closeCart");
closeCartButton.addEventListener("click", function () {
  cartPopup.style.display = "none";
});

// Initially hide the cart popup
cartPopup.style.display = "none";

function closeCheckoutScreen() {
  var checkoutScreen = document.querySelector('.checkout-screen');
  checkoutScreen.style.display = 'none';
}