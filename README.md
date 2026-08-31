# The Library of Dreams

A responsive static archive for Dollie’s characters, fictional worlds and Library records.

## Local preview

Open `index.html` directly, or run a local static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Character archive

Public character records live in `characters.html`. Released characters can link to their available platforms; unreleased records remain visible with a pending status. Character artwork belongs in `assets/characters/`. Use `assets/characters/unreleased-bot.webp` when a pending bot does not yet have an approved visual.

## Shared Dollie theme

`script.js` loads `dollie-theme.css` across the site. The shared theme uses Dollie’s dark pink creator-room palette and the bundled pixel font while preserving the existing world and atlas layouts.

## Deployment

GitHub Pages deploys from `main` through `.github/workflows/pages.yml`. The repository also includes `.nojekyll` so static assets are served without Jekyll processing.

## Adding Dollie & Killian pictures

1. Upload the new picture into `assets/library/`.
2. Open `library.html`.
3. Find the commented `TO ADD A PICTURE` area.
4. Duplicate the prepared `memory-card` figure and change the image filename, alt text, title and caption.
