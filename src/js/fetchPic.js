import axios from 'axios';

const API_KEY = '30367139-d29baca05590c92d76f2ea65a';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=`;


const options = {
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40'
  },
};

export const fetchPic = async (searchStr, pageNumber) =>
    await axios.get(`${BASE_URL}${searchStr}&page=${pageNumber}`, options)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error.message));


    
