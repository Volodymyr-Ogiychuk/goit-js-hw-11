
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPic } from './fetchPic'

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    btnSubmit: document.querySelector('button'),
    btnLoad: document.querySelector('.load-more'),
    imagesList: document.querySelector('.gallery')
}

let searchStr = '';
let pageNumber = 1;
let totalPages = 0;
let totalImg = 0;

refs.btnLoad.style.display = 'none';


function handleInput(event) {
    
    searchStr = event.target.value.trim().toLowerCase();
    console.log(searchStr);
    
};


function handleSubmit(event) {
    event.preventDefault();

    if (searchStr !== '') {
        refs.imagesList.innerHTML = '';
        pageNumber = 1;
        totalImg = 0;
        fetch()
    } 

    refs.input.value = '';
    
};

function fetch() {
    return fetchPic(searchStr, pageNumber).then(data => {
            
        totalPages = Math.ceil(data.total / 40);
            
        if (data.total > 0) {
            if (pageNumber === 1) {
                Notify.success(`Hooray! We found ${data.totalHits} images.`);
                }
                
                const arr = data.hits;
                createImgList(arr);

                if (pageNumber < totalPages) {
                    refs.btnLoad.style.display = 'block';
                    pageNumber += 1;
                    
                } 

            } else if (data.total === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            }
                 
        })
}

function createImgList(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                  <a href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width=240px height=150px/>
                  
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b>
                      <span class="img-value">${likes}</span>
                    </p>
                    <p class="info-item">
                      <b>Views</b>
                      <span class="img-value">${views}</span>
                    </p>
                    <p class="info-item">
                      <b>Comments</b>
                      <span class="img-value">${comments}</span>
                    </p>
                    <p class="info-item">
                      <b>Downloads</b>
                      <span class="img-value">${downloads}</span>
                    </p>
                  </div>
                </div>`;
                    
            })
        .join('');
    
    refs.imagesList.insertAdjacentHTML('beforeend', markup);
    
    new SimpleLightbox('.photo-card a ', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
            
function handleLoad() {
    
    fetch();
    console.log('pageNumber', pageNumber);
    if (pageNumber === totalPages || pageNumber > 13) {
        refs.btnLoad.style.display = 'none';
        Notify.warning('We are sorry, but you have reached the end of search results.')
     }
    
}

refs.form.addEventListener('input', handleInput);
refs.form.addEventListener('submit', handleSubmit);
refs.btnLoad.addEventListener('click', handleLoad);