// This file renders SITE_CONTENT (from content.js) into the page.
// You shouldn't need to edit this — go edit content.js instead.

document.addEventListener("DOMContentLoaded", () => {
  const c = SITE_CONTENT;

  document.title = `${c.name} — ${c.label}`;

  set("name", c.name);
  set("label", c.label);
  set("aboutParagraph", c.aboutParagraph);
  set("footerYear", c.year);

  const emailLink = document.getElementById("emailLink");
  emailLink.href = `mailto:${c.email}`;
  emailLink.textContent = c.email;

  const socialsEl = document.getElementById("socials");
  (c.socials || []).forEach(s => {
    const a = document.createElement("a");
    a.href = s.url;
    a.textContent = s.label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    socialsEl.appendChild(a);
  });

  renderProjects(c.projects || []);
});

function set(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderProjects(items) {
  const list = document.getElementById("projectsList");
  list.innerHTML = "";

  if (items.length === 0) {
    const p = document.createElement("p");
    p.className = "empty-note";
    p.textContent = "Nothing published yet.";
    const hint = document.createElement("span");
    hint.className = "empty-hint";
    hint.textContent = "Add a project in content.js and it'll appear here.";
    p.appendChild(hint);
    list.appendChild(p);
    return;
  }

  items.forEach(item => {
    const row = document.createElement("a");
    row.className = "project-row";
    row.href = item.url || "#";
    row.target = item.url ? "_blank" : "_self";
    row.rel = "noopener noreferrer";
    row.innerHTML = `
      <span class="project-title">${item.title}</span>
      <span class="project-desc">${item.description}</span>
    `;
    list.appendChild(row);
  });
}
