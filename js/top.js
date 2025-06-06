const apiKey = '07bacd71edc84fbc9bb86a9cc120ff03';

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);
const formatDate = date => date.toISOString().split('T')[0];

const startDate = formatDate(oneMonthAgo);
const endDate = formatDate(today);

const sections = [
    {
        title: "Top 10 del mes",
        elementId: "game-list",
        ordering: "-rating",
        dateRange: `${startDate},${endDate}`,
        page_size: 10,
        displayFields: game => `
            <p class="card-text">Rating: ${game.rating} ⭐</p>
            <p class="card-text">Lanzado: ${game.released}</small></p>
        `
    },
    {
        title: "Top Ventas",
        elementId: "top-sales-list",
        ordering: "-added",
        page_size: 8,
        displayFields: game => `
            <p class="card-text">Guardado por: ${game.added} usuarios</p>
        `
    },
    {
        title: "Mejores Calificados",
        elementId: "top-rated-list",
        ordering: "-rating",
        page_size: 8,
        displayFields: game => `
            <p class="card-text">Rating: ${game.rating} ⭐</p>
            <p class="card-text">Rating Top: ${game.rating_top}</p>
        `
    },
    {
        title: "Más jugadores",
        elementId: "most-played-list",
        ordering: "-rating_top",
        page_size: 8,
        displayFields: game => `
        <p class="card-text">Popularidad: ${game.rating_top} / 5</p>
        `
    },
    {
        title: "Más guardados por usuarios",
        elementId: "most-added-list",
        ordering: "-added",
        page_size: 8,
        displayFields: game => `
        <p class="card-text">Añadido a listas: ${game.added}</p>
        `
    },
    {
        title: "Con más reseñas",
        elementId: "most-reviewed-list",
        ordering: "-metacritic",
        page_size: 8,
        displayFields: game => `
            <p class="card-text">Críticas: ${game.metacritic || 'N/A'}</p>
        `
    }
];

// Tarjeta de juego dinámica
function createGameCard(game, contentHTML) {
    return `
    <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm">
            <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
            <div class="card-body">
                <h5 class="card-title">${game.name}</h5>
                ${contentHTML}
            </div>
        </div>
    </div>
    `;
}

// Cargar y renderizar juegos en cada sección
async function loadGames() {
    for (const section of sections) {
        try {
            const url = new URL(`https://api.rawg.io/api/games`);
            url.searchParams.set("key", apiKey);
            url.searchParams.set("ordering", section.ordering);
            url.searchParams.set("page_size", section.page_size);
            if (section.dateRange) {
                url.searchParams.set("dates", section.dateRange);
            }

            const res = await fetch(url.toString());
            const data = await res.json();

            const container = document.getElementById(section.elementId);
            container.innerHTML = "";

            data.results.forEach(game => {
                const extraInfo = section.displayFields(game);
                container.innerHTML += createGameCard(game, extraInfo);
            });
        } catch (err) {
            console.error(`Error cargando juegos para ${section.title}:`, err);
        }
    }
}

document.addEventListener("DOMContentLoaded", loadGames);