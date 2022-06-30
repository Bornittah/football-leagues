export const INVOLVEMENT_API = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

export const appId = async () => {
  const response = await fetch(`${INVOLVEMENT_API}/apps/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
  const id = await response.text();
  const key = localStorage.getItem('football');
  if (key === null) {
    localStorage.setItem('football', id);
    const newKey = localStorage.getItem('football');
    return newKey;
  }
  return key;
};

export const addComments = async (id, data) => {
  const response = await fetch(`${INVOLVEMENT_API}/apps/${id}/comments/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

  const user = await response.json().then((data) => data).catch((err) => err);
  return user;
};

export const fetchComments = async (id, itemId) => {
  const response = await fetch(`${INVOLVEMENT_API}/apps/${id}/comments/?item_id=${itemId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const comments = await response.json().then((data) => data).catch((err) => err);
  return comments;
};

export const displayComments = (list) => {
  let str = '';
  if (list === null) {
    str = '<li class="flex">No Comment</li>';
  } else {
    list.forEach((data) => {
      str += ` <li class="flex">
      <p>${data.creation_date}</p>
      <p><b>${data.username}:</b></p>
      <p>${data.comment}</p>
    </li>`;
    });
    document.querySelector('.comments').innerHTML = str;
  }
};

export const showCommentsToUI = async (comments, itemId) => {
  const key = localStorage.getItem('football');
  if (key === null) {
    displayComments(comments);
    document.querySelector('.comments_count').textContent = comments.length;
  } else {
    comments = await fetchComments(key, itemId);
    displayComments(comments);
    document.querySelector('.comments_count').textContent = comments.length;
  }
};

export const addLikes = async (id, data) => {
  const response = await fetch(`${INVOLVEMENT_API}/apps/${id}/likes/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

  const likes = await response.json().then((data) => data).catch((err) => err);
  return likes;
};

export const fetchLikes = async (id) => {
  const response = await fetch(`${INVOLVEMENT_API}/apps/${id}/likes/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const likes = await response.json().then((data) => data).catch((err) => err);
  return likes;
};

export const displayLikes = async (items, itemId) => {
  const newId = itemId.replace('.', '');
  const key = localStorage.getItem('football');
  if (key === null) {
    document.querySelector(`#likes-counter-${newId}`).textContent = `${0} likes`;
  } else {
    items = await fetchLikes(key, itemId);
    items.forEach((like) => {
      const count = like.likes;
      if (like.item_id === itemId) {
        if (count === 1) {
          document.querySelector(`#likes-counter-${newId}`).textContent = `${count} like`;
        } else {
          document.querySelector(`#likes-counter-${newId}`).textContent = `${count} likes`;
        }
      }
    });
  }
};
