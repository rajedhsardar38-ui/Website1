# MK Studio - APK Download Hub

Ready to deploy on GitHub Pages. No build step needed — plain HTML/CSS/JS.

## Before/after uploading, edit `script.js`

Open `script.js`, find `window.MK_CONFIG` near the top, and update at least:

- `apkUrl` — your actual APK download link (best: a GitHub Release asset link)
- `appName`, `version`, `fileSize`, `updatedDate` — your app's real info

## Deploy

1. Push/upload these files to a public GitHub repo (root of the repo).
2. Repo Settings → Pages → Source: Deploy from branch → `main` / `/(root)` → Save.
3. Site goes live at `https://<username>.github.io/<repo-name>/`.
