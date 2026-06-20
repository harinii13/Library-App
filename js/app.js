// app.js — wires up events and orchestrates UI + Books + Storage
function refresh() {
  const query = UI.el("searchInput").value;
  const status = UI.el("filterStatus").value;
  const genre = UI.el("filterGenre").value;
  UI.renderStats();
  UI.renderGenreOptions();
  UI.renderBooks(Books.filter(query, status, genre));
}

function handleFormSubmit(e) {
  e.preventDefault();
  const id = UI.el("bookId").value;
  const data = {
    title: UI.el("title").value,
    author: UI.el("author").value,
    genre: UI.el("genre").value,
    isbn: UI.el("isbn").value,
    copies: UI.el("copies").value,
  };
  if (!data.title.trim() || !data.author.trim()) return;

  if (id) {
    Books.update(id, data);
  } else {
    Books.add(data);
  }
  UI.closeModal();
  refresh();
}

function handleGridClick(e) {
  const card = e.target.closest(".book-card");
  if (!card) return;
  const id = card.dataset.id;

  if (e.target.classList.contains("toggle-btn")) {
    Books.toggleBorrow(id);
    refresh();
  } else if (e.target.classList.contains("edit-btn")) {
    UI.openModal(Books.getById(id));
  } else if (e.target.classList.contains("delete-btn")) {
    if (confirm("Delete this book?")) {
      Books.remove(id);
      refresh();
    }
  }
}

function bindEvents() {
  UI.el("addBookBtn").addEventListener("click", () => UI.openModal());
  UI.el("cancelBtn").addEventListener("click", () => UI.closeModal());
  UI.el("bookForm").addEventListener("submit", handleFormSubmit);
  UI.el("bookGrid").addEventListener("click", handleGridClick);
  UI.el("searchInput").addEventListener("input", refresh);
  UI.el("filterStatus").addEventListener("change", refresh);
  UI.el("filterGenre").addEventListener("change", refresh);

  UI.el("bookModal").addEventListener("click", (e) => {
    if (e.target.id === "bookModal") UI.closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") UI.closeModal();
  });
}

function init() {
  Books.init();
  bindEvents();
  refresh();
}

document.addEventListener("DOMContentLoaded", init);
