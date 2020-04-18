//const url = `https://api.themoviedb.org/3/search/movie?api_key=b96c6c8bbe0db73e82c8408cc65ed0f7&language=en-US&query=fight%20club&page1&include_adult=false`;
let first = 0;
let second = 1;
let last;
let arrLength;
let usable;
// fetches json for specific search url
async function fetchMovieInfo(url) {
  await fetch(url).then(async res => {
    const data = await res.json();
    first = 0;
    second = 1;
    last = 0;
    handleData(data);
  })
}

function handleData(data) {
  usable = data.results.filter(res => res.poster_path !== null);
  last = usable.length - 1;
  arrLength = usable.length - 1;
  document.querySelector('.firstImage').src = `https://image.tmdb.org/t/p/original/${usable[first].poster_path}`;
  document.querySelector('.secondImage').src = `https://image.tmdb.org/t/p/original/${usable[second].poster_path}`;
  document.querySelector('.lastImage').src = `https://image.tmdb.org/t/p/original/${usable[last].poster_path}`;
  document.querySelector('.date').innerHTML = usable[first].release_date;
  document.querySelector('.movieTitle').innerHTML = usable[first].title;
  document.querySelector('.movieOverview').textContent = usable[first].overview;
}

function update() {
  document.querySelector('.firstImage').src = `https://image.tmdb.org/t/p/original/${usable[first].poster_path}`;
  document.querySelector('.secondImage').src = `https://image.tmdb.org/t/p/original/${usable[second].poster_path}`;
  document.querySelector('.lastImage').src = `https://image.tmdb.org/t/p/original/${usable[last].poster_path}`;
  document.querySelector('.date').innerHTML = usable[first].release_date;
  document.querySelector('.movieTitle').innerHTML = usable[first].title;
  document.querySelector('.movieOverview').textContent = usable[first].overview;
}

const handleSearchCss = () => {
  document.querySelector('.searchBar').classList.add('searched');
  document.querySelector('.search').value = '';
  document.querySelector('.movieImages').classList.remove('hidden');
}

// Event Listeners

//submit button selected
document.querySelector('.submit').addEventListener('click', (e) => {
  //get value of search field to be added to the URL
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

document.querySelector('.secondImage').addEventListener('click', () => {
  if (first === arrLength) {
    first = 0;
  } else {
    first++;
  }
  if (second === arrLength) {
    second = 0;
  } else {
    second++;
  }
  if (last === arrLength) {
    last = 0;
  } else {
    last++;
  }
  update();
  console.log(last, first, second);
})

document.querySelector('.lastImage').addEventListener('click', () => {
  if (first === 0) {
    first = arrLength;
  } else {
    first--;
  }
  if (second === 0) {
    second = arrLength;
  } else {
    second--;
  }
  if (last === 0) {
    last = arrLength;
  } else {
    last--;
  }
  update();
  console.log(last, first, second);
})






