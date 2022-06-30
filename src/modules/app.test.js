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

  test('Number of Comments', () => {
    const ul = document.querySelectorAll('.comments');
    ul.innerHTML = `<li>2022/06/29 Aga: good game</li>`;
    let counter = document.querySelectorAll('.comments_count');
    const comments = ul.childElementCount;
    expect(counter.textContext).toBe(comments);
  });
});