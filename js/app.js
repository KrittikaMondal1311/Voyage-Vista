(function () {
  const container = document.getElementById("entries");
  const posts = (typeof POSTS !== "undefined" ? POSTS : []).slice().reverse();

  if (!posts.length) {
    const p = document.createElement("p");
    p.className = "empty-state";
    p.textContent = "No entries yet. Head to \u201cWrite\u201d to add your first one.";
    container.appendChild(p);
    return;
  }

  posts.forEach((post) => {
    const a = document.createElement("a");
    a.className = "entry";
    a.href = `post.html?p=${encodeURIComponent(post.id)}`;

    a.innerHTML = `
      <div class="stamp">${escapeHtml(post.date || "")}</div>
      <div class="content">
        <h2>${escapeHtml(post.title || "Untitled entry")}</h2>
        <p class="place">${escapeHtml(post.place || "")}</p>
        <p>${escapeHtml(post.excerpt || "")}</p>
      </div>
    `;
    container.appendChild(a);
  });

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
