import { OrderList,MedicineList,UserArrayList } from '../models/default';
import { orderStatus } from '../models/model';

export function renderOrders(container: HTMLElement) {
  let currentUser = JSON.parse(localStorage.getItem("user")!);
  container.innerHTML = `<h2>Your Orders</h2>`;
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
        <th>Order Id</th>
        <th>User Id</th>
        <th>Product Id</th>
        <th>Product Count</th>
        <th>Total Price</th>
        <th>Order Date</th>
        <th>Purchase Status</th>
        <th>Action</th>`;
    table.appendChild(headerRow);

    OrderList.forEach((order) => {
      if (order.userId == currentUser.userId) {
        var row = document.createElement("tr") as HTMLTableRowElement;
        row.innerHTML = `
            <td>${order.orderId} 
            <td>${order.userId}</td> 
            <td>${order.medicineId}</td> 
            <td>${order.medicineCount}</td> 
            <td>${order.totalPrice}</td> 
            <td>${order.orderDate.toLocaleDateString()}</td> 
            <td>${order.purchaseStatus}</td>
            <td><button id="cancelbtn" onclick="cancelOrder('${order.orderId}')">Cancel</button></td>`;
        table.appendChild(row);
      }
    })
    tableContainer.appendChild(table);
  }
  container.appendChild(tableContainer);

  function cancelOrder(orderId: string) {
    var confirmation = confirm("Are you sure you want to cancel this order?");
    if (!confirmation) {
      return;
    }
    var order = OrderList.find((order) => order.orderId == orderId && order.userId == currentUser.userId && order.purchaseStatus == orderStatus.purchased);
    order!.purchaseStatus = orderStatus.cancelled;
   
    var medicine = MedicineList.find((medicine) => medicine.medicineId == order!.medicineId);
    medicine!.medicineCount += order!.medicineCount;
    var userChange = UserArrayList.find((user1) => user1.userId == currentUser.userId);
    userChange!.amount += order!.totalPrice;
    localStorage.setItem("user", JSON.stringify(userChange));
    alert("Order cancelled successfully");
    createTable();
  }
  (window as any).cancelOrder = cancelOrder;
}