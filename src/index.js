import { leagues, displayLeagues } from './modules/leagues.js';
import './index.css';

window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  const data = await leagues();
  displayLeagues(data);
  document.querySelector('.count').innerHTML = data.length;
});
