const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// Fetch members data
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

// Toggle Grid View
if (gridButton && listButton) {
  gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
  });

  listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
  });
}

// Convert membership level number to text
function getMembershipName(level) {
  switch (level) {
    case 3:
      return "Gold";
    case 2:
      return "Silver";
    default:
      return "Member";
  }
}

// Display members
function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img 
        src="${member.image || 'images/placeholder.png'}" 
        alt="Logo of ${member.company}" 
        loading="lazy"
        width="80"
        height="80"
      >
      <h3>${member.company}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Membership Level:</strong> ${getMembershipName(member.membershipLevel)}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
    `;

    membersContainer.appendChild(card);
  });
}

// Footer dynamic content
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Initialize
getMembers();
