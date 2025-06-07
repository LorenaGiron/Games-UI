const searchForm = document.querySelector('form[role="search"]');
const searchInput = searchForm.querySelector('input[type="search"]');
const genresList = document.getElementById('genres-list');

// API config
const urlBase = 'https://games-details.p.rapidapi.com/search?sugg=';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'fa076bb285msh7695b9780cdfbd3p1efd96jsn61537f61b091',
        'x-rapidapi-host': 'games-details.p.rapidapi.com'
    }
};

async function searchGames(query) {
    try {
        const response = await fetch(`${urlBase}${encodeURIComponent(query)}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Solo para depurar

        const games = data.data.search;

        genresList.innerHTML = ''; // Limpiar resultados anteriores

        if (!games || games.length === 0) {
            genresList.innerHTML = '<p class="text-center mt-4">No results found.</p>';
            return;
        }

        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'card mb-3';

            card.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${game.image}" class="img-fluid rounded-start" alt="${game.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${game.name}</h5>
                            <p class="card-text">${game.price || 'No price info available.'}</p>
                        </div>
                    </div>
                </div>
            `;

            genresList.appendChild(card);
        });

    } catch (error) {
        console.error('Fetch error:', error);
        genresList.innerHTML = `<p class="text-danger text-center mt-4">An error occurred while fetching games.<br>${error.message}</p>`;
    }
}

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        searchGames(query);
    }
});