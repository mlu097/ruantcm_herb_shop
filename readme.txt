=== Ruan's Traditional Chinese Herbalist ===
Contributors: 
Requires at least: 5.9
Tested up to: 6.6
Requires PHP: 7.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

A four-language (Simplified Chinese / English / Español / Tiếng Việt)
WordPress theme built for Ruan's Traditional Chinese Herbalist —
Dr. Ruan Bin (阮斌), specializing in Internal Medicine, Pediatrics,
Gynecology, Men's Health, and Dermatology.

Every homepage section is its own custom Gutenberg block, editable
directly in the WordPress block editor:

* Dr. Ruan: Hero
* Dr. Ruan: About
* Dr. Ruan: Testimonials
* Dr. Ruan: Specialties
* Dr. Ruan: Philosophy
* Dr. Ruan: Featured Herbs
* Dr. Ruan: CTA Banner
* Dr. Ruan: Contact

Each block has a four-language editor: a Chinese field plus matching
English, Spanish, and Vietnamese fields for every piece of text, so the
language dropdown on the front end always stays in sync with whatever
you've written. The dropdown (top-right of the nav bar) lets visitors
switch between 中文, English, Español, and Tiếng Việt.

The Blog block is the one exception - it doesn't have text fields to
fill in, because it pulls your actual WordPress posts automatically.
Write and manage articles the normal way, through Posts > Add New; the
block just displays your most recent ones as cards, with a link to each
full post (styled to match the rest of the site, via single.php) and a
"View all articles" link to your posts archive.

Other features:
* Red-and-white apothecary-inspired design with a hand-drawn seal motif
* Patient testimonials carousel (add as many as you like; 3 show at a
  time with arrow navigation)
