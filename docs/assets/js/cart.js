/**
 * Shared shopping-cart logic for the herb-shop mockup.
 * Cart state lives in localStorage so it persists across pages
 * (shop.html -> cart.html -> quote.html) without any backend.
 *
 * Cart entries store the product id and quantity in GRAMS:
 *   [{ id: 'renshen', qty: 150 }, ...]
 * Price/name/icon are always looked up fresh from PRODUCTS (products.js)
 * at render time, never duplicated into the cart itself.
 */

const CART_KEY = 'zyt_cart_v1';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    /* localStorage unavailable (private mode, etc.) — cart just won't persist */
  }
  updateCartBadge();
}

function addToCart(id, qty) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  item.qty = qty;
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

/** Cart entries joined with product data (name/price/icon). Requires
 *  products.js to be loaded on the page calling this. */
function getCartDetailed() {
  if (typeof PRODUCTS === 'undefined') return [];
  const cart = getCart();
  return cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return null;
      const subtotal = (item.qty / 100) * product.pricePer100g;
      return {
        id: product.id,
        name: product.name,
        icon: product.icon,
        pricePer100g: product.pricePer100g,
        qty: item.qty,
        subtotal: subtotal
      };
    })
    .filter(Boolean);
}

function cartTotal() {
  return getCartDetailed().reduce((sum, item) => sum + item.subtotal, 0);
}

function formatPrice(n) {
  return '¥' + n.toFixed(2);
}

/** Updates every .cart-badge element on the page (header icon) to show
 *  the number of distinct products currently in the cart. */
function updateCartBadge() {
  const count = getCart().length;
  document.querySelectorAll('.cart-badge').forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
