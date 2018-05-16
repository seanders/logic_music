const baseUrl = 'http://localhost:3000/api'

const baseConfig = {
  headers: {
    'content-type': 'application/json'
  },
}

function baseFetch(path, config = {}) {
  return fetch(`${baseUrl}${path}`, { ...baseConfig, ...config })
          .then(async (resp) => {
            const text = await resp.text();
            const data = text ? JSON.parse(text) : null;
            return { success: resp.status >= 200 && resp.status < 300, data };
          })
          .then(json => json);
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

export async function albumSearch(artistName) {
  return baseFetch(`/search`, {
    method: 'POST',
    body: JSON.stringify({ artist_name: artistName })
  })
}

export async function createAlbumFromDiscogs(discogAlbumId) {
  return baseFetch(`/albums/create_by_discogs`, {
    method: 'POST',
    body: JSON.stringify({
      discogs_album_id: discogAlbumId,
    }),
  })
}

export default {
  getArtists,
  getAlbums,
  upsertAlbum,
  destroyAlbum,
  albumSearch,
  createAlbumFromDiscogs,
}
