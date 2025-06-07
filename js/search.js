const searchForms = document.querySelectorAll('form[role="search"]');

// Crear el contenedor solo UNA vez
const resultContainer = document.createElement('div');
resultContainer.className = 'search-results bg-dark text-white p-3 rounded shadow';
resultContainer.style.position = 'fixed';
resultContainer.style.top = '70px';
resultContainer.style.right = '20px';
resultContainer.style.width = '300px';
resultContainer.style.maxHeight = '80vh';
resultContainer.style.overflowY = 'auto';
resultContainer.style.zIndex = '9999';
resultContainer.style.display = 'none';
document.body.appendChild(resultContainer);

searchForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="search"]');
        const query = input.value.trim();

        if (!query) return;

        const url = `https://games-details.p.rapidapi.com/search?sugg=${encodeURIComponent(query)}`;
        const options = {
            method: 'GET',
            headers: {
            'x-rapidapi-key': '0272d01fe9mshf576bfdf1ca2482p13f58bjsnbc5c66037bba',
                'x-rapidapi-host': 'games-details.p.rapidapi.com'
            }
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();

            if (data?.data?.search?.length > 0) {
                renderResults(data.data.search);
            } else {
                resultContainer.innerHTML = '<p>No se encontraron juegos.</p>';
                resultContainer.style.display = 'block';
            }
        } catch (err) {
            console.error('Error en la búsqueda:', err);
            resultContainer.innerHTML = '<p>Error al obtener los datos. Inténtalo más tarde.</p>';
            resultContainer.style.display = 'block';
        }
    });
});

function renderResults(games) {
    resultContainer.innerHTML = '';
    games.forEach(game => {
        const item = document.createElement('div');
        item.className = 'search-item d-flex align-items-center mb-2';
        item.style.cursor = 'pointer';
        item.style.padding = '8px';
        item.style.borderRadius = '8px';
        item.style.transition = 'background-color 0.2s';

        // Efecto hover con JS
        item.addEventListener('mouseover', () => {
            item.style.backgroundColor = '#343a40'; 
        });
        item.addEventListener('mouseout', () => {
            item.style.backgroundColor = ''; 
        });

        item.innerHTML = `
            <img src="${game.image}" alt="${game.name}" class="me-2" style="width: 60px; height: auto;">
            <div>
                <strong>${game.name}</strong><br>
                <small>${game.price}</small>
            </div>
        `;

        item.addEventListener('click', () => {
            localStorage.setItem('juegoID', game.id);
            window.location.href = 'detalles.html';
            console.log('Juego seleccionado:', game.id);
        });

        resultContainer.appendChild(item);
    });
    resultContainer.style.display = 'block';
}

document.addEventListener('click', (e) => {
    if (!resultContainer.contains(e.target) && !e.target.closest('form[role="search"]')) {
        resultContainer.style.display = 'none';
    }
});
