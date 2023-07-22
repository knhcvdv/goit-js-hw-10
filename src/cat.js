import axios from 'axios';
import Notify from 'notiflix';

// функція для забору порід

export function fetchBreeds() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
        Notify.Notify.failure(`Failed to fetch breeds: ${error}`);
    });
}

//  функція для забору породи по ід

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
        Notify.Notify.failure(`Failed to fetch breed: ${error}`);
    });
}

// код, який запускається, коли сторінка завантажується

window.onload = () => {
  // Fetch the breeds
  fetchBreeds().then(breeds => {
    // Hide the loader
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';

    // Add the breeds to the select
    const select = document.querySelector('.breed-select');
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      select.appendChild(option);
    });
  });
};
