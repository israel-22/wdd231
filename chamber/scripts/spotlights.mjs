const spotlightContainer = document.querySelector("#spotlight-container");
const dataUrl = "data/members.json";


const membershipMap = {
  1: "Bronze",
  2: "Silver",
  3: "Gold"
};

async function getSpotlights() {
  try {
    const response = await fetch(dataUrl);
    const data = await response.json();

    // 👉 SOLO Silver y Gold
    const qualifiedMembers = data.members.filter(
      member => member.membershipLevel === 2 || member.membershipLevel === 3
    );

    // 👉 Aleatorio
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = "";

  members.forEach(member => {
    const article = document.createElement("article");

    article.innerHTML = `
      <h3>${member.company}</h3>
      <img 
        src="${member.image}" 
        alt="Logo of ${member.company}" 
        loading="lazy"
      >
      <p><strong>Membership:</strong> ${membershipMap[member.membershipLevel]}</p>
      <p>${member.address}</p>
      <p><strong>${member.phone}</strong></p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    spotlightContainer.appendChild(article);
  });
}

export function loadSpotlights() {
  getSpotlights();
}
