# DexNeXuS Hub

Landing page for all your sites and links. One page, top bar with socials, cards in the centre — all driven by JSON so it’s easy to edit.

## Folders

- **assets/css** — styles (variables, layout, header, cards)
- **assets/js** — app.js loads data and renders the page
- **assets/data** — edit these to change content
- **assets/images** — put card images here and reference in `cards.json` (e.g. `assets/images/streaming.png`)

## How to edit

### Site title, tagline, description and socials

Edit **assets/data/site.json**:

- `title` — brand name in the header
- `tagline` — line under the title
- `description` — short line under the hero
- `links` — array of `{ "label": "GitHub", "href": "https://...", "icon": "simple-icons:github" }`. Use [Iconify](https://icon-sets.iconify.design/) icon names (e.g. `simple-icons:twitch`, `mdi:link`).

### Cards

Edit **assets/data/cards.json**:

- `cards` — array of objects:
  - `title` — card heading
  - `description` — short line under the title
  - `image` — path to image (e.g. `assets/images/mycard.png`) or leave `""` for a letter placeholder
  - `url` — where the card goes when clicked (full URL opens in a new tab; relative path like `../Streaming/index.html` opens in same tab)

Add or remove cards by editing the `cards` array. No build step — save the JSON and refresh the page.
