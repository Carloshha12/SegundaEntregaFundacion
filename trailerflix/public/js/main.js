// Retraso escalonado en la aparición de cada endpoint
document.querySelectorAll(".endpoint").forEach((el, i) => {
  el.style.animationDelay = `${i * 0.08}s`;
});

// Año dinámico en el pie de página
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
