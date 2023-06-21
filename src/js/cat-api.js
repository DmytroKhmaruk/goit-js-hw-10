
const API_KEY = 'live_728PapWsM0wXF5SsTwuE9TPKaDtX6BmPMTsZtslInocr41VcPVuycHLOiE3LelIy';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  const url = `${BASE_URL}/breeds`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching breeds');
      }
      return response.json();
    })
    .then(data =>
      data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }))
    )
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching cat by breed');
      }
      return response.json();
    })
    .then(data => {
      const catData = data[0];
      const breedName = catData.breeds[0].name;
      const description = catData.breeds[0].description;
      const temperament = catData.breeds[0].temperament;
      const imageUrl = catData.url;

      return {
        breedName,
        description,
        temperament,
        imageUrl,
      };
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}

