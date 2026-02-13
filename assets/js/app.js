/**
 * DexNeXuS Hub — load site.json + cards.json, render header socials and card grid.
 * Edit assets/data/site.json and assets/data/cards.json to change content.
 */

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isExternalUrl(url) {
  if (!url || typeof url !== "string") return false;
  return url.startsWith("http://") || url.startsWith("https://");
}

async function loadJson(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
  return res.json();
}

function renderSocials(container, links) {
  if (!container || !Array.isArray(links) || links.length === 0) {
    if (container) container.innerHTML = "";
    return;
  }
  container.innerHTML = links
    .map(
      (l) =>
        `<a href="${escapeHtml(l.href || "#")}" target="_blank" rel="noopener noreferrer" class="hub-social-link" aria-label="${escapeHtml(l.label || "Link")}">
          <span class="iconify" data-icon="${escapeHtml(l.icon || "mdi:link")}" aria-hidden="true"></span>
        </a>`
    )
    .join("");
}

function renderCards(grid, cards) {
  if (!grid || !Array.isArray(cards) || cards.length === 0) {
    if (grid) grid.innerHTML = "<p class=\"hub-muted\">Edit <code>assets/data/cards.json</code> to add cards.</p>";
    return;
  }

  const cardHtml = cards
    .map((c) => {
      const title = (c.title || "Untitled").trim();
      const desc = (c.description || "").trim();
      const url = (c.url || "#").trim();
      const image = (c.image || "").trim();
      const external = isExternalUrl(url);
      const attrs = external
        ? `target="_blank" rel="noopener noreferrer"`
        : "";

      const imgBlock = image
        ? `<div class="hub-card-image-wrap"><img src="${escapeHtml(image)}" alt="" loading="lazy" /></div>`
        : `<div class="hub-card-image-wrap"><span class="hub-card-image-placeholder" aria-hidden="true">${escapeHtml(title.charAt(0))}</span></div>`;

      return `<a class="hub-card" href="${escapeHtml(url)}" ${attrs} role="listitem">
        ${imgBlock}
        <div class="hub-card-body">
          <h2 class="hub-card-title">${escapeHtml(title)}</h2>
          <p class="hub-card-desc">${escapeHtml(desc || "—")}</p>
        </div>
        <span class="hub-card-arrow" aria-hidden="true"><span class="iconify" data-icon="mdi:arrow-top-right"></span></span>
      </a>`;
    })
    .join("");

  grid.innerHTML = cardHtml;
}

async function init() {
  const brandTitle = document.getElementById("hubBrandTitle");
  const brandTagline = document.getElementById("hubBrandTagline");
  const heroDesc = document.getElementById("hubHeroDesc");
  const socialsEl = document.getElementById("hubSocials");
  const cardsGrid = document.getElementById("hubCardsGrid");

  try {
    const [site, data] = await Promise.all([
      loadJson("assets/data/site.json"),
      loadJson("assets/data/cards.json"),
    ]);

    if (site) {
      if (brandTitle && site.title) brandTitle.textContent = site.title;
      if (brandTagline && site.tagline) brandTagline.textContent = site.tagline;
      if (heroDesc && site.description) heroDesc.textContent = site.description;
      if (socialsEl && Array.isArray(site.links)) renderSocials(socialsEl, site.links);
    }

    if (cardsGrid && data && Array.isArray(data.cards)) {
      renderCards(cardsGrid, data.cards);
    } else if (cardsGrid) {
      renderCards(cardsGrid, []);
    }
  } catch (e) {
    console.error("Hub init error:", e);
    if (cardsGrid) cardsGrid.innerHTML = "<p class=\"hub-muted\">Could not load cards. Check <code>assets/data/cards.json</code>.</p>";
  }
}

init();
