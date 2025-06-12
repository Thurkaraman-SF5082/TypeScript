import { MedicineList } from '../models/default';
import { MedicineInfo } from '../models/model';

export function renderMedicines(container: HTMLElement) {
    container.innerHTML = `<h2>Products</h2> <button id="addMedicineBtn">Add Product</button>`;
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
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Shipping Duration</th>
            <th>Action</th>`;
        table.appendChild(headerRow);

        MedicineList.forEach((medicine) => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${medicine.medicineId}</td>
      <td>${medicine.medicineName}</td>
      <td>${medicine.medicinePrice}</td>
      <td>${medicine.medicineCount}</td>
      <td>${medicine.expiryDate}</td>
      <td>
        <button onclick="editMedicine('${medicine.medicineId}')">Edit</button>
        <button onclick="deleteMedicine('${medicine.medicineId}')">Delete</button>
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
        form.innerHTML = `
        <label for="medicineName">Product Name:</label>
        <input type="text" id="medicineName" name="medicineName"><br>
        <label for="medicinePrice">Product Price:</label>
        <input type="text" id="medicinePrice" name="medicinePrice"><br>
        <label for="medicineCount">Product Count:</label>
        <input type="text" id="medicineCount" name="medicineCount"><br>
        <label for="expiryDate">Shipping Duration:</label>
        <input type="number" id="expiryDate" name="expiryDate"><br>
        <button class="btn" type="submit">Save</button>
        `;
        container.appendChild(form);
    }
    
    // Attach listeners AFTER table is in the DOM
    let editingID:string = ""; 0;
    function editMedicine(id: string) {
        // alert("Editing " + id);
        addEditMedicinesForm();
        // Populate form with existing data for editing
        const form = document.getElementById("medicineForm") as HTMLFormElement;
        const medicine = MedicineList.find((val) => val.medicineId == id);
        if (medicine) {
            editingID = id;
            form.medicineName.value = medicine.medicineName;
            form.medicinePrice.value = medicine.medicinePrice.toString();
            form.medicineCount.value = medicine.medicineCount.toString();
            form.expiryDate.value = medicine.expiryDate;
        }
    }

    document.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const index = MedicineList.findIndex((val) => val.medicineId == editingID);
        if (index > -1) {
            const medicine: MedicineInfo = {
                medicineId: editingID,
                medicineName: form.medicineName.value,
                medicinePrice: parseInt(form.medicinePrice.value),
                medicineCount: parseInt(form.medicineCount.value),
                expiryDate: parseInt(form.expiryDate.value),
            };
            MedicineList[index] = medicine;
            alert("Updated product successfully : " + medicine.medicineId);
        } else {
            const medicine: MedicineInfo = new MedicineInfo( form.medicineName.value, parseInt(form.medicineCount.value),parseInt(form.medicinePrice.value),
            parseInt(form.expiryDate.value)
            );
            MedicineList.push(medicine);
            alert("Added product successfully : " + medicine.medicineId);
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
      alert("Add Product");
      addEditMedicinesForm(); // make sure this function exists and is imported
    });

    function deleteMedicine(id: string) {
        var index = MedicineList.findIndex((val) => val.medicineId == id);
        MedicineList.splice(index, 1);
        alert("Deleted " + id);
        createTable();
    }
    // Expose to window object
    (window as any).editMedicine = editMedicine;
    (window as any).deleteMedicine = deleteMedicine;
}