// ui.js — DOM rendering helpers
const UI = {
  el(id) {
    return document.getElementById(id);
  },

  escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },

  renderStats() {
    const { total, available, borrowed } = Books.stats();
    this.el("totalBooks").textContent = total;
    this.el("availableBooks").textContent = available;
    this.el("borrowedBooks").textContent = borrowed;
  },

  renderGenreOptions() {
    const select = this.el("filterGenre");
    const current = select.value;
    const genres = Books.getGenres();
    select.innerHTML = '<option value="all">All Genres</option>';
    genres.forEach((g) => {
      const opt = document.createElement("option");
      opt.value = g;
      opt.textContent = g;
      select.appendChild(opt);
    });
    select.value = genres.includes(current) ? current : "all";
  },

  bookCardHtml(book) {
    const avail = Books.availableCount(book);
    const statusClass = avail > 0 ? "badge-available" : "badge-borrowed";
    const statusText = avail > 0 ? `${avail} available` : "All borrowed";
    return `
      <div class="book-card" data-id="${book.id}">
        <h3>${this.escapeHtml(book.title)}</h3>
        <div class="author">by ${this.escapeHtml(book.author)}</div>
        <div class="book-meta">
          <span class="tag">${this.escapeHtml(book.genre)}</span>
          <span class="${statusClass}">${statusText}</span>
        </div>
        <div class="book-meta">
          <span>Copies: ${book.copies}</span>
          <span>Borrowed: ${book.borrowed}</span>
        </div>
        <div class="book-actions">
          <button class="btn btn-small toggle-btn">
            ${book.borrowed < book.copies ? "Borrow" : "Return"}
          </button>
          <button class="btn btn-small edit-btn">Edit</button>
          <button class="btn btn-small btn-danger delete-btn">Delete</button>
        </div>
      </div>`;
  },

  renderBooks(list) {
    const grid = this.el("bookGrid");
    const empty = this.el("emptyState");
    if (list.length === 0) {
      grid.innerHTML = "";
      empty.hidden = false;
    } else {
      empty.hidden = true;
      grid.innerHTML = list.map((b) => this.bookCardHtml(b)).join("");
    }
  },

  openModal(book = null) {
    this.el("modalTitle").textContent = book ? "Edit Book" : "Add Book";
    this.el("bookId").value = book ? book.id : "";
    this.el("title").value = book ? book.title : "";
    this.el("author").value = book ? book.author : "";
    this.el("genre").value = book ? book.genre : "";
    this.el("isbn").value = book ? book.isbn : "";
    this.el("copies").value = book ? book.copies : 1;
    this.el("bookModal").hidden = false;
  },

  closeModal() {
    this.el("bookModal").hidden = true;
    this.el("bookForm").reset();
  },
};
