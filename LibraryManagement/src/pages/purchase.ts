import { BookList, BorrowList } from '../models/default';
import { availabilityDetails, Borrow, borrowedStatus } from '../models/model';

export function renderPurchase(container: HTMLElement) {
    container.innerHTML = `<h2>Borrow Books</h2>`;
    const tableContainer = document.createElement("span");
    createTable();
    function createTable() {
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        var headerRow = document.createElement("tr") as HTMLTableRowElement;
        headerRow.innerHTML = `
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Availability</th>
            <th>Action</th>`;
        table.appendChild(headerRow);

        BookList.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML =
                `<td>${book.bookId}</td>
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.availability}</td>
        <td><button id="purchasebtn" onclick="purchaseMedicine('${book.bookId}')">Borrow</button></td>`;
            table.appendChild(row);
        });
        tableContainer.appendChild(table);
    }
    container.appendChild(tableContainer);
    function purchaseMedicine(bookId: string) {
        // var count = Number(prompt("Enter the count of medicine to purchase"));
        const book = BookList.find((book) => book.bookId === bookId);
        if (book) {
            if (book.availability === availabilityDetails.issued) {
                alert("Book not available");
                return;
            }
            if (book.availability === availabilityDetails.damaged) {
                alert("Book is damaged");
                return;
            }
            // let totalAmount = medicine.medicinePrice * count;
            var currentUser = JSON.parse(localStorage.getItem("user")!);
            // var userChange = UserArrayList.find((user1) => user1.userId == currentUser.userId);
            // if (userChange!.amount < totalAmount) {
            //     alert("Insufficient balance");
            //     return;
            // }
            book.availability = availabilityDetails.issued;
            // userChange!.amount -= totalAmount;
            // localStorage.setItem("user", JSON.stringify(userChange));
            var borrow = new Borrow(book.bookId, currentUser.userId, new Date(), borrowedStatus.borrowed, 0);
            BorrowList.push(borrow);
            createTable();
            alert("Book borrowed successfully");
        }
    }
    (window as any).purchaseMedicine = purchaseMedicine;
}

