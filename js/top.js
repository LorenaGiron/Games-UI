const apiKey = '07bacd71edc84fbc9bb86a9cc120ff03';

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);
const formatDate = date => date.toISOString().split('T')[0];
let searchTerm = "";

const startDate = formatDate(oneMonthAgo);
const endDate = formatDate(today);

const sections = [
    {
        title: "Monthly top 10",
        elementId: "game-list",
        ordering: "-playtime",
        dateRange: `${startDate},${endDate}`,
        page_size: 10,
        displayFields: game => `
            <p class="card-text"><i class="fas fa-gamepad me-2"></i>Similar games: ${game.suggestions_count}</p>
            <p class="card-text"><i class="fas fa-calendar-alt me-2"></i>  ${game.released}</p>
        `,
        filter: game => game.playtime > 0 && game.reviews_count > 0
    },
    {
        title: "Top sales",
        elementId: "top-sales-list",
        ordering: "-added",
        page_size: 8,
        displayFields: game => `
           <p class="card-text"><i class="fas fa-bookmark me-2"></i>Saved by: ${game.added} users</p>
        `
    },
    {
        title: "Top rated",
        elementId: "top-rated-list",
        ordering: "-rating",
        page_size: 8,
        displayFields: game => `
        <p class="card-text"><i class="fas fa-star me-2"></i> Rating: ${game.rating}</p>
        <p class="card-text"><i class="fas fa-medal me-2"></i> Rating Top: ${game.rating_top}</p>
        `
    },
    {
        title: "More players",
        elementId: "most-played-list",
        ordering: "-rating_top",
        page_size: 8,
        displayFields: game => `
            <p class="card-text"><i class="fas fa-chart-line me-2"></i> Popularity: ${game.rating_top} / 5</p>
        `
    },
    {
        title: "Most saved by users",
        elementId: "most-added-list",
        ordering: "-added",
        page_size: 8,
        displayFields: game => `
            <p class="card-text"><i class="fas fa-list-check me-2"></i> Added to list: ${game.added}</p>
        `
    },
    {
        title: "With more reviews",
        elementId: "most-reviewed-list",
        ordering: "-metacritic",
        page_size: 8,
        displayFields: game => `
        <p class="card-text"><i class="fas fa-comments me-2"></i> Reviews: ${game.metacritic || 'N/A'}</p>
        `
    }
];

function createGameCard(game, contentHTML, rankingBadge = "") {
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm position-relative hover-effect">
                ${rankingBadge}
                <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${game.name}</h5>
                        ${contentHTML}
                    </div>
                    <button class="btn btn-primary mt-3" onclick="window.location.href='detallesTop.html?id=${game.id}'">
                        Details
                    </button>       
                </div>
            </div>
        </div>
    `;
}

async function loadGames() {
    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = "block"; 

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

            data.results.forEach((game, index) => {
                if (!game.background_image) return;

                const gameName = game.name.toLowerCase();

                if (!searchTerm || gameName.includes(searchTerm)) {
                    const extraInfo = section.displayFields(game);
                    const medal = `#${index + 1}`;
                    const rankingBadge = `<span class="ranking-badge position-absolute top-0 start-0 m-2">${medal}</span>`;

                    let cardHTML = createGameCard(game, extraInfo, rankingBadge);

                    if (searchTerm) {
                        cardHTML = cardHTML.replace(
                            '<div class="card-body d-flex flex-column justify-content-between">',
                            `<div class="card-body d-flex flex-column justify-content-between">
                                <p class="badge bg-info mb-2">Group: ${section.title}</p>`
                        );
                    }

                    container.innerHTML += cardHTML; 
                    spinner.style.display = "none"; 
                }
            });

            if (searchTerm && container.innerHTML.trim() === "") {
                document.getElementById(section.elementId).previousElementSibling.style.display = "none";
            }

        } catch (err) {
            console.error(`Error cargando juegos para ${section.title}:`, err);
        }
    }

   
}

document.addEventListener("DOMContentLoaded", loadGames);
