const options = {
    headers: {
        'x-api-key': 'live_Pqtw4PN8Wr6W2k8hbCUDY8kfhY5BsSYeQV1hmOpzxGYCsD77Up3gK1ECPRx2NxHg'}
}

export const fetchBreeds = function() {
    return fetch("https://api.thecatapi.com/v1/breeds", options)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
       return response.json()
    })
}  

export const fetchCatByBreed = function(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, options)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
}