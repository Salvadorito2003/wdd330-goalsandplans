export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) { 
  const response = await fetch(path);
  const template = await response.text();
  return template
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  date();
}

export async function date() {
  const yearElement = document.querySelector("#currentyear");
  const currentYear = new Date().getFullYear();
  yearElement.textContent = `© ${currentYear}`;

  const lastModifiedElement = document.querySelector("#lastmodified");
  lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

}