let products = ['rice', 'sugar', 'wheat', 'cheese'];
let productPrices = [16.89, 56.92, 20.89, 345.99];
let productSold = [];
let soldPrice = [];

const priceCheck = (
  products = ['rice', 'sugar', 'wheat', 'cheese'],
  productPrices = [16.89, 56.92, 20.89, 345.99],
  productSold = ['rice', 'cheese'],
  soldPrice = [18.99, 400.89]
) => {
  return productSold.reduce((accumulator, currentValue, currentIndex) => {
    const index = products.indexOf(currentValue);
    if (index === -1) {
      return accumulator;
    }

    const error = productPrices[index] > soldPrice[currentIndex] ? 0 : 1;

    return accumulator + error;
  }, 0);
};

const findExpectedPrice = (index) => {
  const productIndex = products.indexOf(productSold[index]);

  let expectedPrice = 1;
  let error = 'yes';
  if (productIndex !== -1) {
    expectedPrice = productPrices[productIndex] | 1;
    error = expectedPrice > soldPrice[index] ? 'no' : 'yes';
  }

  return { expectedPrice, error };
};

const updateCart = () => {
  const productInCart = document.createElement('tr');
  for (let i = 0; i < productSold.length; i++) {
    const { expectedPrice, error } = findExpectedPrice(i);
    productInCart.innerHTML = `
            <td>${productSold[i]}</td>
            <td>${soldPrice[i]}</td>
            <td>${expectedPrice}</td>
            <td>${error}</td>
        `;
  }

  document.getElementById('shopping-table').appendChild(productInCart);

  const errorsNumber = priceCheck(
    products,
    productPrices,
    productSold,
    soldPrice
  );

  document.getElementById('summary-errors-number').innerHTML =
    errorsNumber.toString();
};

const updateProducts = () => {
  let productsStringHTML = '';
  let optionsStringHTML = '';
  for (let i = 0; i < products.length; i++) {
    productsStringHTML += `
            <div class="product">
                <div class="product-name">${products[i]}</div>
                <div>
                    Price: ${productPrices[i] || 1}
                </div>
            </div>
        `;

    optionsStringHTML += `
            <option value="${products[i]}">${products[i]}</option>
        `;
  }

  document.getElementById('products').innerHTML = productsStringHTML;

  document.getElementById('products-selector').innerHTML = optionsStringHTML;
};

window.onload = () => {
  updateProducts();
};

const onPriceChange = (value, id) => {
  let price = value;

  if (value < 1) {
    price = 1;
  } else if (value > 100000) {
    price = 100000;
  }

  document.getElementById(id).value = price;
};

const addNewProduct = () => {
  const newProductName = document.getElementById('new-product-name').value.trim();
  if (!newProductName) {
    alert('This product name is empty!');
    return;
  }
  const newProductExist = products.indexOf(newProductName);
  if (newProductExist !== -1) {
    alert('This product already exist!');
    return;
  }
  products.push(newProductName);
  productPrices.push(document.getElementById('new-product-price').value);
  document.getElementById('new-product').innerHTML =
    '<button onclick="onProductAdd()">Add product</button>';
  updateProducts();
};

const onProductAdd = () => {
  document.getElementById('new-product').innerHTML = `
        <div>
            <labe>New product name:</labe>
            <input id="new-product-name"/>
        </div>
        <div>
            <labe>New product price:</labe>
            <input
                id="new-product-price"
                type="number"
                min="1.00"
                max="100000.00"
                step="0.01"
                value="1.00"
                oninput="onPriceChange(this.value, this.id)"
            />
        </div>
        <div>
            <button onclick="addNewProduct()">OK</button>
        </div>
    `;
};

const addProductToCart = () => {
  productSold.push(document.getElementById('products-selector').value);
  soldPrice.push(document.getElementById('add-product-price').value);
  updateCart();
};
