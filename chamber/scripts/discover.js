import discoverItems from "../data/discover.mjs";



document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#discoverGrid");
  const messageBox = document.querySelector("#visit-message");

  /* BUILD DISCOVER CARDS */
  discoverItems.forEach((place, index) => {
    const card = document.createElement("section");
    card.classList.add("discover-card", `card-${index + 1}`);
  

    const title = document.createElement("h2");
    title.textContent = place.title;

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.title;
    img.loading = "lazy";
    img.width = 300;
    img.height = 200;

    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";

    card.append(title, figure, address, description, button);
    grid.appendChild(card);
  });

  /* VISIT MESSAGE */
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    messageBox.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor(
      (now - Number(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    messageBox.textContent =
      days < 1
        ? "Back so soon! Awesome!"
        : `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
  }

  localStorage.setItem("lastVisit", now);
});
