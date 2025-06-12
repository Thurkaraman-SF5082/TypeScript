import { UserArrayList } from '../models/default';
import { User } from '../models/model';

export function renderWallet(container: HTMLElement) {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return;

  const userObj: User = JSON.parse(storedUser);

  container.innerHTML = `
    <h2>Your balance is: $<span id="balance">${userObj.amount}</span></h2><br><br>
    <h1>Recharge your wallet</h1>
    <span>
      <input type="number" placeholder="Enter the Amount" id="amount" required>
      <button id="deposit">Deposit</button>
    </span><br><br>
  `;

  requestAnimationFrame(() => {
    const depositBtn = document.getElementById("deposit");
    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const balanceDisplay = document.getElementById("balance");

      depositBtn!.addEventListener("click", () => {
        const amount = Number(amountInput.value);
        if (!amount || amount <= 0) {
          alert("Please enter a valid amount.");
          return;
        }

        const userInList = UserArrayList.find((u: User) => u.email === userObj.email);
        if (userInList) {
          userInList.amount += amount;
          localStorage.setItem("user", JSON.stringify(userInList));
          alert("Deposit successful. New balance: $" + userInList.amount);
          balanceDisplay!.textContent = String(userInList.amount);
          amountInput.value = "";
        }
      });
  });
}
