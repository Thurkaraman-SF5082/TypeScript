export function renderHome(container: HTMLElement) {
    const name = localStorage.getItem("user");
    var user = JSON.parse(name!);
    container.innerHTML = `<h2>Welcome ${user.name} to our Library!</h2> <br> <img src="/images/library.png" width="1000" height="500">`;
  }