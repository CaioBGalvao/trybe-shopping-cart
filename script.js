const cart = document.querySelector('.cart__items');

function totalPrice() {
  const cartItens = [...cart.children];
  let totalPrices = 0;
  const priceHTML = document.querySelector('.total-price');
  cartItens.forEach((cartItem) => {
    const slitedString = cartItem.innerText.split('$'); 
    const itemPrice = parseFloat(slitedString[1]);
    totalPrices += itemPrice;
    priceHTML.innerHTML = `<strong>${totalPrices}</strong>`; // <<<<
  });
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function requisitoUm() {
  const sectionItens = document.querySelector('.items');
  const apiResponce = await fetchProducts('computador');
  console.log(fetchProducts('computador'));
  console.log(await fetchProducts('computador'));
  console.log(apiResponce);
  const produtos = apiResponce.results;
  produtos.forEach((produto) => {
    const param = {
      sku: produto.id,
      name: produto.title,
      image: produto.thumbnail,
    };
    sectionItens.appendChild(createProductItemElement(param));
  });
}

function getCart() {
  saveCartItems(cart.innerHTML); // do not alter the cart
  console.log('Esse é cart:', cart);
}

function excluiTudo() {
  cart.innerText = '';
  const zeroPriceHTML = document.querySelector('.total-price');
  zeroPriceHTML.innerHTML = '<strong>0.00</strong>';
}

function escutadoraRequisitoSeis() {
  const botaoExcluiTudo = document.querySelector('.empty-cart');
  botaoExcluiTudo.addEventListener('click', excluiTudo);
}

function cartItemClickListener(event) {
  event.target.remove();
  getCart();
  totalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function restoreCart() {
  cart.innerHTML = getSavedCartItems();
  cart.addEventListener('click', cartItemClickListener);
  totalPrice();
}

async function requisitoDois(event) {
  const idHTML = event.target.parentNode.firstChild;
  const id = idHTML.innerText;
  const infoProduct = await fetchItem(id);
  const param = {
    sku: infoProduct.id,
    name: infoProduct.title,
    salePrice: infoProduct.price,
  };
  cart.appendChild(createCartItemElement(param));
  getCart();
  totalPrice();
}

async function escutadoraRequisitoDois() {
  await fetchItem('MLB1607748387');
  const addCartButtom = document.querySelectorAll('.item__add');
  addCartButtom.forEach((buttom) => {
    buttom.addEventListener('click', requisitoDois);
  });
}

window.onload = () => {
  restoreCart();
  requisitoUm();
  escutadoraRequisitoDois();
  escutadoraRequisitoSeis();
};
