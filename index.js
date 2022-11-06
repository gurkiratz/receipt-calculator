function theId(id) {
  return document.getElementById(id);
}

let prodArray = [];
// let prodObj = {};

// Admin functions

// Add product button
const prodName = theId("product-name");
const prodSelect = theId("product-select");
theId("btn-add-product").addEventListener("click", () =>
  addProd(prodName.value, prodSelect)
);

function addProd(prodName, prodSelect) {
  // if (prodArray.length === 0) {
  //   prodArray.push({ name: prodName });
  //   console.log("len - 0");
  // } else if (prodArray.length > 0) {
  //   console.log("len more");
  //   for (j of prodArray) {
  //     if (j.name === prodName && j.price) {
  //       console.log("hi");
  //     } else {
  //       prodArray.push({ name: prodName });
  //     }
  //   }
  // }
  ///////////////
  // if (prodArray.length > 0) {
  //   for (j of prodArray) {
  //     if (j.name === prodName) prodArray = prodArray;
  //     else prodArray.push({ name: prodName });
  //   }
  // } else {
  //   prodArray.push({ name: prodName });
  // }

  prodArray.push({ name: prodName });
  jsonProdArray = prodArray.map(JSON.stringify);
  // jsonProdArray = jsonProdArray.filter((e) => !e.includes("price"));
  prodSet = new Set(jsonProdArray);
  prodArray = Array.from(prodSet).map(JSON.parse);
  // prodArray = prodArray.filter((e) => e.name == prodName && e.price);
  // let uniqueArr = [];

  console.log(prodArray);

  if (!prodSelect.innerHTML.includes(prodName)) {
    prodSelect.innerHTML += `<option>${prodName}</option>`;
  }

  theId("product-name").value = `${prodName.toUpperCase()} added to list.`;
  setTimeout(() => {
    theId("product-name").value = prodName;
  }, 1000);
}

// Button - Add Price function
const prodPrice = theId("product-price");
const adminSuccess = theId("admin-success");
const adminAlert = theId("admin-alert");
theId("btn-add-price").addEventListener("click", () =>
  addPrice(prodPrice.value, prodSelect.value, adminSuccess, adminAlert)
);

function addPrice(myPrice, mySelect, adminSuccess, adminAlert) {
  // Checking if the fields are not empty
  if (myPrice && mySelect !== "Select") {
    prodArray = prodArray.map((element) =>
      element.name === mySelect ? { ...element, price: myPrice } : element
    );

    for (j of prodArray) {
      if (j.name === mySelect) {
        adminSuccess.textContent = `Successfully set ${j.name.toUpperCase()} price to $${
          j.price
        }`;

        setTimeout(() => {
          adminSuccess.textContent = "";
        }, 1400);
      }
    }
    console.log(prodArray);
  } else {
    adminAlert.textContent = "Error! Select a product and set the price.";

    setTimeout(() => {
      adminAlert.textContent = "";
    }, 1400);
  }
}

// Checkout functions

// Transaction button
const checkoutSelect = theId("checkout-select");
theId("trans-btn").addEventListener("click", () => newTrans(checkoutSelect));

function newTrans(checkoutSelect) {
  if (prodArray.length > 0) {
    theId("trans-alert").textContent = "Products and Price updated!";
    setTimeout(() => {
      theId("trans-alert").textContent = "";
    }, 1400);

    checkoutSelect.innerHTML = "";
    for (j of prodArray) {
      if (j.name && j.price) {
        const transactionText = `<option>${j.name} $${j.price}/Unit
      </option>`;
        checkoutSelect.innerHTML += transactionText;
      }
    }
  }
}

// Add to Cart button
let cartArr = [];
const quantity = theId("checkout-quantity");

theId("cart-btn").addEventListener("click", () =>
  addCart(quantity.value, checkoutSelect.value)
);

function addCart(quantity, checkoutSelect) {
  if (quantity && checkoutSelect !== "Select") {
    prodArray = prodArray.map((element) =>
      checkoutSelect.includes(element.name)
        ? { ...element, quantity: quantity }
        : element
    );
    for (j of prodArray) {
      if (checkoutSelect.includes(j.name)) {
        alert(`Added ${quantity} units of ${j.name.toUpperCase()} in cart.`);
      }
    }
    console.log(prodArray);
  }
}

theId("pay-btn").addEventListener("click", () => payFunc());

function payFunc() {
  theId("date").textContent = "Date : ";
  theId("time").textContent = "Time : ";
  theId("total-price").textContent = "Net Amount : ";
  theId("taxes").textContent = "Taxes(GST 18%) : ";
  theId("due").textContent = "Total Amount : ";
  // console.log(document.querySelectorAll(".not-hidden"));
  // document.querySelector(".not-hidden").style.display = "block";
  if (prodArray.length > 0) {
    for (i of document.querySelectorAll(".not-hidden")) {
      i.style.display = "block";
    }
    const date = new Date();
    const myDate = date.toLocaleDateString("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const myTime = date.toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
    });
    theId("date").textContent += myDate;
    theId("time").textContent += myTime;

    let totalPrice = 0;
    theId("table").innerHTML = `<tr>
    <th>Product</th>
    <th>$/unit</th>
    <th>Quantity</th>
    <th>Amount</th>
    </tr>`;
    for (j of prodArray) {
      if (j.name && j.price && j.quantity) {
        theId("table").innerHTML += `<tr>
      <th>${j.name}</th>
      <th>$${j.price}</th>
      <th>${j.quantity}</th>
      <th>$${(j.price * j.quantity).toFixed(2)}</th>
      </tr>`;
        totalPrice += j.price * j.quantity;
      }
    }

    theId("total-price").textContent += `$${totalPrice.toFixed(2)}`;

    const tax = 0.18 * totalPrice;
    theId("taxes").textContent += `$${tax.toFixed(2)}`;
    theId("due").textContent += `$${(totalPrice + tax).toFixed(2)}`;
  }
}
