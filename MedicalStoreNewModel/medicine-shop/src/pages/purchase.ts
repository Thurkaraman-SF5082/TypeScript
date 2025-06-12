import { MedicineList, OrderList, UserArrayList } from '../models/default';
import {  Order, orderStatus } from '../models/model';

export function renderPurchase(container: HTMLElement) {
    container.innerHTML = `<h2>Purchase medicines</h2>`;
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
          <th>Medicine Id</th>
          <th>Medicine Name</th>
          <th>Medicine Count</th>
          <th>Medicine Price</th>
          <th>Medicine Expiry Date</th>
          <th>Action</th>`;
        table.appendChild(headerRow);

        MedicineList.forEach((medicine) => {
            const row = document.createElement("tr");
            row.innerHTML =
                `<td>${medicine.medicineId}</td>
        <td>${medicine.medicineName}</td>
        <td>${medicine.medicineCount}</td>
        <td>${medicine.medicinePrice}</td>
        <td>${medicine.expiryDate.toLocaleDateString()}</td>
        <td><button id="purchasebtn" onclick="purchaseMedicine('${medicine.medicineId}')">Purchase</button></td>`;
            table.appendChild(row);
        });
        tableContainer.appendChild(table);
    }
    container.appendChild(tableContainer);
    function purchaseMedicine(medicineId: string) {
        var count = Number(prompt("Enter the count of medicine to purchase"));
        const medicine = MedicineList.find((medicine) => medicine.medicineId === medicineId);
        if (medicine) {
            if (medicine.medicineCount < count) {
                alert("Not enough medicines available");
                return;
            }
            if (medicine.expiryDate < new Date()) {
                alert("Expired");
                return;
            }
            let totalAmount = medicine.medicinePrice * count;
            var currentUser = JSON.parse(localStorage.getItem("user")!);
            var userChange = UserArrayList.find((user1) => user1.userId == currentUser.userId);
            if (userChange!.amount < totalAmount) {
                alert("Insufficient balance");
                return;
            }
            medicine.medicineCount-=count;
            userChange!.amount -= totalAmount;
            localStorage.setItem("user", JSON.stringify(userChange));
            var order = new Order( medicine.medicineId,medicine.medicineName,currentUser.userId, totalAmount, medicine.medicineCount, orderStatus.purchased,new Date(), );
            OrderList.push(order);
            createTable();
            alert("Medicine purchased successfully");
        }
    }
    (window as any).purchaseMedicine = purchaseMedicine;
}

  