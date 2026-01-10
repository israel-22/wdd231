const menuButton = document.getElementById("menu-button");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});
