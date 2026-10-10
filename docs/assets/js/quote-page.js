/**
 * Quote page: renders the order summary from the cart and builds the
 * copyable text block the customer sends to Dr. Ruan over WeChat.
 */
function buildQuoteId() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return 'RQ-' + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate())
    + '-' + pad(now.getHours()) + pad(now.getMinutes());
}

function buildOrderText(items, quoteId) {
  const lines = items.map((i) => `· ${i.name} — ${i.qty}克 × ¥${i.pricePer100g.toFixed(2)}/100克 = ${formatPrice(i.subtotal)}`);
  const total = items.reduce((sum, i) => sum + i.subtotal, 0);
  return [
    `阮氏中医 中药商城 — 订单询价单`,
    `编号：${quoteId}`,
    ``,
    ...lines,
    ``,
    `预估总价：${formatPrice(total)}（不含运费，以最终报价为准）`
  ].join('\n');
}

function renderQuote() {
  const items = getCartDetailed();
  const hasItems = document.getElementById('quoteHasItems');
  const empty = document.getElementById('quoteEmpty');

  if (items.length === 0) {
    hasItems.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  hasItems.style.display = 'block';
  empty.style.display = 'none';

  const quoteId = buildQuoteId();
  document.getElementById('quoteId').textContent = '询价单编号：' + quoteId;

  document.getElementById('quoteLines').innerHTML = items.map((i) => `
    <div class="quote-line">
      <span>${i.name} · ${i.qty}克</span>
      <span>${formatPrice(i.subtotal)}</span>
    </div>
  `).join('');

  document.getElementById('quoteTotal').textContent = formatPrice(cartTotal());

  const orderText = buildOrderText(items, quoteId);
  document.getElementById('copyBtn').addEventListener('click', function () {
    navigator.clipboard.writeText(orderText).then(() => {
      const fb = document.getElementById('copyFeedback');
      fb.classList.add('show');
      setTimeout(() => fb.classList.remove('show'), 2500);
    }).catch(() => {
      alert('无法自动复制，请手动选取以下内容：\n\n' + orderText);
    });
  });
}

document.addEventListener('DOMContentLoaded', renderQuote);
