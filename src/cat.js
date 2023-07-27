import axios from 'axios';
import Notify from 'notiflix';


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


export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
        Notify.Notify.failure(`Failed to fetch breed: ${error}`);
    });
}


window.onload = () => {
  fetchBreeds().then(breeds => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';

    const select = document.querySelector('.breed-select');
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      select.appendChild(option);
    });
  });
};
