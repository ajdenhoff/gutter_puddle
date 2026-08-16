# gutter puddle

Blank static site with a [Chattable](https://iframe.chat/) chatroom embed,
ready to deploy on Vercel.

## Files

- `index.html` — the page, including the Chattable script + iframe
- `styles.css` — minimal page styling (this is *not* the chat's stylesheet)

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
