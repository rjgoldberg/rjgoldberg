// This file renders SITE_CONTENT (from content.js) into the page.
// You shouldn't need to edit this — go edit content.js instead.

document.addEventListener("DOMContentLoaded", () => {
  const c = SITE_CONTENT;

  document.title = `${c.name} — Copywriter`;

  set("eyebrow", c.eyebrow);
  set("headlineBefore", c.headlineBefore + " ");
  set("strikeWord", c.strikeWord);
  set("insertWord", c.replacementWord);
  set("headlineAfter", c.headlineAfter ? " " + c.headlineAfter : "");
  set("subhead", c.subhead);
  set("aboutParagraph", c.aboutParagraph);
  set("marginNote", c.marginNote);
  set("footerName", c.name);
  set("footerYear", c.year);

  const emailLink = document.getElementById("emailLink");
  emailLink.href = `mailto:${c.email}`;
  emailLink.textContent = c.email;

  const socialsEl = document.getElementById("socials");
  (c.socials || []).forEach((s, i) => {
    const a = document.createElement("a");
    a.href = s.url;
    a.textContent = s.label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    socialsEl.appendChild(a);
  });

  renderPortfolio(c.portfolio || []);
});

function set(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderPortfolio(items) {
  const grid = document.getElementById("portfolioGrid");
  grid.innerHTML = "";

  if (items.length === 0) {
    // Empty state: styled as blank manuscript drafts, not a bare "coming soon"
    const placeholders = [
      { label: "DRAFT — 01", hint: "Add your first project in content.js" },
      { label: "DRAFT — 02", hint: "This one's still unwritten" },
      { label: "DRAFT — 03", hint: "Room for a third, when you're ready" },
    ];
    placeholders.forEach(p => {
      const card = document.createElement("div");
      card.className = "draft-card";
      card.innerHTML = `<span class="draft-label">${p.label}</span><span class="draft-hint">${p.hint}</span>`;
      grid.appendChild(card);
    });
    return;
  }

  items.forEach(item => {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = item.url || "#";
    card.target = item.url ? "_blank" : "_self";
    card.rel = "noopener noreferrer";
    card.innerHTML = `
      <div>
        <div class="project-title">${item.title}</div>
        <div class="project-desc">${item.description}</div>
      </div>
      <div class="project-arrow">read it →</div>
    `;
    grid.appendChild(card);
  });
}
