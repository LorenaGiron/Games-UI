const apiKey = '07bacd71edc84fbc9bb86a9cc120ff03';

function getGameIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function loadGameDetails() {
    const gameId = getGameIdFromUrl();
    if (!gameId) return;

    try {
        const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
        const game = await res.json();

        // Título y Publisher
        document.querySelector('.title').textContent = game.name;
        document.querySelector('.Publisher').textContent = `Publisher: ${game.publishers?.map(p => p.name).join(', ') || 'N/A'}`;
        
        // Link del sitio
        if (game.website) {
            document.querySelector('.link').innerHTML = `<a href="${game.website}" target="_blank">${game.website}</a>`;
        } else {
            document.querySelector('.link').textContent = 'No website available';
        }

        // Acordeones: description, categories, requirements, release date
        const accordionPanels = document.querySelectorAll('.accordion + .panel');

        // Description
        accordionPanels[0].innerHTML = `<p>${game.description_raw || 'No description available.'}</p>`;

        // Categories / Genres
        accordionPanels[1].innerHTML = `<p>${game.genres?.map(g => g.name).join(', ') || 'No categories available.'}</p>`;

        // Requirements
        const requirements = game.platforms?.map(p => {
            if (p.requirements?.minimum) {
                return `<strong>${p.platform.name}:</strong> ${p.requirements.minimum}`;
            }
            return null;
        }).filter(Boolean).join('<br>') || 'No requirements available.';
        accordionPanels[2].innerHTML = `<p>${requirements}</p>`;

        // Release Date
        accordionPanels[3].innerHTML = `<p>${game.released || 'No release date available.'}</p>`;

        // Imágenes del carrusel
        const screenshotRes = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`);
        const screenshots = await screenshotRes.json();
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = screenshots.results.map((shot, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${shot.image}" class="d-block w-50 mx-auto" alt="Screenshot ${index + 1}">
            </div>
        `).join('');
    } catch (error) {
        console.error('Error cargando detalles:', error);
    }
}

document.addEventListener("DOMContentLoaded", loadGameDetails);

document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(acc => {
        acc.addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });
    });
});