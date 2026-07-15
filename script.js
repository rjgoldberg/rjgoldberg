// This file renders SITE_CONTENT (from content.js) into the page.
// You shouldn't need to edit this — go edit content.js instead.

document.addEventListener("DOMContentLoaded", () => {
  const c = SITE_CONTENT;
  document.title = `${c.name} — ${c.label}`;

  const board = document.getElementById("board");
  board.appendChild(introCard(c));
  board.appendChild(aboutCard(c));

  const projects = c.projects || [];
  if (projects.length === 0) {
    board.appendChild(emptyTextCard());
    board.appendChild(placeholderImageCard("Add a project image"));
  } else {
    projects.forEach((p, i) => {
      board.appendChild(projectTextCard(p, i));
      board.appendChild(placeholderImageCard(p.title));
    });
  }
});

function introCard(c) {
  const card = document.createElement("div");
  card.className = "card";
  const links = (c.socials || [])
    .map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>`)
    .join("");
  card.innerHTML = `
    <p class="intro-name">${c.name}</p>
    <p class="intro-label">${c.label}</p>
    <div class="intro-links">
      <a href="mailto:${c.email}">Email</a>${links}
    </div>
  `;
  return card;
}

function aboutCard(c) {
  const card = document.createElement("div");
  card.className = "card";
  const paragraphs = (c.aboutParagraph || "").split(/\n\s*\n/).filter(Boolean);
  card.innerHTML = `
    <div class="card-header"><p class="card-title">About</p></div>
    ${paragraphs.map(p => `<p>${p}</p>`).join("")}
  `;
  return card;
}

function projectTextCard(p, i) {
  const card = document.createElement("div");
  card.className = "card";
  const tag = `PROJECT_${String(i + 1).padStart(2, "0")}`;
  card.innerHTML = `
    <div class="card-header">
      <p class="card-title">${p.title}</p>
      <span class="card-tag">${tag}</span>
    </div>
    <p>${p.description || ""}</p>
    ${p.url ? `<a class="text-link" href="${p.url}" target="_blank" rel="noopener noreferrer">View project</a>` : ""}
  `;
  return card;
}

function emptyTextCard() {
  const card = document.createElement("div");
  card.className = "card empty-card";
  card.innerHTML = `
    <div class="card-header"><p class="card-title">Projects</p></div>
    <p>Nothing published yet.</p>
    <p class="hint">Add entries to the "projects" list in content.js and they'll appear here as cards, automatically.</p>
  `;
  return card;
}

function placeholderImageCard(caption) {
  const card = document.createElement("div");
  card.className = "card placeholder-card";
  card.innerHTML = `
    <div class="placeholder-box">
      <span class="placeholder-caption">${caption}</span>
    </div>
  `;
  return card;
}
