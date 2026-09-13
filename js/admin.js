(function () {
  const form = document.getElementById("post-form");
  const statusEl = document.getElementById("status");
  const output = document.getElementById("output");
  const preview = document.getElementById("preview");

  function slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "entry-" + Date.now();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const place = document.getElementById("place").value.trim();
    const date = document.getElementById("date").value.trim();
    const excerpt = document.getElementById("excerpt").value.trim();
    const cover = document.getElementById("cover").value.trim();
    const bodyRaw = document.getElementById("body").value.trim();

    if (!title) {
      statusEl.textContent = "A title is required.";
      return;
    }

    const bodyParagraphs = bodyRaw
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    const newPost = {
      id: slugify(title),
      title: title,
      place: place,
      date: date,
      excerpt: excerpt,
      cover: cover,
      body: bodyParagraphs,
    };

    const existing = typeof POSTS !== "undefined" ? POSTS : [];
    const updated = existing.concat([newPost]);

    const fileContents = buildPostsFile(updated);

    // Show a preview
    preview.textContent = JSON.stringify(newPost, null, 2);
    output.classList.add("visible");

    // Trigger download
    const blob = new Blob([fileContents], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "posts.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    statusEl.textContent = "Downloaded. Replace data/posts.js with this file.";
  });

  function buildPostsFile(posts) {
    const header = `// posts.js
// This is your blog's content. Each object below is one blog post.
// To add a new post, use admin.html, or copy an object below and edit it by hand.

const POSTS = `;
    const body = JSON.stringify(posts, null, 2);
    return header + body + ";\n";
  }
})();
