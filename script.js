// un tableau de livre

let books = [];
const bookKey = "listKeys";

const table = document.querySelector(".table");
const tbody = document.createElement("tbody");

table.appendChild(tbody);

initializeApp();

//remplir la table
function createTable() {
  for (let index = 0; index < books.length; index++) {
    addRow(
      books[index].id,
      books[index].name,
      books[index].auteur,
      books[index].lu
    );
  }

  document.body.appendChild(table);
}

// createTable();
//modal
let modal = document.getElementById("modalId");
let modalButton = document.getElementById("addModalButtonBook");
let addBtn = document.getElementById("addBookButton");
let close = document.querySelector(".close");

const form = document.getElementById("book-form");
console.log("fform", form.elements);

modalButton.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("books", books);
    const id = Date.now();
    const titre = document.getElementById("titre").value;
    const auteur = document.getElementById("auteur").value;
    const lu = document.getElementById("lu").checked;

    const book = {
      id: id,
      name: titre,
      auteur: auteur,
      lu: lu,
    };
    books.push(book);
    saveBooks();

    addRow(book.id, book.name, book.auteur, book.lu);
    form.reset();
    close.onclick();
  });
});
close.onclick = function () {
  modal.style.display = "none";
};

function addRow(id, name, auteur, lu) {
  if (name && auteur) {
    let row = document.createElement("tr");
    row.setAttribute("id", id);
    let text;
    let affect;
    if (lu == true) {
      text = "lu";
      affect = `<td class = "barre">${name}</td>`;
    } else {
      text = "Non lu";
      affect = `<td>${name}</td>`;
    }

    row.innerHTML = `
      <td>
       ${id} </td>
      ${affect}
      <td>
      ${auteur}</td>
      <td>
      ${text}
     </td>
      <td><button onclick = "deleteData(this, ${id})" class="deleteButton">supprimer</button></td>
      `;
    tbody.appendChild(row);
  }
}
// ${lu === true ? "lu" : "Non lu"}
function deleteData(button, id) {
  let row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  deleteBook(id);
  saveBooks();
}

//get index pour récupérer l'index élément à supprimer
function deleteBook(id) {
  const index = books.findIndex((book) => {
    return book.id === id;
  });
  if (index != -1) {
    books.splice(index, 1);
  }

  // books.splice(index, 1);
  console.log("nouvelle liste", books);
}
//localStorage pour sauvegarder le tableau

function saveBooks() {
  localStorage.setItem(bookKey, JSON.stringify(books));
}

function initializeApp() {
  console.log("before", books);
  const data = localStorage.getItem(bookKey);
  console.log("after", books);
  if (data) {
    books = JSON.parse(data);
    createTable();
  }
  console.log("bien apres", books);
}
