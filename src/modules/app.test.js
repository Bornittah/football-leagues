import fetchMock from 'jest-fetch-mock';
import { leagues, countLeagues } from './leagues.js';
import {
  appId, addComments, fetchComments, countComments, addLikes, fetchLikes,
} from './user-interactions.js';

fetchMock.doMock();

describe('Tests', () => {
  document.body.innerHTML = `<header class="flex">
  <a href="#" class="company-logo">LEAGUES</a>
  <h1>Football Leagues(<span class="count"></span>)</h1>
</header>
<main>
  <section>
    <ul class="grid-container list"></ul>
    <div class="modal-overlay">
      <div class="modal" id="league-modal"></div>
    </div>
  </section>
</main>
<footer>
  <p>
    Created by: 
    <a href="https://github.com/Bornittah">Agasha Bornittah</a>
    Under
    <a href="https://www.microverse.org/">Microverse</a>
  </p>
</footer>`;

  test('Number of Leagues', async () => {
    const data = await leagues();
    const number = await countLeagues();
    expect(data.length).toBe(number);
  });

  test('Number of Comments', async () => {
    await appId();
    const key = localStorage.getItem('football');
    const data = await leagues();
    const id = data[0].id;
    const comment = {
      item_id: id,
      username: 'Agasha',
      comment: 'Nice game!',
    };
    const { item_id, username, message } = comment;
    await addComments(key, comment);
    const comments = await fetchComments(key, id);
    const commentCounter = await countComments(id);
    expect(commentCounter).toBe(comments.length);
  }, 30000);

  test('Number of Likes', async () => {
    await appId();
    const key = localStorage.getItem('football');
    const data = await leagues();
    const id = data[0].id;
    const like = {
      item_id: id,
    };
    const { item_id } = like;
    await addLikes(key, like);
    const likes = await fetchLikes(key, id);
    expect(likes.length).toBe(1);
  }, 30000);
});
