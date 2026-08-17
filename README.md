# gutter puddle

Blank static site with a [Chattable](https://iframe.chat/) chatroom embed,
ready to deploy on Vercel.

## Files

- `index.html` — the homepage, including the Chattable script + iframe
- `bookshelf.html` / `bookshelf.js` — the bookshelf board listing, reads entries from Sanity
- `entry.html` / `entry.js` — a single board entry page, works for any board via `?board=` in the URL
- `sanity-config.js` — public project ID/dataset for the site's Sanity reads
- `sanity-client.js` — tiny fetch-based Sanity client (no npm dependency)
- `portable-text.js` — renders Sanity's rich text (Portable Text) to HTML
- `styles.css` — site styling (this is *not* the chat's stylesheet)
- `studio/` — the Sanity Studio admin app for adding/editing board entries (see `studio/README.md`)

## Admin backend (Sanity)

Board entries (title, rich text body with inline images, etc.) are managed in
[Sanity](https://sanity.io) rather than hardcoded. Multiple people can be
invited to log into the Studio and add content — no shared password needed.

See `studio/README.md` for one-time setup (creating the project, inviting
members, and configuring CORS so the public site can read the data).

## The chat

Chat ID `13739958`, managed at [iframe.chat/dashboard](https://iframe.chat/dashboard/).

The chat's own look lives in `chattable.css`, loaded via
`chattable.initialize({ stylesheet: "/chattable.css" })` at the bottom of
`index.html`. The loader script fetches that file from this site and injects it
*inside* the iframe, so `url()` paths in it resolve against `iframe.chat` —
which is why `/media/wvy.gif` works. Prebuilt themes are the alternative:
`{ theme: "retrowave red" }`, listed at [the demo](https://iframe.chat/demo/).

## Local preview

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Import the repo at [vercel.com/new](https://vercel.com/new). No build step or
framework needed — Vercel serves the static files as-is.
