import axios from "axios";
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchBreeds, fetchCatByBreed} from "./cat"


const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
const pictureEl = document.querySelector(".cat-info");

fetchBreeds()
.then(data => {
    console.log(data);
    selectEl.innerHTML = data.map(Element => `<option value="${Element.id}">${Element.name}</option>`).join("")
})
.catch(() => errorEl.removeAttribute("hidden"))
.finally(() => loaderEl.setAttribute("hidden", true))

selectEl.addEventListener("change", onChange)   

function onChange(event){
loaderEl.removeAttribute("hidden")
    fetchCatByBreed(event.target.value)
    .then(data =>   {
        const img = data.map(element => 
        `<img src="${element.url}" alt="cat" width="" height="">`).join("")
        pictureEl.innerHTML = img
        data.map(element => {
            element.breeds.forEach(cat => {
                const array = [cat]
                const findById = array.find(option => option.id === `${event.target.value}`)
                const markup = `<div class="flex">
                <h2>${findById.name}</h2>
                <p>${findById.description}</p>
                <h2>Temperament</h2>
                <p>${findById.temperament}</p>
                </div>`
                    pictureEl.insertAdjacentHTML("beforeend", markup)
            });
        })
    })
    .catch(() =>  {
        errorEl.removeAttribute("hidden")
        Notify.failure('Oops, there is no country with that name');
    })
    .finally(() => 
    loaderEl.setAttribute("hidden", true)
    )
}