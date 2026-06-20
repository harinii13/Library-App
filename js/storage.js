// storage.js — handles all localStorage persistence
const STORAGE_KEY = "library_books_v1";

const Storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to load books:", e);
      return [];
    }
  },

  save(books) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      return true;
    } catch (e) {
      console.error("Failed to save books:", e);
      return false;
    }
  },

  seedIfEmpty() {
    const existing = this.load();
    if (existing.length > 0) return existing;

    const seed = [
      { id: crypto.randomUUID(), title: "The Hobbit", author: "J.R.R. Tolkien",
        genre: "Fantasy", isbn: "9780547928227", copies: 3, borrowed: 1 },
      { id: crypto.randomUUID(), title: "Dune", author: "Frank Herbert",
        genre: "Sci-Fi", isbn: "9780441013593", copies: 2, borrowed: 0 },
      { id: crypto.randomUUID(), title: "Atomic Habits", author: "James Clear",
        genre: "Self-Help", isbn: "9780735211292", copies: 4, borrowed: 2 },
    ];
    this.save(seed);
    return seed;
  },
};
