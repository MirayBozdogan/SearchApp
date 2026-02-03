const formWrapper = document.querySelector('.form-wrapper');
const form = document.querySelector('#form');
const input = document.querySelector('#SearchInput');
const buttonWrapper = document.querySelector('.button-wrapper');
const searchButton = document.querySelector('#SearchButton');
const clearButton = document.querySelector('#ClearButton');
const imageListWrapper = document.querySelector('.imagelist-wrapper');

runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}
function clear() {
    input.value = '';
    Array.from(imageListWrapper.children).forEach(child => child.remove());
}
function search(e) {
    const value = input.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: 'GET',
        headers: {
            Authorization: 'Client-ID N_ggoTyG4NZuYv1-CMi6bjPBBRorJgOAn4UAETVzE_I'
        }
    })
        .then(res => res.json())
        .then(data => {
            Array.from(data.results).forEach(image => {
                console.log(image.urls.small);
                addImageToUI(image.urls.small);
            });
        })
        .catch(error => console.error('Error:', error));

    e.preventDefault();
}

function addImageToUI(url) {
    /* 
    <div class="card">
        <img src="image_url_here" alt="Image">
    </div>
    */
    const div = document.createElement('div');
    div.className = 'card';

    const img = document.createElement('img');
    img.src = url;
    div.appendChild(img);
    imageListWrapper.appendChild(div);
}
