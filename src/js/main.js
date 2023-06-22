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
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    refs.breedSelect.appendChild(option);
  });
}

function updateCatInfo(catData) {
  const catContent = document.createElement('div');
  catContent.classList.add('cat-content');

  const catImage = document.createElement('img');
  catImage.classList.add('cat-image');
  catImage.src = catData.imageUrl;
  catImage.alt = 'Cat Image';
  catContent.appendChild(catImage);

  const catDetails = document.createElement('div');
  catDetails.classList.add('cat-details');

  const breedName = document.createElement('h2');
  breedName.textContent = catData.breedName;
  catDetails.appendChild(breedName);

  const description = document.createElement('p');
  description.innerHTML = `<strong>Description:</strong> ${catData.description}`;
  catDetails.appendChild(description);

  const temperament = document.createElement('p');
  temperament.innerHTML = `<strong>Temperament:</strong> ${catData.temperament}`;
  catDetails.appendChild(temperament);

  catContent.appendChild(catDetails);

  refs.catInfo.innerHTML = '';
  refs.catInfo.appendChild(catContent);
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