# gutter puddle — Sanity Studio

This is the admin backend for the site. Anyone invited to the Sanity project
can log in here to add/edit entries on the bookshelf (and future boards)
using a full rich-text editor with inline images.

## One-time setup (do this once)

These steps need your own login, so run them yourself in a terminal:

```sh
cd studio
npm install

# Log in with a Sanity account (opens your browser)
npx sanity login

# Create the actual Sanity project (choose a project name, use dataset "production")
npx sanity init --dataset production
```

`sanity init` will ask if you want to "reconfigure" the existing project files —
say **no**, and instead just note the **Project ID** it prints out, or find it
later at [sanity.io/manage](https://sanity.io/manage).

Create `studio/.env` (copy `studio/.env.example`) and fill in your project ID:

```
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

Then update the **same** project ID and dataset in `../sanity-config.js` at
the repo root (this is what the public site uses to read content — it's
fine to commit, these values aren't secret).

## Running the Studio locally

```sh
cd studio
npm run dev
```

Opens at http://localhost:3333.

The **first thing** to do inside the Studio: create one **Board** document
with title `bookshelf` (the slug will auto-fill to `bookshelf`). Board
entries won't show up on the site until they're linked to a board.

## Inviting other admins

Go to [sanity.io/manage](https://sanity.io/manage) → your project →
**Members** → **Invite members**. Each person gets their own login
(Google, GitHub, email, etc.) and can log into the same Studio to add
content — no shared password needed.

## Allowing the live site to read content

Go to [sanity.io/manage](https://sanity.io/manage) → your project →
**API** → **CORS origins**, and add:

- `http://localhost:8000` (or whatever port you use for local preview)
- Your deployed site's URL (e.g. `https://your-site.vercel.app`)

Without this, the public site's `fetch()` calls to Sanity will be blocked
by the browser.

## Publishing your Studio for teammates (optional)

Instead of everyone running the Studio locally, you can host it for free:

```sh
cd studio
npm run deploy
```

This gives you a URL like `https://gutter-puddle.sanity.studio` that any
invited member can log into directly.

## Adding a new board (e.g. beyond "bookshelf")

1. In the Studio, create a new **Board** document with the title/slug you want
   (e.g. `zine`).
2. Copy `bookshelf.html`, `bookshelf.js` on the site, renaming references from
   `"bookshelf"` to your new board's slug, and add a matching link from the
   homepage.
3. Entry pages (`entry.html`) already work for any board via the `?board=`
   query param — no changes needed there.
