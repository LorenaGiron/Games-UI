const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");
const gameName = urlParams.get("name") || "Game";

const gameTitleElement = document.getElementById("gameTitle");
gameTitleElement.textContent = `${gameName} News`;

const newsContainer = document.getElementById("newsContainer");

const fetchNews = async () => {
  const url = `https://games-details.p.rapidapi.com/news/all/${gameId}?limit=12&offset=0`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0125ddbecfmsh76a100fd69cb6f8p176878jsn171261301bb3",
      "x-rapidapi-host": "videogames-news2.p.rapidapi.com"
    }
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();

    newsContainer.innerHTML = "";

    data.news.forEach(news => {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${news.news_title}</h5>
            <p class="card-text">${news.content.slice(0, 150)}...</p>
            <button class="btn btn-primary btn-see-more mt-auto" onclick='showFullNews(\`
              <h5>${news.news_title}</h5>
              <p>${news.content}</p>
              <div class="card-footer">
                <small>${news.date} | ${news.like} likes</small>
              </div>
            \`)'>See more</button>
          </div>
        </div>
      `;
      newsContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    newsContainer.innerHTML = `<p>Could not load news. Try again later.</p>`;
  }
};

function showFullNews(html) {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.setAttribute("tabindex", "-1");
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          ${html}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
  modal.addEventListener("hidden.bs.modal", () => modal.remove());
}

fetchNews();
