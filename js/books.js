// books.js — book data model and business logic
const Books = {
  list: [],

  init() {
    this.list = Storage.seedIfEmpty();
  },

  getAll() {
    return this.list;
  },

  getById(id) {
    return this.list.find((b) => b.id === id);
  },

  add(data) {
    const book = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      author: data.author.trim(),
      genre: data.genre.trim() || "General",
      isbn: data.isbn.trim(),
      copies: Math.max(1, parseInt(data.copies) || 1),
      borrowed: 0,
    };
    this.list.push(book);
    Storage.save(this.list);
    return book;
  },

  update(id, data) {
    const book = this.getById(id);
    if (!book) return null;
    book.title = data.title.trim();
    book.author = data.author.trim();
    book.genre = data.genre.trim() || "General";
    book.isbn = data.isbn.trim();
    book.copies = Math.max(book.borrowed, parseInt(data.copies) || 1);
    Storage.save(this.list);
    return book;
  },

  remove(id) {
    this.list = this.list.filter((b) => b.id !== id);
    Storage.save(this.list);
  },

  toggleBorrow(id) {
    const book = this.getById(id);
    if (!book) return;
    if (book.borrowed < book.copies) {
      book.borrowed += 1;
    } else if (book.borrowed > 0) {
      book.borrowed = Math.max(0, book.borrowed - 1);
    }
    Storage.save(this.list);
  },

  availableCount(book) {
    return book.copies - book.borrowed;
  },

  getGenres() {
    return [...new Set(this.list.map((b) => b.genre))].sort();
  },

  filter(query, status, genre) {
    const q = query.trim().toLowerCase();
    return this.list.filter((b) => {
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q);
      const avail = this.availableCount(b);
      const matchesStatus =
        status === "all" ||
        (status === "available" && avail > 0) ||
        (status === "borrowed" && b.borrowed > 0);
      const matchesGenre = genre === "all" || b.genre === genre;
      return matchesQuery && matchesStatus && matchesGenre;
    });
  },

  stats() {
    const total = this.list.reduce((sum, b) => sum + b.copies, 0);
    const borrowed = this.list.reduce((sum, b) => sum + b.borrowed, 0);
    return { total, borrowed, available: total - borrowed };
  },
};
