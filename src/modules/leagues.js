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

export const displayLeagues = (list) => {
  let str = '';
  if (list === null) {
    str = '<li class="grid-item">No league</li>';
  } else {
    list.forEach((league) => {
      str += `<li class="grid-item">
      <div class="logo">
        <img src="${league.logos.light}" alt="logo">
      </div>
      <p>${league.name}</p>
      <div class="action-btns">
      <a href="" class="comment-btn">Comments</a>
      <a href="">5 Likes</a>
      </div>
    </li>`;
    });
    document.querySelector('.list').innerHTML = str;
  }
};