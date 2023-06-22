import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

function updateBreedSelect(breeds) {
  refs.breedSelect.innerHTML = '';
  const breedOptions = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
  });
  refs.breedSelect.append(...breedOptions);
}

function updateCatInfo(catData) {
  refs.catInfo.innerHTML = `
    <div class="cat-content">
      <img class="cat-image" src="${catData.imageUrl}" alt="Cat Image">
      <div class="cat-details">
        <h2>${catData.breedName}</h2>
        <p><strong>Description:</strong> ${catData.description}</p>
        <p><strong>Temperament:</strong> ${catData.temperament}</p>
      </div>
    </div>
  `;
}

refs.breedSelect.addEventListener('change', () => {
  const selectedBreedId = refs.breedSelect.value;
  refs.loader.style.display = 'block';
  refs.catInfo.style.display = 'none';
  refs.error.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      refs.loader.style.display = 'none';
      updateCatInfo(catData);
      refs.catInfo.style.display = 'block';
    })
    .catch(() => {
      refs.loader.style.display = 'none';
      refs.error.style.display = 'block';
    });
});

refs.loader.style.display = 'block';

fetchBreeds()
  .then(breeds => {
    refs.loader.style.display = 'none';
    updateBreedSelect(breeds);
    refs.breedSelect.style.display = 'block';
  })
  .catch(() => {
    refs.loader.style.display = 'none';
    refs.error.style.display = 'block';
  });