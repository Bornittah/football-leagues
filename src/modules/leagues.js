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
      <div class="action-btns flex space-btn">
      <a href="" data-modal-target="#league-modal" class="comment-btn">Comments</a>
      <a href="">5 Likes</a>
      </div>
    </li>`;
    });
    document.querySelector('.list').innerHTML = str;

    const modal=document.querySelector('.modal');
    document.querySelectorAll('.comment-btn').forEach((button, index)=>{
      button.addEventListener('click', (e)=>{
        e.preventDefault();
        document.querySelector('.modal-overlay').classList.add('active');
        modal.style.display = 'flex';
        let item = list[index];
        const div = `<div class="modal-header">
        <span class="close flex">&times;</span>
       </div>
       <div class="modal-body">
        <img src="${item.logos.light}" alt="logo">
        <div class="m-12-h-2">
          <h2>${item.name}</h2>
          <p><b>Slug:</b> ${item.slug}</p>
          <p><b>Abbr:</b> ${item.abbr}</p>
        </div>
       <div class="flex space-btn">
        <div class="m-12-h-2">
          <h2>Seasons</h2>
          <p>Name:</p>
          <p>Description:</p>
          <p>Abbreviation:</p>
          <p>seasons:</p>
        </div>
        <div class="m-12-h-2">
          <h2>Standings</h2>
          <p>Season display:</p>
          <p>Season:</p>
          <p>Standings:</p>
        </div>
       </div>
        <h2>Comments<span>(1)</span></h2>
        <ul class="comments">
         <li class="flex">
           <date>21/06/2022</date>
           <p><b>Alex:</b></p>
           <p>It was agreat season</p>
         </li>
        </ul>
        <div class="form-section">
         <form class="flex flex-col form">
           <input type="text" id="username" placeholder="Your name">
           <textarea id="insights" placeholder="Your Insights" rows="5"></textarea>
           <button type="submit">Comment</button>
         </form>
        </div>
       </div>`;
       modal.innerHTML = div;
       document.querySelector('.close').addEventListener('click', ()=>{
        document.querySelector('.modal-overlay').classList.remove('active');
        modal.style.display = 'none';
      }); 

      });
    });
  }
};
