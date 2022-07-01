import { leagues, displayLeagues, countLeagues } from './modules/leagues.js';
import { appId } from './modules/user-interactions.js';
import './index.css';
import './modules/fontawesome/css/all.css';

window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  const data = await leagues();
  displayLeagues(data);
  const numberOfLeagues = await countLeagues();
  document.querySelector('.count').innerHTML = numberOfLeagues;
  await appId();
});
