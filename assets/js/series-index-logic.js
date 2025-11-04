// assets/js/series-index-logic.js - Dados locais PRIMEIRO, TMDB como fallback

function sanitizeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const seriesId = urlParams.get("series");

  if (!seriesId || typeof CONTENT_CATEGORIES === "undefined") {
    document.getElementById("series-title").textContent =
      "Erro: Dados não encontrados.";
    return;
  }

  // Busca a série
  let foundItem = null;
  let foundCategory = null;
  for (const [categoryKey, categoryData] of Object.entries(
    CONTENT_CATEGORIES
  )) {
    if (categoryData.items[seriesId]) {
      foundItem = categoryData.items[seriesId];
      foundCategory = categoryKey;
      break;
    }
  }

  if (!foundItem) {
    document.getElementById("series-title").textContent =
      "Série não encontrada.";
    return;
  }

  // Função para buscar dados do TMDB
  async function fetchTmdbData(endpoint) {
    const url = `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=pt-BR`;
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Erro TMDB:", error);
      return null;
    }
  }

  // Busca dados do TMDB apenas se for ID válido
  let tmdbData = null;
  const isValidTmdbId = !isNaN(Number(seriesId)) && Number(seriesId) < 900000;
  if (isValidTmdbId) {
    const contentType = foundCategory === "series" ? "tv" : "movie";
    tmdbData = await fetchTmdbData(`${contentType}/${seriesId}`);
  }

  // PRIORIDADE: Dados locais PRIMEIRO, TMDB como fallback
  const title =
    foundItem.title ||
    (tmdbData ? tmdbData.name || tmdbData.title : "Título não disponível");
  const overview =
    foundItem.overview ||
    (tmdbData ? tmdbData.overview : "Sinopse não disponível.");
  const posterPath =
    foundItem.poster_path ||
    (tmdbData && tmdbData.poster_path
      ? `${TMDB_IMAGE_BASE}${tmdbData.poster_path}`
      : "https://via.placeholder.com/250x350/1e1e1e/FFFFFF?text=SEM+POSTER");
  const backdropPath =
    foundItem.backdrop_path ||
    (tmdbData && tmdbData.backdrop_path
      ? `${TMDB_BACKDROP_BASE}${tmdbData.backdrop_path}`
      : "");
  const releaseDate = tmdbData
    ? tmdbData.first_air_date || tmdbData.release_date
    : null;
  const year =
    foundItem.year || (releaseDate ? releaseDate.substring(0, 4) : "Clássico");

  document.getElementById("page-title").textContent = title;
  document.getElementById("series-title").textContent = title;
  document.getElementById("series-overview").textContent = overview;

  // Carrega imagens
  const posterArea = document.getElementById("poster-area");
  const heroDetail = document.getElementById("series-hero-detail");

  if (posterArea) {
    posterArea.innerHTML = `<img src="${posterPath}" alt="${title} Poster">`;
  }

  if (backdropPath && heroDetail) {
    heroDetail.style.backgroundImage = `url(${backdropPath})`;
    heroDetail.style.backgroundSize = "cover";
    heroDetail.style.backgroundPosition = "center";
  }

  // Determina se é série ou filme
  const isSeries = foundCategory === "series";

  if (isSeries) {
    // LÓGICA PARA SÉRIES
    const seasons = new Set();
    Object.keys(foundItem.dailymotion_videos || {}).forEach((key) => {
      const seasonNum = parseInt(key.split("_")[0]);
      if (seasonNum > 0) seasons.add(seasonNum);
    });

    const seasonsList = Array.from(seasons).sort((a, b) => a - b);
    document.getElementById(
      "metadata"
    ).innerHTML = `<span>${year}</span> | <span>${seasonsList.length} Temporadas</span>`;

    // Cria botões de temporada
    const seasonsContainer = document.getElementById("seasons-selector");
    let buttonsWrapper = seasonsContainer.querySelector(".buttons-wrapper");
    if (!buttonsWrapper) {
      buttonsWrapper = document.createElement("div");
      buttonsWrapper.className = "buttons-wrapper";
      seasonsContainer.appendChild(buttonsWrapper);
    }

    buttonsWrapper.innerHTML = "";

    seasonsList.forEach((seasonNumber) => {
      const button = document.createElement("a");
      button.textContent = `Temporada ${seasonNumber}`;
      button.href = "#";
      button.className = "season-button";
      button.onclick = (e) => {
        e.preventDefault();
        loadEpisodes(seasonNumber);
        document
          .querySelectorAll(".season-button")
          .forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
      };
      buttonsWrapper.appendChild(button);
    });

    // Função para carregar episódios
    async function loadEpisodes(seasonNumber) {
      const listElement = document.getElementById("episodes-list");
      listElement.innerHTML =
        '<li class="loading-item" style="padding: 15px 25px;">Carregando episódios...</li>';

      // Busca dados dos episódios do TMDB se disponível
      let tmdbEpisodes = null;
      if (isValidTmdbId) {
        tmdbEpisodes = await fetchTmdbData(
          `tv/${seriesId}/season/${seasonNumber}`
        );
      }

      // Busca episódios locais
      const localEpisodes = [];
      if (foundItem.episodes) {
        Object.keys(foundItem.episodes).forEach((key) => {
          const [season, episode] = key.split("_").map(Number);
          if (season === seasonNumber && episode > 0) {
            localEpisodes.push({
              number: episode,
              key: key,
              title: foundItem.episodes[key].title,
              videoId: foundItem.episodes[key].video,
            });
          }
        });
      } else {
        Object.keys(foundItem.dailymotion_videos || {}).forEach((key) => {
          const [season, episode] = key.split("_").map(Number);
          if (season === seasonNumber && episode > 0) {
            localEpisodes.push({
              number: episode,
              key: key,
              title: `Episódio ${episode}`,
              videoId: foundItem.dailymotion_videos[key],
            });
          }
        });
      }

      localEpisodes.sort((a, b) => a.number - b.number);
      listElement.innerHTML = "";

      localEpisodes.forEach((ep) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        // PRIORIDADE: Título local PRIMEIRO, TMDB como fallback
        let episodeTitle = ep.title;
        let episodeOverview = "Mistério clássico do Scooby-Doo com a turma";

        // Só usa TMDB se não tiver título local específico
        if (
          (!ep.title || ep.title === `Episódio ${ep.number}`) &&
          tmdbEpisodes &&
          tmdbEpisodes.episodes
        ) {
          const tmdbEp = tmdbEpisodes.episodes.find(
            (e) => e.episode_number === ep.number
          );
          if (tmdbEp) {
            episodeTitle = tmdbEp.name || ep.title;
            episodeOverview = tmdbEp.overview || episodeOverview;
          }
        }

        a.href = `player.html?series=${seriesId}&t=${seasonNumber}&e=${ep.number}`;
        a.innerHTML = `
                    <strong>E${ep.number}. ${episodeTitle}</strong>
                    <span class="episode-overview">${episodeOverview}</span>
                `;

        li.appendChild(a);
        listElement.appendChild(li);
      });
    }

    // Botão continuar assistindo para séries
    const continueBtn = document.getElementById("continue-watching-btn");
    const savedProgress = localStorage.getItem(`lastWatched_${seriesId}`);
    let lastSeason = 1,
      lastEpisode = 1;

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      lastSeason = progress.t || 1;
      lastEpisode = progress.e || 1;
    }

    continueBtn.href = `player.html?series=${seriesId}&t=${lastSeason}&e=${lastEpisode}`;
    continueBtn.textContent = `▶ Continuar T${lastSeason} E${lastEpisode}`;
    continueBtn.classList.remove("disabled");

    // Carrega primeira temporada por padrão
    if (seasonsList.length > 0) {
      loadEpisodes(seasonsList[0]);
      document.querySelector(".season-button").classList.add("active");
    }
  } else {
    // LÓGICA PARA FILMES - PLAYER INTEGRADO
    document.getElementById(
      "metadata"
    ).innerHTML = `<span>${year}</span> | <span>Filme</span>`;

    const seasonsContainer = document.getElementById("seasons-selector");
    seasonsContainer.style.display = "none";

    const videoId = foundItem.dailymotion_videos["1_1"];
    if (videoId) {
      let playerHtml = "";

      if (videoId.startsWith("gdrive:")) {
        const fileId = videoId.replace("gdrive:", "");
        const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

        playerHtml = `
                    <div class="movie-player-section">
                        <h3>Assistir Filme</h3>
                        <div id="player-wrapper" class="dailymotion-embed-wrapper">
                            <iframe 
                                id="movie-player-iframe"
                                frameborder="0" 
                                width="100%" 
                                height="500" 
                                src="${embedUrl}"
                                allowfullscreen>
                            </iframe>
                            <button id="fullscreen-btn" class="player-fullscreen-btn" title="Tela Cheia">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                            </button>
                        </div>
                    </div>
                `;
      } else {
        playerHtml = `
                    <div class="movie-player-section">
                        <h3>Assistir Filme</h3>
                        <div id="player-wrapper" class="dailymotion-embed-wrapper">
                            <iframe 
                                id="movie-player-iframe"
                                frameborder="0" 
                                width="100%" 
                                height="500" 
                                src="https://www.dailymotion.com/embed/video/${videoId}?autoplay=0&info=0&logo=0&ui-highlight=%23ff9800&mute=0&ui-components=controls&quality=1080&fullscreen=1"
                                allowfullscreen="true"
                                webkitallowfullscreen="true"
                                mozallowfullscreen="true"
                                allow="autoplay; fullscreen; picture-in-picture; web-share; accelerometer; gyroscope">
                            </iframe>
                            <button id="fullscreen-btn" class="player-fullscreen-btn" title="Tela Cheia">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                            </button>
                        </div>
                    </div>
                `;
      }
      document.getElementById("episodes-list").innerHTML = playerHtml;

      // Adiciona o ouvinte de evento para o botão de tela cheia
      const playerWrapper = document.getElementById("player-wrapper");
      const fullscreenButton = document.getElementById("fullscreen-btn");

      if (playerWrapper && fullscreenButton) {
        fullscreenButton.addEventListener("click", () => {
          if (playerWrapper.requestFullscreen) {
            playerWrapper.requestFullscreen();
          } else if (playerWrapper.mozRequestFullScreen) {
            /* Firefox */
            playerWrapper.mozRequestFullScreen();
          } else if (playerWrapper.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            playerWrapper.webkitRequestFullscreen();
          } else if (playerWrapper.msRequestFullscreen) {
            /* IE/Edge */
            playerWrapper.msRequestFullscreen();
          }
        });
      }
    } else {
      document.getElementById("episodes-list").innerHTML =
        '<div class="movie-player-section"><h3>Filme Indisponível</h3><p>Este filme ainda não está disponível para assistir.</p></div>';
    }

    // Botão para filmes
    const continueBtn = document.getElementById("continue-watching-btn");
    continueBtn.href = "#episodes-list";
    continueBtn.textContent = "▶ Assistir Filme";
    continueBtn.classList.remove("disabled");

    continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("episodes-list")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
});
