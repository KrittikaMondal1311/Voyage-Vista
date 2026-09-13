# Voyage Vista — Your Travel Blog

A small, fast, no-framework travel blog. Plain HTML, CSS, and JavaScript —
no build step, no server required to run it locally.

## File structure

```
travel-blog/
├── index.html        the homepage (list of all entries)
├── post.html          template that renders a single entry
├── admin.html          the "Write" page — fill a form, get an updated data file
├── css/style.css       all styling
├── js/app.js            renders the homepage list
├── js/post.js           renders a single post
├── js/admin.js          builds a new posts.js file from the form
└── data/posts.js        your actual blog content — this is the only file
                        you'll routinely touch
```

## Running it locally

Because the pages load `data/posts.js` with a `<script>` tag (not `fetch`),
you can just double-click `index.html` and it will work directly in your
browser — no local server needed.

## Adding a new post

1. Open `admin.html` in your browser (from your live site, or locally).
2. Fill in the title, place, date, a short excerpt, and the body text
   (leave a blank line between paragraphs).
3. Click **Download updated posts.js**.
4. Replace `data/posts.js` in your project folder with the downloaded file.
5. Redeploy (or just refresh, if testing locally).

If you'd rather edit by hand, open `data/posts.js` directly — it's a plain
JavaScript array of objects with obvious fields (title, place, date,
excerpt, cover, body).

## Putting it online

This is a static site, so any of these work and are free for a personal
blog:

- **GitHub Pages** — push this folder to a GitHub repo, then turn on Pages
  in the repo settings. You get a URL like `yourname.github.io/repo`.
- **Netlify** — drag and drop this folder onto netlify.com/drop for an
  instant live URL. You can connect a custom domain later.
- **Vercel** — similar to Netlify; connect a GitHub repo or drag-and-drop
  via the dashboard.

## Customizing the look

All design tokens (colors, fonts) live at the top of `css/style.css` under
`:root`. Change the hex values there to shift the whole site's palette.
Headline font and body font are loaded from Google Fonts in the `<head>`
of each HTML file — swap the `<link>` and the `--serif` / `--sans`
variables together if you want a different typeface pairing.

## A note on the "Write" page

`admin.html` doesn't have a server or database behind it — it's a static
site, so there's nowhere for it to save things permanently on its own.
It works by reading your current posts, adding the new one, and handing
you back a fresh `posts.js` file to drop into your project. That's the
simplest approach that needs no hosting costs or backend.

If you outgrow this later and want to publish posts from your phone
without redeploying files, the natural next step is swapping `data/posts.js`
for a small backend (e.g. a free tier on Supabase or Firebase) — happy to
help with that migration whenever you're ready.
