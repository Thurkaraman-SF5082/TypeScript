import { BookList } from '../models/default';
import { BookInfo } from '../models/model';

export function renderMedicines(container: HTMLElement) {
    container.innerHTML = `<h2>Books</h2> <button id="addMedicineBtn">Add Book</button>`;
    const tableContainer = document.createElement("span");
    createTable();
    function createTable() {
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Availability</th>
            <th>Action</th>`;
        table.appendChild(headerRow);

        BookList.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${book.bookId}</td>
      <td>${book.bookName}</td>
      <td>${book.authorName}</td>
      <td>${book.availability}</td>
      <td>
        <button onclick="editMedicine('${book.bookId}')">Edit</button>
        <button onclick="deleteMedicine('${book.bookId}')">Delete</button>
      </td>`;
            table.appendChild(row);
        });

        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    }

    function addEditMedicinesForm() {
        const existingForm = document.getElementById("medicineForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "medicineForm";
        form.innerHTML = `3
        <label for="bookName">Book Name:</label>
        <input type="text" id="bookName" name="medicineName"><br>
        <label for="authorName">Author Name:</label>
        <input type="text" id="authorName" name="authorName"><br>
        <label for="availability">Availability:</label>
        <input type="text" id="availability" name="availability"><br>
        <button class="btn" type="submit">Save</button>
        `;
        container.appendChild(form);
    }

    // Attach listeners AFTER table is in the DOM
    let editingID: string = ""; 0;
    function editMedicine(id: string) {
        // alert("Editing " + id);
        addEditMedicinesForm();
        // Populate form with existing data for editing
        const form = document.getElementById("medicineForm") as HTMLFormElement;
        const book = BookList.find((val) => val.bookId == id);
        if (book) {
            editingID = id;
            form.bookName.value = book.bookName;
            form.authorName.value = book.authorName;
            form.availability.value = book.availability;
        }
    }

    document.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const index = BookList.findIndex((val) => val.bookId === editingID);
        if (index > -1) {
            const book: BookInfo = {
                bookId: editingID,
                bookName: form.bookName.value,
                authorName: form.authorName.value,
                availability: form.availability.value,
            };
            BookList[index] = book;
            alert("Updated Book successfully : " + book.bookId);
        } else {
            alert("alert");
            const book: BookInfo = new BookInfo(form.bookName.value, form.authorName.value, form.availability.value);
            BookList.push(book);
            alert("Added Book successfully : " + book.bookId);
        }
        createTable();
        form.reset();
        editingID = "";
        const existingForm = document.getElementById("medicineForm");
        if (existingForm) {
            existingForm.remove();
        }
    });

    const addBtn = container.querySelector("#addMedicineBtn") as HTMLButtonElement;
    addBtn?.addEventListener("click", () => {
        alert("Add Book");
        addEditMedicinesForm(); // make sure this function exists and is imported
    });

    function deleteMedicine(id: string) {
        var index = BookList.findIndex((val) => val.bookId == id);
        BookList.splice(index, 1);
        alert("Deleted " + id);
        createTable();
    }
    // Expose to window object
    (window as any).editMedicine = editMedicine;
    (window as any).deleteMedicine = deleteMedicine;
}