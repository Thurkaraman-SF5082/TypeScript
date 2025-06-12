import { UserArrayList } from './models/default';
import { User } from './models/model';

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("user");
}

export function logout(): void {
  localStorage.removeItem("user");
}

export function showAuthForm(container: HTMLElement, onAuthSuccess: () => void) {
  container.innerHTML = `
    <div>
      <div style="margin-bottom: 10px;">
        <button id="show-login">Login</button>
        <button id="show-signup">Sign Up</button>
      </div>
      <div id="auth-form"></div>
    </div>
  `;
  const formContainer = document.getElementById("auth-form")!;

  function login(email: string, password: string): boolean {
    if (email && password) {
      const user = UserArrayList.find((u) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  function renderLoginForm() {
    formContainer.innerHTML = `
      <div class="login-form">
        <h2>Login</h2>
        <input id="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Password" />
        <button id="login-btn">Login</button>
      </div>
    `;

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passInput = document.getElementById("password") as HTMLInputElement;
    const btn = document.getElementById("login-btn")!;
    btn.addEventListener("click", () => {
      if (login(emailInput.value, passInput.value)) {
        onAuthSuccess();
      } else {
        alert("Invalid credentials");
      }
    });
  }

  function renderSignupForm() {
    formContainer.innerHTML = `
    <h2>Sign Up</h2>
    <input id="name" placeholder="Name" /><br>
    <input id="email" placeholder="Email" /><br>
    <input id="phone" placeholder="Phone Number" /><br>
    <input id="password" type="password" placeholder="Password" /><br>
    <input id="department" placeholder="Department" /><br>
    <button id="signup-btn">Sign Up</button>
  `;

    document.getElementById("signup-btn")!.addEventListener("click", () => {
      const name = (document.getElementById("name") as HTMLInputElement).value;
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const phone = (document.getElementById("phone") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;
      const department = (document.getElementById("department") as HTMLInputElement).value;

      const existing = UserArrayList.find((u) => u.email === email);
      if (existing) {
        alert("User already exists.");
        return;
      }
      const newUser = new User(name, email, password, phone, department);
      UserArrayList.push(newUser);
      alert("Signup successful. Please login.");
      renderLoginForm();
    });
  }

  document.getElementById("show-login")!.addEventListener("click", renderLoginForm);
  document.getElementById("show-signup")!.addEventListener("click", renderSignupForm);

  // Show login by default
  renderLoginForm();
}