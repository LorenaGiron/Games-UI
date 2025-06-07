const newsPerPage = 9;
const maxNews = 100;
let currentPage = 1;
let allNews = [];
let filteredNews = [];

const fetchNews = async () => {
    const url = 'https://epic-games-store.p.rapidapi.com/getNews/locale/en/limit/100';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1eaa470d96msh9a134e90ef0b98ap146897jsn112e62225d2e',
            'x-rapidapi-host': 'epic-games-store.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('Fetched news:', result);
        allNews = result.slice(0, maxNews);
        filteredNews = []; // Limpiar filtros al cargar
        populateAuthorFilter();
        displayPage(currentPage);
        updateButtons();
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('news-container').innerHTML = '<p>Error al cargar las noticias.</p>';
    }
};

const populateAuthorFilter = () => {
    const authorMap = new Map();

    allNews.forEach(news => {
        if (!news.author) return;

        const cleanName = news.author.trim().toLowerCase();

        if (!authorMap.has(cleanName)) {
            authorMap.set(cleanName, news.author.trim());
        }
    });

    const authors = Array.from(authorMap.values()).sort((a, b) => a.localeCompare(b));

    const select = document.getElementById('author-filter');
    select.innerHTML = '<option value="">All the authors</option>';

    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author.toLowerCase(); // comparar con esto
        option.textContent = author;
        select.appendChild(option);
    });
};

const applyFilters = () => {
    const selectedAuthor = document.getElementById('author-filter').value;
    const selectedOrder = document.getElementById('date-filter').value;

    filteredNews = allNews.filter(news => {
        const authorNormalized = (news.author || '').trim().toLowerCase();
        const matchesAuthor = selectedAuthor === '' || authorNormalized === selectedAuthor;
        return matchesAuthor;
    });

    // Ordenar por fecha
    filteredNews.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return selectedOrder === 'oldest' ? dateA - dateB : dateB - dateA;
    });

    currentPage = 1;
    displayPage(currentPage);
    updateButtons();
};

const displayPage = (page) => {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    const newsToShow = filteredNews.length ? filteredNews : allNews;
    const start = (page - 1) * newsPerPage;
    const end = start + newsPerPage;
    const pageNews = newsToShow.slice(start, end);

    pageNews.forEach(news => {
        const title = news.title || 'Título no disponible';
        const author = news.author || 'Autor desconocido';
        const date = new Date(news.date).toLocaleDateString() || '';
        const image = (news._images_ && news._images_.length > 0) ? news._images_[0] : 'https://via.placeholder.com/400x200?text=No+Image';

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = news.content || '';
        let excerpt = tempDiv.querySelector('p') ? tempDiv.querySelector('p').textContent : '';
        if (excerpt.length > 150) excerpt = excerpt.substring(0, 150) + '...';

        const urlBase = 'https://www.epicgames.com';
        const newsUrl = news.url ? urlBase + news.url : '#';

        const card = document.createElement('article');
        card.className = 'news-card';

        card.innerHTML = `
            <img src="${image}" alt="${title}" />
            <div class="news-content">
                <a href="${newsUrl}" target="_blank" rel="noopener" class="news-title">${title}</a>
                <div class="news-meta">By ${author} | ${date}</div>
                <p class="news-excerpt">${excerpt}</p>
                <a href="${newsUrl}" target="_blank" rel="noopener" class="news-link">Read more</a>
            </div>
        `;

        container.appendChild(card);
    });
};

const updateButtons = () => {
    const totalNews = filteredNews.length ? filteredNews : allNews;
    const totalPages = Math.ceil(totalNews.length / newsPerPage);
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
};

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    const totalNews = filteredNews.length ? filteredNews : allNews;
    const totalPages = Math.ceil(totalNews.length / newsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.getElementById('author-filter').addEventListener('change', applyFilters);
document.getElementById('date-filter').addEventListener('change', applyFilters);

fetchNews();
