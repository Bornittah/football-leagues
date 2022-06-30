import { leagues, displayLeagues } from './modules/leagues.js';
import { appId } from './modules/user-interactions.js';
import './index.css';
import './modules/fontawesome/css/all.css';

window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  const data = await leagues();
  displayLeagues(data);
  document.querySelector('.count').innerHTML = data.length;
  await appId();
});
