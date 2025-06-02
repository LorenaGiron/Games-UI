// ✅ Agrega esto al inicio del archivo
const options = {
  method: 'GET',
  headers: {
    		'x-rapidapi-key': '5100d04d82msh3a97c573a4ae1bbp12f6e4jsnebc0739e0e2e',
    'x-rapidapi-host': 'games-details.p.rapidapi.com'
  }
};

async function obtenerDetallesJuego(id) {
const url = `https://games-details.p.rapidapi.com/gameinfo/single_game/${id}`;


    try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);


console.log(result.data.media.screenshot);
    document.querySelector(".title").textContent = result.data.name || "(╯°□°）╯︵ 404 Not Found";
    document.querySelector(".Publisher").textContent = (result.data.dev_details.publisher || "(´・ω・`)← Nothing to show here.");
document.querySelector(".link").innerHTML = `Web site: ${
  result.data.external_links && result.data.external_links.length > 0
    ? `<a href="${result.data.external_links[0].link}" target="_blank">${
        (result.data.dev_details.franchise && result.data.dev_details.franchise.length > 0) 
          ? result.data.dev_details.franchise[0]
          : (result.data.name || "(°ロ°) !?← Where did it go?")
      }</a>`
    : (
      (result.data.dev_details.franchise && result.data.dev_details.franchise.length > 0) 
        ? result.data.dev_details.franchise[0]
        : (result.data.name || "(°ロ°) !?← Where did it go?")
    )
}`;


    // Acordeones
    const panels = document.querySelectorAll(".panel");
    if (panels[0]) panels[0].innerHTML = `<p>${result.data.desc || "[ ×_× ] Information not found"}</p>`;
    if (panels[1]) panels[1].innerHTML = `<p>${result.data.tags ? result.data.tags.join(", ") : "(・・;)ゞ ← Sorry, I couldn't find that."}</p>`;
    if (panels[2]) panels[2].innerHTML = `<p>${result.data.sys_req.window.recomm || "(°ロ°) !?← Where did it go?"}</p>`;
    if (panels[3]) panels[3].innerHTML = `<p>${result.data.release_date || "(°ロ°) !? ← Where did it go?"}</p>`;

    // Carrusel
const carouselInner = document.querySelector(".carousel-inner");

if (result.data.media && result.data.media.screenshot && result.data.media.screenshot.length > 0 && carouselInner) {
  carouselInner.innerHTML = ""; // Limpiar contenido anterior

  result.data.media.screenshot.forEach((imgUrl, index) => {
    const item = document.createElement("div");
    item.className = `carousel-item${index === 0 ? " active" : ""}`;
    item.innerHTML = `<img src="${imgUrl}" class="d-block  mx-auto" alt="screenshot">`;
    carouselInner.appendChild(item);
  });
}

 // Verifica si no encuentra algo


  } catch (error) {
    console.error("Error al obtener los detalles del juego:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const juegoID = localStorage.getItem('juegoID');
  console.log("juegoID:", juegoID); // Debug

  if (juegoID) {
    obtenerDetallesJuego(juegoID);
  }

  // Inicializar acordeones
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      accordion.classList.toggle("active");
      const panel = accordion.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  });
});
