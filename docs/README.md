# 阮氏中医 — 中药商城 Mockup

A clickable static-HTML mockup of the herb shop flow: browse → pick a
gram amount → cart → "Get a Quote" → WeChat handoff. No backend, no
payment processing — this is a design/flow mockup for review, not the
final production site.

## Why this shape

Dr. Ruan currently only accepts **Zelle** and **WeChat Pay**, confirmed
one-on-one over WeChat after he sees the order — not an automated
checkout. So instead of a real payment flow, the site's job is to get the
customer to a clean, copyable order summary and then hand them off to
WeChat. "获取报价" (Get a Quote) replaces "Checkout."

## Pages

- `index.html` — homepage (placeholder branding until the updated main
  site file is provided — see "Known gaps" below)
- `shop.html` — 10 example products in a grid; clicking one opens a modal
  with the full description, a gram-amount stepper (50g increments,
  50g minimum), live subtotal, and "加入购物车"
- `cart.html` — editable cart: change grams per line, remove items, see
  running total
- `quote.html` — order summary + "复制订单信息" (copy order details)
  button, then step-by-step WeChat instructions and the Zelle/WeChat Pay
  note

## Editing product data / prices

Everything about the 10 example products — name, price per 100g, benefit
tagline, description, icon — lives in one file:

```
assets/js/products.js
```

All current prices are **placeholder example prices**. Edit this array to
change products or pricing; nothing else needs to change.

## Filling in the real WeChat ID

`quote.html` has a placeholder:

```html
微信号：<span id="wechatId">【请填写微信号 / WeChat ID】</span>
```

Replace `【请填写微信号 / WeChat ID】` with Dr. Ruan's actual WeChat ID
before this goes live.

## How the cart works

Cart contents are stored in the browser's `localStorage` (key
`zyt_cart_v1`) as `{ id, qty }` pairs — no server, no database. Product
name/price/icon are always looked up fresh from `products.js` at render
time, so the cart never goes stale if you edit a price. This is fine for
a mockup and for a small-business flow like this one, but it does mean
the cart is per-browser/per-device — it won't follow a customer from
their phone to their laptop. That's an acceptable tradeoff given the
WeChat-handoff model (the order only needs to survive long enough to get
copied and sent).

## Known gaps / things to confirm before this goes live

- **Homepage branding** — built from the last homepage file on file,
  which may be out of date (you mentioned a logo change). Once the
  current homepage is provided, `index.html`'s header/hero/footer should
  be re-matched to it.
- **WeChat ID** — placeholder, see above.
- **Shipping** — the quote explicitly says "不含运费" (excludes shipping)
  since there's no shipping-cost logic built in; Dr. Ruan adds that when
  confirming on WeChat.
- **No real inventory/stock tracking** — this is static product data, not
  connected to any inventory system. Fine for 10 herbs managed by one
  person; worth re-evaluating if the catalog grows a lot or multiple
  people manage stock.
- **One page per product?** — deliberately not done. For 10 products on
  a small-business site, separate pages just mean more files to keep in
  sync for no real benefit (no SEO/search need at this scale). The
  click-to-expand modal on `shop.html` covers the same ground with one
  page to maintain. Happy to add individual product pages later if there's
  a concrete reason (e.g. wanting to share a single herb's link on social
  media).

## Running locally

No build step. Open `index.html` directly in a browser, or serve the
folder with any static file server (e.g. `python3 -m http.server`) so
relative paths and `localStorage` behave normally.
