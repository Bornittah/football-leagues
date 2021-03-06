import {
  addComments, showCommentsToUI, addLikes, displayLikes, countComments,
} from './user-interactions.js';

export const API = 'https://api-football-standings.azharimm.site/leagues';

export const leagues = async () => {
  const response = await fetch(`${API}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

  const promise = await response.json().then((data) => data.data).catch((err) => err);
  return promise;
};

export const seasons = async (id) => {
  const response = await fetch(`${API}/${id}/seasons`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

  const promise = await response.json().then((data) => data.data).catch((err) => err);
  return promise;
};

export const standings = async (id) => {
  const response = await fetch(`${API}/${id}/standings`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

  const promise = await response.json().then((data) => data.data).catch((err) => err);
  return promise;
};

export const countLeagues = async () => {
  const data = await leagues();
  return data.length;
};

export const displayLeagues = (list) => {
  const appId = localStorage.getItem('football');
  let str = '';
  if (list === null) {
    str = '<li class="grid-item">No league</li>';
  } else {
    list.forEach((league) => {
      const id = league.id.replace('.', '');
      str += `<li class="grid-item">
      <div class="logo">
        <img src="${league.logos.light}" alt="logo">
      </div>
      <p>${league.name}</p>
      <div class="action-btns flex space-btn">
      <a href="" data-modal-target="#league-modal" class="comment-btn">Comments</a>
      <a href="">
        <i class="fa-regular fa-heart like-btn"></i>
        <span id="likes-counter-${id}"></span>
      </a>
      </div>
    </li>`;
      displayLikes(league, league.id);
    });
    document.querySelector('.list').innerHTML = str;

    const modal = document.querySelector('.modal');
    document.querySelectorAll('.comment-btn').forEach((button, index) => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const item = list[index];
        document.querySelector('.modal-overlay').classList.add('active');
        modal.style.display = 'flex';
        const season = await seasons(item.id);
        const standing = await standings(item.id);
        const commentCounter = await countComments(item.id);
        const div = `<div class="modal-header">
        <span class="close flex">&times;</span>
       </div>
       <div class="modal-body">
        <img src="${item.logos.light}" class="modal-image" alt="logo">
        <div class="m-12-h-2">
          <h2>${item.name}</h2>
          <p><b>Slug:</b> ${item.slug}</p>
          <p><b>Abbr:</b> ${item.abbr}</p>
        </div>
       <div class="">
        <div class="m-12-h-2">
          <h2>Seasons & standings</h2>
          <div class="flex">
            <p>Period: ${season.seasons[season.seasons.length - 1].year} - ${season.seasons[0].year}</p>
          </div>
          <p>seasons: ${season.seasons.length}</p>
          <p>Standings:${standing.standings.length}</p>
        </div>
       </div>
        <h2>Comments(<span class="comments_count"></span>)</h2>
        <ul class="comments"></ul>
        <div class="form-section">
         <form class="flex flex-col form">
           <input type="text" class="username" placeholder="Your name">
           <textarea class="insights" placeholder="Your Insights" rows="5"></textarea>
           <button type="submit" class="submit-comment">Comment</button>
         </form>
        </div>
      </div>`;
        modal.innerHTML = div;
        document.querySelector('.close').addEventListener('click', () => {
          document.querySelector('.modal-overlay').classList.remove('active');
          modal.style.display = 'none';
        });

        const username = document.querySelector('.username');
        const message = document.querySelector('.insights');
        document.querySelectorAll('.submit-comment').forEach((button) => {
          button.addEventListener('click', async (e) => {
            e.preventDefault();
            const comment = {
              item_id: item.id,
              username: username.value,
              comment: message.value,
            };
            await addComments(appId, comment);
            await showCommentsToUI(appId, item.id);
            username.value = '';
            message.value = '';
            document.querySelector('.comments_count').textContent = commentCounter;
          });
        });
        showCommentsToUI(appId, item.id);
        document.querySelector('.comments_count').textContent = commentCounter;
      });
    });

    document.querySelectorAll('.like-btn').forEach((button, index) => {
      button.addEventListener('click', async (e) => {
        const item = list[index];
        e.preventDefault();
        const like = {
          item_id: item.id,
        };
        await addLikes(appId, like);
        await displayLikes(item, item.id);
      });
    });
  }
};
