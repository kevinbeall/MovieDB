// get DOM elements
const searchBar = document.querySelector('.searchBar');
const searchField = document.querySelector('.search');
const movieImageWrapper = document.querySelector('.movieImages');
const firstImage = document.querySelector('.firstImage');
const secondImage = document.querySelector('.secondImage');
const lastImage = document.querySelector('.lastImage');
const releaseDate = document.querySelector('.date');
const movieTitle = document.querySelector('.movieTitle');
const movieOverview = document.querySelector('.movieOverview');

//counter variables for image looping
let first;
let second;
let last;
let arrLength;

// storage for filtered array
let usable;

// fetches json for specific search url
async function fetchMovieInfo(url) {
  await fetch(url).then(async res => {
    const data = await res.json();
    //filter array for movie objects which include a poster
    usable = data.results.filter(res => res.poster_path !== null);
    // reset counters when new search initiated
    first = 0;
    second = 1;
    last = usable.length - 1;
    arrLength = usable.length - 1;
    update();
  })
}

function update() {
  firstImage.src = `https://image.tmdb.org/t/p/original/${usable[first].poster_path}`;
  secondImage.src = `https://image.tmdb.org/t/p/original/${usable[second].poster_path}`;
  lastImage.src = `https://image.tmdb.org/t/p/original/${usable[last].poster_path}`;
  releaseDate.innerHTML = usable[first].release_date;
  movieTitle.innerHTML = usable[first].title;
  movieOverview.textContent = usable[first].overview;
}

const handleSearchCss = () => {
  searchBar.classList.add('searched');
  searchField.value = '';
  movieImageWrapper.classList.remove('hidden');
}

// Event Listeners

//submit button used to search
document.querySelector('.submit').addEventListener('click', (e) => {
  //get value of search field to be added to the URL
  const search = document.querySelector('.search').value;
  handleSearchCss();
  let url = `https://api.themoviedb.org/3/search/movie?api_key=b96c6c8bbe0db73e82c8408cc65ed0f7&language=en-US&query=${search}&page1&include_adult=false`;
  fetchMovieInfo(url);
})
//enter used to search
document.querySelector('.search').addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    const search = document.querySelector('.search').value;
    handleSearchCss();
    let url = `https://api.themoviedb.org/3/search/movie?api_key=b96c6c8bbe0db73e82c8408cc65ed0f7&language=en-US&query=${search}&page1&include_adult=false`;
    fetchMovieInfo(url);
  }
})

document.querySelector('.secondImage').addEventListener('click', () => {
  //update object index within usable array
  first === arrLength ? first = 0 : first++;
  second === arrLength ? second = 0 : second++;
  last === arrLength ? last = 0 : last++;
  update();
})

document.querySelector('.lastImage').addEventListener('click', () => {
  //update object index within usable array
  first === 0 ? first = arrLength : first--;
  second === 0 ? second = arrLength : second--;
  last === 0 ? last = arrLength : last--;
  update();
})






