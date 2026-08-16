# gutter puddle

Blank static site with a [Chattable](https://iframe.chat/) chatroom embed,
ready to deploy on Vercel.

## Files

- `index.html` — the page, including the Chattable script + iframe
- `styles.css` — minimal page styling (this is *not* the chat's stylesheet)

## The chat

Chat ID `13739958`, managed at [iframe.chat/dashboard](https://iframe.chat/dashboard/).

Styling the chat itself is done through `chattable.initialize()` at the bottom
of `index.html` — either a prebuilt `theme` (see [the demo](https://iframe.chat/demo/))
or `{ stylesheet: "chattable.css" }` pointing at your own file in this directory.

## Local preview

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Import the repo at [vercel.com/new](https://vercel.com/new). No build step or
framework needed — Vercel serves the static files as-is.
