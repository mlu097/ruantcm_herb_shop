/**
 * Shop page: renders the product grid and the click-to-expand detail
 * modal with the gram-amount stepper and "add to cart" action.
 */
let activeProduct = null;

function renderProductGrid() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = PRODUCTS.map((p) => `
    <div class="product-card" data-id="${p.id}">
      <div class="thumb">${p.icon}</div>
      <div class="info">
        <h3>${p.name}</h3>
        <div class="benefit">${p.benefit}</div>
        <div class="price">¥${p.pricePer100g.toFixed(2)} <small>/ 100克</small></div>
        <span class="view-more">点击查看详情 →</span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.id));
  });
}

function openModal(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  activeProduct = product;

  document.getElementById('modalIcon').textContent = product.icon;
  document.getElementById('modalBenefit').textContent = product.benefit;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalDesc').textContent = product.description;
  document.getElementById('modalUnitPrice').textContent = '¥' + product.pricePer100g.toFixed(2);
  document.getElementById('modalQty').value = 100;
  document.getElementById('addedNote').classList.remove('show');
  updateModalSubtotal();

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  activeProduct = null;
}

function updateModalSubtotal() {
  if (!activeProduct) return;
  const qty = Math.max(50, parseInt(document.getElementById('modalQty').value, 10) || 50);
  const subtotal = (qty / 100) * activeProduct.pricePer100g;
  document.getElementById('modalSubtotal').textContent = formatPrice(subtotal) + '（' + qty + ' 克）';
}

document.addEventListener('DOMContentLoaded', function () {
  renderProductGrid();

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  document.getElementById('qtyMinus').addEventListener('click', function () {
    const input = document.getElementById('modalQty');
    input.value = Math.max(50, (parseInt(input.value, 10) || 100) - 50);
    updateModalSubtotal();
  });
  document.getElementById('qtyPlus').addEventListener('click', function () {
    const input = document.getElementById('modalQty');
    input.value = (parseInt(input.value, 10) || 100) + 50;
    updateModalSubtotal();
  });
  document.getElementById('modalQty').addEventListener('input', updateModalSubtotal);
  document.getElementById('modalQty').addEventListener('change', function () {
    const input = document.getElementById('modalQty');
    let v = parseInt(input.value, 10) || 100;
    v = Math.max(50, Math.round(v / 50) * 50);
    input.value = v;
    updateModalSubtotal();
  });

  document.getElementById('addToCartBtn').addEventListener('click', function () {
    if (!activeProduct) return;
    const qty = Math.max(50, parseInt(document.getElementById('modalQty').value, 10) || 50);
    addToCart(activeProduct.id, qty);
    document.getElementById('addedNote').classList.add('show');
  });
});
