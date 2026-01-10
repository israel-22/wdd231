
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

  // Current year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Last modified date


const lastModifiedElement = document.getElementById("lastModified");

if (lastModifiedElement) {
  const modified = new Date(document.lastModified);
  lastModifiedElement.textContent =
    `Last modified: ${modified.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })}`;
}


const yearSpan = document.getElementById("currentYear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

