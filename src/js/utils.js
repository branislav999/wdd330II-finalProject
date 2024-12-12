export function renderHeaderFooter() {
  const header = document.createElement('header');
  header.innerHTML = `
    <nav>
      <a href="/pokemon">Pokemon</a>
      <a href="/shop">Shop</a>
      <a href="/storage">Storage</a>
      <a href="/backpack">Backpack</a>
    </nav>
  `;

  const footer = document.createElement('footer');
  footer.innerHTML = `
    <p>WDD330 Final Project - Team Thinkpad</p>
  `;

  document.body.prepend(header);
  document.body.appendChild(footer);
}
