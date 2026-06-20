# 📚 Library Manager

A clean, fast, no-backend library management app. Add books, track copies,
borrow/return, search and filter — all saved in your browser via
`localStorage`. No build step, no dependencies, no server required.

## Features
- Add, edit, and delete books
- Track total copies vs. borrowed copies per title
- One-click borrow / return toggle
- Live search by title, author, or genre
- Filter by availability status and genre
- Dashboard stats (total / available / borrowed)
- Data persists locally in your browser

## Run locally
Just open `index.html` in a browser — that's it.

Or serve it locally:
```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to GitHub Pages
1. Push this folder to a GitHub repo.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set Source to **Deploy from a branch**.
4. Choose `main` branch and `/ (root)` folder, then Save.
5. Your app will be live at `https://<username>.github.io/<repo>/`.

## Project structure
```
library-app/
├── index.html        # Page structure & modal form
├── css/
│   ├── style.css      # Layout, theme variables, stats grid
│   ├── forms.css       # Buttons & inputs
│   └── cards.css       # Book cards & modal
└── js/
    ├── storage.js      # localStorage read/write + seed data
    ├── books.js        # Book model: add/edit/delete/filter/stats
    ├── ui.js           # DOM rendering helpers
    └── app.js           # Event wiring & app init
```

Every file is kept under 100 lines for readability.

## Notes
- Data is stored per-browser (`localStorage`) — it won't sync across devices.
- To reset all data, clear your browser's local storage for this site.
