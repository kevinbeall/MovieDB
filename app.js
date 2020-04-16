

//const url = `https://api.themoviedb.org/3/search/movie?api_key=b96c6c8bbe0db73e82c8408cc65ed0f7&language=en-US&query=fight%20club&page1&include_adult=false`;

async function fetchMovieInfo(url) {
  await fetch(url).then(async res => {
    const data = await res.json();
    handleData(data);
  })
}

function handleData(data) {
  document.querySelector('.image').src = `https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`
  console.log(data.results);
  document.querySelector('.overview').innerHTML = data.results[0].overview;
}
//handleData();

const handleSearchCss = () => {
  document.querySelector('.searchBar').classList.add('searched');
  document.querySelector('.search').value = '';
}

document.querySelector('.submit').addEventListener('click', (e) => {
  const search = document.querySelector('.search').value;
  handleSearchCss();
  let url = `https://api.themoviedb.org/3/search/movie?api_key=b96c6c8bbe0db73e82c8408cc65ed0f7&language=en-US&query=${search}&page1&include_adult=false`;
  fetchMovieInfo(url);
})
document.querySelector('.search').addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    const search = document.querySelector('.search').value;
    handleSearchCss();
    let url = `https://api.themoviedb.org/3/search/movie?api_key=b96c6c8bbe0db73e82c8408cc65ed0f7&language=en-US&query=${search}&page1&include_adult=false`;
    fetchMovieInfo(url);
  }
})
//fetchMovieInfo(url);



