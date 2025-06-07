const searchForms = document.querySelectorAll('form[role="search"]');

// Crear el contenedor solo UNA vez
const resultContainer = document.createElement('div');
resultContainer.className = 'search-results bg-dark text-white p-3 rounded shadow';
resultContainer.style.position = 'fixed';
resultContainer.style.top = '70px'; // Ajusta si tu navbar es más alto
resultContainer.style.right = '20px';
resultContainer.style.width = '300px';
resultContainer.style.maxHeight = '80vh';
resultContainer.style.overflowY = 'auto';
resultContainer.style.zIndex = '9999';
resultContainer.style.display = 'none'; // Oculto por defecto
document.body.appendChild(resultContainer);

searchForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="search"]');
        const query = input.value.trim();

        if (!query) return;

        // Ya no necesitas positionResults(input);

        // Llama a la API con el texto ingresado
        const url = `https://games-details.p.rapidapi.com/search?sugg=${encodeURIComponent(query)}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'fa076bb285msh7695b9780cdfbd3p1efd96jsn61537f61b091',
                'x-rapidapi-host': 'games-details.p.rapidapi.com'
            }
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();

            if (data?.data?.search?.length > 0) {
                renderResults(data.data.search);
            } else {
                resultContainer.innerHTML = '<p>No games found.</p>';
                resultContainer.style.display = 'block';
            }
        } catch (err) {
            console.error('Search error:', err);
            resultContainer.innerHTML = '<p>Error fetching data. Try again later.</p>';
            resultContainer.style.display = 'block';
        }
    });
});

function renderResults(games) {
    resultContainer.innerHTML = '';
    games.forEach(game => {
        const item = document.createElement('div');
        item.className = 'search-item d-flex align-items-center mb-2';
        item.innerHTML = `
            <img src="${game.image}" alt="${game.name}" class="me-2" style="width: 60px; height: auto;">
            <div>
                <strong>${game.name}</strong><br>
                <small>${game.price}</small>
            </div>
        `;
        resultContainer.appendChild(item);
    });
    resultContainer.style.display = 'block';
}

document.addEventListener('click', (e) => {
    if (!resultContainer.contains(e.target) && !e.target.closest('form[role="search"]')) {
        resultContainer.style.display = 'none';
    }
});