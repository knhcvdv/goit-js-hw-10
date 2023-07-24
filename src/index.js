import './css/style.css'

import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_Pqtw4PN8Wr6W2k8hbCUDY8kfhY5BsSYeQV1hmOpzxGYCsD77Up3gK1ECPRx2NxHg";
import SlimSelect from 'slim-select'
new SlimSelect({
  select: '#selectElement'
})
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchBreeds, fetchCatByBreed} from "./cat"
import SlimSelect from 'slim-select';
import {
  hideCatInfo,
  hideLoader,
  showCatInfo,
  showLoader,
} from './additional';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

catInfo.addEventListener('input', () => {
  if (catInfo.value.trim()) {
    catInfo.style.opacity = 1;
  } else {
    catInfo.style.opacity = 0;
  }
});

loader.style.display = 'none';
loader.style.display = 'block';
breedSelect.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.style.display = 'block';
    loader.style.display = 'none';
  })
  .catch(error => Notify.Notify.failure(error));

breedSelect.addEventListener('change', makeCatByBreed);


fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .then(() => {
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(error => Notify.Notify.failure(error));

breedSelect.addEventListener('change', makeCatByBreed);

function makeCatByBreed() {
  const breedId = breedSelect.value;

  showLoader();
  hideCatInfo();
  fetchCatByBreed(breedId)
    .then(catData => {
      hideLoader();
      showCatInfo();
      const catName = catData[0].breeds[0].name;
      const imgUrl = catData[0].url;
      const catDescr = catData[0].breeds[0].description;
      const catTemp = catData[0].breeds[0].temperament;

      const markUp = `
    
    <img src="${imgUrl}" alt="${catName} width="250" height="250" class="cat-img" loading="lazy">
    
    <div class="cat-data">
    <h2 class="cat-name">${catName}</h2>
    <p class="cat-text">${catDescr}</p>>
    <p class="cat-temperament">Temperament:${catTemp}</p>
    </div> `;

    catInfo.innerHTML = markUp;
  })
  .catch(error => {
    // Remove the previous markup if there is an error.
    catInfo.innerHTML = previousMarkup;
    Notify.Notify.failure(error);
  });
}