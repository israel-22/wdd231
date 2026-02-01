// scripts/form.mjs


export function initFormPage() {
  // Timestamp oculto
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }


  const yearField = document.getElementById("year");
  if (yearField) yearField.textContent = new Date().getFullYear();

  const lastModifiedField = document.getElementById("lastModified");
  if (lastModifiedField) lastModifiedField.textContent = document.lastModified;
}

export function displayFormData() {
  const params = new URLSearchParams(window.location.search);

  const membershipMap = {
    np: "NP Membership (Non-Profit)",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
  };

  const fields = [
    "firstName",
    "lastName",
    "orgTitle",
    "email",
    "phone",
    "organization",
    "description",
    "membership",
    "timestamp"
  ];

  fields.forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;

    if (id === "membership") {
      const value = params.get(id);
      element.textContent = membershipMap[value] || "-";
    } else {
      element.textContent = params.get(id) || "-";
    }
  });

  // Footer
  const yearField = document.getElementById("year");
  if (yearField) yearField.textContent = new Date().getFullYear();

  const lastModifiedField = document.getElementById("lastModified");
  if (lastModifiedField) lastModifiedField.textContent = document.lastModified;
}

export function initMembershipModals() {
  const links = document.querySelectorAll(".modal-link");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".modal .close");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = link.parentElement.dataset.modal;
      document.getElementById(modalId).style.display = "block";
    });
  });

  closes.forEach(span => {
    span.addEventListener("click", () => {
      span.parentElement.parentElement.style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
}
