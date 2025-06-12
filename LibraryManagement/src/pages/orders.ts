import { BorrowList, BookList, UserArrayList } from '../models/default';
import { availabilityDetails, borrowedStatus } from '../models/model';

export function renderOrders(container: HTMLElement) {
  let currentUser = JSON.parse(localStorage.getItem("user")!);

  if (!currentUser) {
    alert("User not found. Please log in.");
    return;
  }

  container.innerHTML = `<h2>Your Borrows</h2>`;
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
        <th>Borrow Id</th>
        <th>Book Id</th>
        <th>User Id</th>
        <th>Borrow Date</th>
        <th>Borrow Status</th>
        <th>Fine Amount</th>
        <th>Action</th>`;
    table.appendChild(headerRow);

    BorrowList.forEach((borrow) => {
      if (borrow.userId == currentUser.userId) {
        var row = document.createElement("tr") as HTMLTableRowElement;
        row.innerHTML = `
            <td>${borrow.borrowId}
            <td>${borrow.bookId}</td>
            <td>${borrow.userId}</td>
            <td>${borrow.borrowDate.toLocaleDateString()}</td> 
            <td>${borrow.borrowStatus}</td>
            <td>${borrow.fineAmount}</td>
            <td><button id="cancelbtn" onclick="cancelOrder('${borrow.borrowId}')">Return</button></td>`;
        table.appendChild(row);
      }
    })
    tableContainer.appendChild(table);
  }
  container.appendChild(tableContainer);

  function cancelOrder(borrowId: string) {
    // var currentUser = JSON.parse(localStorage.getItem("user")!);
    var confirmation = confirm("Whether the book is in good condition ?");
    var borrow = BorrowList.find((borrow) => borrow.borrowId == borrowId && borrow.userId == currentUser.userId && borrow.borrowStatus == borrowedStatus.borrowed);
    var book = BookList.find((book) => book.bookId == borrow!.bookId);
    var fineAmount;
    const days = Math.floor((new Date().getTime() - borrow!.borrowDate.getTime()) / (1000 * 60 * 60 * 24));
    var book = BookList.find((book) => book.bookId == borrow!.bookId);

    if (confirmation) {
      if (days <= 15) {
        borrow!.borrowStatus = borrowedStatus.returned;
        book!.availability = availabilityDetails.available;
        alert("Book Returned successfully");
        createTable();
      }
      else {
        fineAmount = days - 15;
        borrow!.fineAmount = fineAmount;

        if (payment(fineAmount, borrowId)) {
          borrow!.borrowStatus = borrowedStatus.returned;
          // var book = BookList.find((book) => book.bookId == borrow!.bookId);
          book!.availability = availabilityDetails.available;
        }
      }
    }
    else {
      if (days <= 15) {
        fineAmount = 300;
        borrow!.fineAmount = fineAmount;

        if (payment(fineAmount, borrowId)) {
          borrow!.borrowStatus = borrowedStatus.returned;
          // var book = BookList.find((book) => book.bookId == borrow!.bookId);
          book!.availability = availabilityDetails.damaged;
        }
      }
      else {
        fineAmount = (days - 15) + 300;
        borrow!.fineAmount = fineAmount;

        if (payment(fineAmount, borrowId)) {
          borrow!.borrowStatus = borrowedStatus.returned;
          // var book = BookList.find((book) => book.bookId == borrow!.bookId);
          book!.availability = availabilityDetails.damaged;
        }
      }
    }
  }

  function payment(fineAmount: number, borrowId: string) {
    var userChange = UserArrayList.find((user1) => user1.userId == currentUser.userId);
    if (userChange!.amount < fineAmount) {
      alert("Insufficient balance");
      return false;
    }
    var borrow = BorrowList.find((borrow) => borrow.borrowId == borrowId && borrow.userId == currentUser.userId && borrow.borrowStatus == borrowedStatus.borrowed);
    userChange!.amount -= fineAmount;
    localStorage.setItem("user", JSON.stringify(userChange));
    var userChange = UserArrayList.find((user1) => user1.userId == currentUser.userId);
    userChange!.amount -= borrow!.fineAmount;
    localStorage.setItem("user", JSON.stringify(userChange));
    alert("Book Returned successfully");
    createTable();
    return true;
  }
  (window as any).cancelOrder = cancelOrder;
}
