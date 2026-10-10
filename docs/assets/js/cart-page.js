/**
 * Cart page: renders editable cart rows and the summary totals.
 */
function renderCart() {
  const items = getCartDetailed();
  const hasItems = document.getElementById('cartHasItems');
  const empty = document.getElementById('cartEmpty');

  if (items.length === 0) {
    hasItems.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  hasItems.style.display = 'block';
  empty.style.display = 'none';

  const rows = document.getElementById('cartRows');
  rows.innerHTML = items.map((item) => `
    <tr data-id="${item.id}">
      <td><div class="cart-thumb">${item.icon}</div></td>
      <td>${item.name}</td>
      <td>¥${item.pricePer100g.toFixed(2)} / 100克</td>
      <td>
        <div class="cart-qty-cell">
          <input type="number" class="qty-input" min="50" step="50" value="${item.qty}" data-id="${item.id}">
          <span>克</span>
        </div>
      </td>
      <td class="subtotal">${formatPrice(item.subtotal)}</td>
      <td><button type="button" class="remove-row" data-id="${item.id}" aria-label="移除">&times;</button></td>
    </tr>
  `).join('');

  rows.querySelectorAll('.qty-input').forEach((input) => {
    input.addEventListener('change', function () {
      let v = parseInt(this.value, 10) || 50;
      v = Math.max(50, Math.round(v / 50) * 50);
      updateCartQty(this.dataset.id, v);
      renderCart();
    });
  });
  rows.querySelectorAll('.remove-row').forEach((btn) => {
    btn.addEventListener('click', function () {
      removeFromCart(this.dataset.id);
      renderCart();
    });
  });

  const totalWeight = items.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('summaryCount').textContent = items.length + ' 件商品';
  document.getElementById('summaryWeight').textContent = totalWeight + ' 克';
  document.getElementById('summaryTotal').textContent = formatPrice(cartTotal());
}

document.addEventListener('DOMContentLoaded', renderCart);
