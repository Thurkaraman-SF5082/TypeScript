import { showAuthForm, isAuthenticated } from "./auth";
import { renderNavbar, renderPage } from "./components/navbar";

const app = document.getElementById("app")!;

function renderApp() {
  app.innerHTML = "";

  if (!isAuthenticated()) {
    showAuthForm(app, renderApp);
  } else {
    renderNavbar(app, renderApp);
    renderPage(app, "home");
  }
}

renderApp();
