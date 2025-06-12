interface UserData {
  id: number;
  name: string;
  fatherName: string;
  gender: string;
  phone: string;
  languages: string[];
  dob: string;
  photo: string;
  balance: number;
}

let data: UserData[] = [];
let editingId: number | null = null;

const form = document.getElementById("form") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const fatherNameInput = document.getElementById("fatherName") as HTMLInputElement;
const genderInput = document.getElementById("gender") as HTMLSelectElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const languagesInput = document.getElementById("languages") as HTMLSelectElement;
const dobInput = document.getElementById("dob") as HTMLInputElement;
const photoInput = document.getElementById("photo") as HTMLInputElement;
const balanceInput = document.getElementById("balance") as HTMLInputElement;
const tableBody = document.querySelector("#dataTable tbody") as HTMLTableSectionElement;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const fatherName = fatherNameInput.value.trim();
  const gender = genderInput.value;
  const phone = phoneInput.value.trim();
  const languages = Array.from(languagesInput.selectedOptions).map(opt => opt.value);
  const dob = dobInput.value;
  const balance = parseFloat(balanceInput.value);

  let base64Photo = "";
  if (photoInput.files && photoInput.files.length > 0) {
    base64Photo = await toBase64(photoInput.files[0]);
  }

  if (editingId !== null) {
    const index = data.findIndex((item) => item.id === editingId);
    if (index !== -1) {
      data[index] = {
        ...data[index],
        name, fatherName, gender, phone, languages, dob,
        photo: base64Photo || data[index].photo,
        balance
      };
      editingId = null;
      submitButton.innerText = "Add";
    }
  } else {
    const newData: UserData = {
      id: data.length + 1,
      name,
      fatherName,
      gender,
      phone,
      languages,
      dob,
      photo: base64Photo,
      balance
    };
    data.push(newData);
  }

  renderTable();
  form.reset();
});

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

function renderTable() {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.fatherName}</td>
      <td>${item.gender}</td>
      <td>${item.phone}</td>
      <td>${item.languages.join(", ")}</td>
      <td>${item.dob}</td>
      <td>${item.photo ? `<img src="${item.photo}" alt="Photo">` : ""}</td>
      <td>${item.balance.toFixed(2)}</td>
      <td>
        <button data-edit="${item.id}">Edit</button>
        <button data-delete="${item.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Bind actions after rendering
  tableBody.querySelectorAll("button[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt((btn as HTMLButtonElement).dataset.edit!);
      edit(id);
    });
  });

  tableBody.querySelectorAll("button[data-delete]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt((btn as HTMLButtonElement).dataset.delete!);
      remove(id);
    });
  });
}

function edit(id: number) {
  editingId = id;
  const item = data.find((item) => item.id === id);
  if (item) {
    nameInput.value = item.name;
    fatherNameInput.value = item.fatherName;
    genderInput.value = item.gender;
    phoneInput.value = item.phone;
    dobInput.value = item.dob;
    balanceInput.value = item.balance.toString();

    Array.from(languagesInput.options).forEach(option => {
      option.selected = item.languages.includes(option.value);
    });

    submitButton.innerText = "Update";
  }
}

function remove(id: number) {
  data = data.filter((item) => item.id !== id);
  renderTable();
}
