export function renderHome(container: HTMLElement) {
    const name = localStorage.getItem("user");
    var user = JSON.parse(name!);
    container.innerHTML = `<h2>Welcome ${user.name} to our Medicine Shop!</h2> <br> <img src="/images/store.jpg" width="1000" height="500">`;
  }