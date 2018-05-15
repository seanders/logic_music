const baseUrl = 'http://localhost:3000/api'

const baseConfig = {
  headers: {
    'content-type': 'application/json'
  },
}

function baseFetch(path, config = {}) {
  return fetch(`${baseUrl}${path}`, { ...baseConfig, ...config }).
          then(async (resp) => {
            const text = await resp.text();
            const data = text ? JSON.parse(text) : null;
            return { success: resp.status >= 200 && resp.status < 300, data };
          }).
          then(json => json);
}

export async function getArtists() {
  return baseFetch('/artists');
}

export async function getAlbums() {
  return baseFetch('/albums');
}

export async function upsertAlbum(albumAttributes) {
  const albumId = albumAttributes.id;

  return baseFetch(`/albums/${albumId || ''}`, {
    body: JSON.stringify(albumAttributes),
    method: albumId ? 'PUT' : 'POST',
  });
}

export async function destroyAlbum(id) {
  return baseFetch(`/albums/${id}`, {
    method: 'DELETE',
  });
}

export default {
  getArtists,
  getAlbums,
  upsertAlbum,
  destroyAlbum,
}
