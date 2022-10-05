

import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
import { styles } from './styles'

export const refs = {
    header: document.querySelector('.header'),
    headerDiv: document.querySelector('.header-container'),
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    btnSubmit: document.querySelector('button'),
    container: document.querySelector('.container'),
    btnLoad: document.querySelector('.load-more'),
    imagesList: document.querySelector('.gallery')
}

styles();

let searchStr = '';


function handleInput(event) {
   
    searchStr = event.target.value.trim().toLowerCase();
    console.log(searchStr);
    
};


function handleSubmit(event) {
    event.preventDefault();

    fetchPicture(searchStr);
    console.log(fetchPicture(searchStr));

    if (searchStr !== '') {
        return fetchPicture(searchStr).then(data => {
            if (data.hits.length > 0) {
                console.log('Search resultes are positive!!!!');
                console.log('Hits found: ', data.hits.length);
                const arr = data.hits;
                createImgList(arr);

                
            } else {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            }

                 
        })
        .catch((error) => Notify.failure('Sorry, there are no images matching your search query. Please try again.'));
    } 

    refs.input.value = '';
    
};

function createImgList(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                    return `<div class="photo-card">
                              <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                              <div class="info">
                                <p class="info-item">
                                  <b>Likes</b>
                                  <span>${likes}</span>
                                </p>
                                <p class="info-item">
                                  <b>Views</b>
                                  <span>${views}</span>
                                </p>
                                <p class="info-item">
                                  <b>Comments</b>
                                  <span>${comments}</span>
                                </p>
                                <p class="info-item">
                                  <b>Downloads</b>
                                  <span>${downloads}</span>
                                </p>
                              </div>
                            </div>`;
                    
                })
                    .join('');
                imagesList.insertAdjacentHTML('beforeend', markup);
            }


// webformatURL, largeImageURL, tags, likes, views, comments, downloads



const fetchPicture = searchStr => {
    
    return fetch(`https://pixabay.com/api/?key=30367139-d29baca05590c92d76f2ea65a&q=${searchStr}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }
        );
};



refs.form.addEventListener('input', handleInput);
refs.form.addEventListener('submit', handleSubmit);



// if (data.length === null) {
//                 Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//             } else {
//                 if (data.length > 0) {
//                     createPicList(data);
//                 } else {
//                     if (data.length > 40) {
//                         refs.btnLoad.classList.add("is-hidden");
//                     }
//                 }
//             }


// export const fetchCountries = name => {
//     return fetch(
//       `https://restcountries.com/v3.1/name/${name}?fields=,name,capital,population,flags,languages`
//     )
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//         }
//         );
// };



// .then(response => {
//         if (!response.ok) {
//           if (response.status === 404) {
//             return [];
//           }
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//   };