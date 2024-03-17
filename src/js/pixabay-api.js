import axios from 'axios';

export default async function request(word, numberPage) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42677735-fe61580d2fc9bff74664cab68',
      q: word,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: numberPage,
    },
  });
  return response;
}
