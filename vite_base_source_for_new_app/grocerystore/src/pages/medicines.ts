import { MedicineList } from '../models/default';
import { MedicineInfo } from '../models/model';

export function renderMedicines(container: HTMLElement) {
    container.innerHTML = `<h2>Medicines</h2> <button id="addMedicineBtn">Add Medicine</button>`;
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
            <th>Medicine Id</th>
            <th>Medicine Name</th>
            <th>Medicine Price</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Action</th>`;
        table.appendChild(headerRow);

        MedicineList.forEach((medicine) => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${medicine.medicineId}</td>
      <td>${medicine.medicineName}</td>
      <td>${medicine.medicinePrice}</td>
      <td>${medicine.medicineCount}</td>
      <td>${medicine.expiryDate.toLocaleDateString()}</td>
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
        <label for="medicineName">Medicine Name:</label>
        <input type="text" id="medicineName" name="medicineName"><br>
        <label for="medicinePrice">Medicine Price:</label>
        <input type="text" id="medicinePrice" name="medicinePrice"><br>
        <label for="medicineCount">Medicine Count:</label>
        <input type="text" id="medicineCount" name="medicineCount"><br>
        <label for="expiryDate">Expiry Date:</label>
        <input type="date" id="expiryDate" name="expiryDate"><br>
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
            form.expiryDate.value = medicine.expiryDate.toISOString().split("T")[0];
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
                expiryDate: new Date(form.expiryDate.value),
            };
            MedicineList[index] = medicine;
            alert("Updated medicine successfully : " + medicine.medicineId);
        } else {
            const medicine: MedicineInfo = new MedicineInfo( form.medicineName.value, parseInt(form.medicineCount.value),parseInt(form.medicinePrice.value),
                new Date(form.expiryDate.value)
            );
            MedicineList.push(medicine);
            alert("Added medicine successfully : " + medicine.medicineId);
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
      alert("Add Medicine");
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