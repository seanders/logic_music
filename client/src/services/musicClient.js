const baseUrl = 'http://localhost:3000/api'

function baseFetch(path) {
  return fetch(`${baseUrl}${path}`).
          then(resp => resp.json()).
          then(json => json);
}

export async function getArtists() {
  return baseFetch('/artists');
}

export async function getAlbums() {
  return baseFetch('/albums');
}
