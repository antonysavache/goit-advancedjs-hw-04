import axios from 'axios';

const API_KEY = '24514938-64e9aafcd379537f737cf2780';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
}
