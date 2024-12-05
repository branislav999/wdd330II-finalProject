export function renderHeaderFooter() {
  const header = document.createElement("header");
  header.innerHTML = `
    <nav>
      <a href="/pokemon">Pokemon</a>
      <a href="/shop">Shop</a>
      <a href="/storage">Storage</a>
    </nav>
  `;

  const footer = document.createElement("footer");
  footer.innerHTML = `
    <p>Placeholder footer text</p>
  `;

  document.body.prepend(header);
  document.body.appendChild(footer);
}
