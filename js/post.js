(function () {
  const root = document.getElementById("post-root");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("p");
  const posts = typeof POSTS !== "undefined" ? POSTS : [];
  const post = posts.find((p) => p.id === id);

  if (!post) {
    root.innerHTML = `
      <a href="index.html" class="back">&larr; Back to the journal</a>
      <p class="empty-state">This entry couldn't be found. It may have been renamed or removed.</p>
    `;
    return;
  }

  document.getElementById("doc-title").textContent = post.title + " \u2014 Voyage Vista";
  document.getElementById("doc-description").content = post.excerpt || "Travel stories from Voyage Vista.";
  document.getElementById("og-title").content = post.title + " \u2014 Voyage Vista";
  document.getElementById("og-description").content = post.excerpt || "Travel stories from Voyage Vista.";
  document.getElementById("og-url").content = window.location.href;

  const structuredData = document.createElement("script");
  structuredData.type = "application/ld+json";
  structuredData.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "Travel stories from Voyage Vista.",
    datePublished: post.date,
    url: window.location.href,
    author: { "@type": "Organization", name: "Voyage Vista" },
    publisher: { "@type": "Organization", name: "Voyage Vista" }
  });
  document.head.appendChild(structuredData);

  const bodyHtml = (post.body || [])
    .map((para) => `<p>${escapeHtml(para)}</p>`)
    .join("\n");

  const coverHtml = post.cover
    ? `<img class="cover" src="${escapeAttr(post.cover)}" alt="${escapeAttr(post.title)}" />`
    : "";

  root.innerHTML = `
    <a href="index.html" class="back">&larr; Back to the journal</a>
    <p class="place">${escapeHtml(post.place || "")}</p>
    <h1>${escapeHtml(post.title || "")}</h1>
    <p class="date">${escapeHtml(post.date || "")}</p>
    ${coverHtml}
    <div class="body">${bodyHtml}</div>
  `;

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
  function escapeAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }
})();
