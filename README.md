# Portfolio: setup guide

## 1. Create the files
Make a folder `portfolio/` with `index.html`, `style.css`, `script.js` and an `assets/` folder
(`assets/profile.png`, `assets/projects/`, `assets/icons/`). Copy the provided code into each file.

## 2. Run in VS Code
1. Open the `portfolio` folder in VS Code (File > Open Folder).
2. Install the **Live Server** extension.
3. Right-click `index.html` > **Open with Live Server**. The page reloads when you save.

## 3. Customize (almost everything is in `script.js`, top `DATA` object)
- **Name / title / tagline**: edit the text in `index.html` (hero section and `<title>`).
- **Profile photo**: save a square image as `assets/profile.png` (about 600x600, compressed). Until then initials show.
- **Resume**: put your PDF at `assets/resume.pdf`.
- **Social links and email**: `DATA.social`, `DATA.email`.
- **Skills**: `DATA.skills`. Set a number 0-100 for `level`, or leave `null`.
- **Projects**: `DATA.projects`. Fill `tech`, `live`, `github`, and `image` (e.g. `assets/projects/cricstats.png`).
- **Stats**: projects and skills are counted automatically; set `achievementsCount` yourself.
- **Performance**: add real entries to `DATA.performance` and `DATA.coding`.
- **Education**: edit `DATA.education` and `DATA.currentSemester`.
- **Colours**: CSS variables at the top of `style.css`.

## 4. Make the contact form send email
1. Create a free form at https://formspree.io and copy its endpoint URL.
2. Paste it into `DATA.formEndpoint` in `script.js`.
Without it, the form opens the visitor's email app addressed to `DATA.email`.

## 5. Publish with GitHub Pages
1. Create a GitHub repository (e.g. `portfolio`) and upload all files so `index.html` is in the root.
2. Or in a terminal: `git init`, `git add .`, `git commit -m "Initial portfolio"`, `git branch -M main`,
   `git remote add origin <repo-url>`, `git push -u origin main`.
3. On GitHub: **Settings > Pages > Build and deployment > Deploy from a branch > main / (root) > Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/portfolio/`.