* Featured Herbs block with a real photo-upload box per herb (falls back
  to a plain icon if you haven't uploaded one yet)
* Sticky navigation with a mobile menu
* Built-in accessibility widget: adjustable text size, high-contrast mode,
  underlined links, and reduced-motion toggle
* Skip-to-content link, focus-visible outlines, and aria-labeled controls
* Medical disclaimer footer bar
* Forces light color-scheme so the design doesn't get overridden by a
  visitor's device dark-mode setting

== Installation ==

1. Upload the entire `dr-ruan-tcm` folder to `/wp-content/themes/`
   (or upload it as a .zip via Appearance > Themes > Add New > Upload Theme).
2. Activate the theme through the 'Appearance' menu in WordPress.
3. Create a new Page (Pages > Add New).
4. Open the block inserter, switch to the "Patterns" tab, and search for
   "Dr. Ruan: Full Homepage". Insert it - this adds all eight sections,
   pre-filled with the current content, ready to edit.
5. Edit any text, image, or link directly in each block. Every text field
   has a Chinese box and an English box right below it.
6. Publish the page, then go to Settings > Reading and set it as your
   static front page.
7. Optional: go to Appearance > Menus and assign a menu to the
   "Primary Menu" location if you want to manage nav links from the
   WordPress admin instead of the built-in defaults.

== Notes ==

Because content now lives in the block editor rather than hardcoded
template files, duplicating, reordering, or removing a block (e.g. adding
a second Testimonials block, or reordering sections) works the way you'd
expect in any WordPress page. The testimonial carousel and language
toggle both work correctly no matter how many block instances are on the
page.

The six featured-herb photos are uploaded per-item inside the Featured
Herbs block itself (not through the Customizer, which this theme no
longer uses for that purpose).

== Changelog ==

= 3.8 =
* Pointed every "预约" booking button (header nav, hero, CTA banner,
  contact card) to the real booking platform, https://book.ruantcm.com,
  instead of the placeholder link. Updated the nav button's English
  label from "Call to Book" to "Book Now" to match. Note: this changes
  the *defaults* for new block instances - if you already have these
  blocks placed on a page, update each button's URL field in the
  Settings sidebar to pick up the change.

= 3.7 =
* Fixed the Testimonials block's live preview specifically - it has by
  far the largest attribute payload of any block (10 testimonials x up
  to 9 fields x 4 languages), which was exceeding the URL length used
  by the preview's default GET request. It now uses POST instead.
* Fixed a side-padding/alignment issue in the Testimonials section: the
  carousel arrows were pushing the cards inward, so they didn't line up
  with the heading text above them or with other sections' edges. The
  cards now span the full width and the arrows float as overlay buttons
  instead.
* Audited all font-weight declarations site-wide for consistency.

= 3.6 =
* Fixed a regression from 3.4: loading the theme's CSS into the block
  editor (to fix icon sizing) had an unintended side effect - the
  scroll-reveal animation's "start hidden, fade in on scroll" CSS now
  applied inside the editor canvas too, but the JavaScript that reveals
  it only runs on the live site, not in the editor. This made every
  section using that animation (About, Specialties, Testimonials,
  Featured Herbs, CTA Banner, Contact, Blog) render successfully but
  invisibly in block previews. The hidden starting state now only
  applies via JavaScript on the real front end, so content is visible
  by default anywhere that script doesn't run.

= 3.5 =
* Fixed the live preview showing "Preview unavailable" on the five
  blocks that use repeater fields (Specialties, Testimonials,
  Philosophy, Featured Herbs, Contact). Their "items" list wasn't fully
  described to WordPress's block schema, which caused the preview
  request to fail validation. All five now render correctly in the
  editor canvas.

= 3.4 =
* Fixed the block editor not loading the theme's fonts and stylesheet.
  Previously, live block previews (and the editor canvas generally) fell
  back to unstyled defaults for anything only the theme CSS controlled -
  most visibly, the Featured Herbs placeholder icon rendering far too
  large when no photo was uploaded yet. The editor now matches the live
  site.

= 3.3 =
* Every block now shows a live, styled preview in the canvas as you
  edit (via ServerSideRender), instead of a static placeholder card.
  The preview updates automatically as you change fields in the
  Settings sidebar.
* Renamed nav links: 購買藥材 → 商城, 部落格 → 學習園地.

= 3.2 =
* Redesigned every block's editing experience: all fields now live in
  the Settings sidebar (the Inspector panel on the right), and the
  canvas shows a simple placeholder card instead of a long form. This
  matches the standard WordPress editing pattern and keeps the page
  canvas readable while you work.

= 3.1 =
* Added a real search box to the Blog block, backed by WordPress's native
  search (with a new search.php template styled to match the site).
* Blog articles (card previews and full single posts) now discourage
  casual copy/paste and right-click saving. This is a deterrent, not a
  real security measure - it doesn't stop view-source, browser dev
  tools, disabling JavaScript, or screenshots.
* Added WeChat and Facebook rows to the Contact block. The Contact
  block's repeater items now support an optional Link URL field, so
  any row can be made clickable (used for Facebook here) while others
  stay plain text (used for the WeChat ID here).
* Fixed a gap from the 3.0 update: the Contact block's info-row editor
  was missing its Spanish/Vietnamese label fields.

= 3.0 =
* Replaced the EN toggle button with a language dropdown supporting
  four languages: 中文 (Simplified Chinese), English, Español, and
  Tiếng Việt.
* Every block's editor now has four fields per piece of text (Chinese,
  English, Spanish, Vietnamese) instead of two.
* All default content across all nine blocks now ships pre-translated
  into Spanish and Vietnamese, matching the existing English content.

= 2.1 =
* Added a Blog block (Dr. Ruan: Blog) that displays your most recent
  WordPress posts as article cards, plus a matching single.php template
  for reading full posts. Added a "部落格 / Blog" link to the nav bar.

= 2.0 =
* Converted every homepage section into its own custom Gutenberg block
  with a full bilingual editing UI.
* Replaced the Customizer-based herb image uploader with per-item image
  uploads inside the Featured Herbs block.
* Language toggle now reads each element's own data, so it works with
  any amount of block content instead of a fixed set of hardcoded ids.

= 1.0 =
* Initial release, ported from the custom static site design.

