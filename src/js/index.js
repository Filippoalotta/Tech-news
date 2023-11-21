import '../css/style.css';

const cardContainer = document.querySelector('.card-container');
cardContainer.classList.add('d-flex')

const moreBtn = document.createElement('a');
moreBtn.innerHTML = 'Load more...';
moreBtn.setAttribute('id', 'load-more');
moreBtn.classList.add('btn', 'btn-primary', 'mx-auto', 'p-3');
cardContainer.insertAdjacentElement('afterend', moreBtn);

let url = 'https://hacker-news.firebaseio.com/v0/newstories.json'
let classeFetch;
fetch(url)
      .then(response => response.json())
      .then(json => {
        classeFetch = json;
        let tenId = classeFetch.slice(0, 10);
        const storyUrl = 'https://hacker-news.firebaseio.com/v0/item/';
        tenId.forEach(id => {

            fetch(`${storyUrl}${id}.json`)
                .then(response => response.json())
                .then(json => {

                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card', 'm-4', 'p-3', 'd-flex', 'justify-content-center', 'align-items-center');
                    cardDiv.style = 'width: 20rem;'
                    cardContainer.appendChild(cardDiv);

                    const cardTitle = document.createElement('h5');
                    cardTitle.innerHTML = json.title;
                    cardTitle.classList.add('card-title');
                    cardDiv.appendChild(cardTitle);

                    const cardLink = document.createElement('a');
                    cardLink.innerHTML = 'Read more...';
                    cardLink.setAttribute('href', json.url);
                    cardLink.setAttribute('target', '_blank');
                    cardLink.classList.add('btn', 'btn-primary', 'm-3');
                    cardDiv.appendChild(cardLink);

                    const dataPubblicazione = new Date(json.time * 1000);
                    const dataFormattata = `${dataPubblicazione.getDate()}/${dataPubblicazione.getMonth() + 1}/${dataPubblicazione.getFullYear()}`;
                    const cardDate = document.createElement('div');
                    cardDate.innerHTML = dataFormattata;
                    cardDate.classList.add('m-t-auto');
                    cardDiv.appendChild(cardDate);

                })
                .catch(error => {
                    console.error('Si è verificato un errore:', error);
                });

        })
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
    });

moreBtn.addEventListener('click', ()=>{
    caricaUlterioriNotizie(numeroDaCaricare);
});
let numNotizieVisualizzate = 10;
let numeroDaCaricare = 10

function caricaUlterioriNotizie(numeroDaCaricare) {
    const storyUrl = 'https://hacker-news.firebaseio.com/v0/item/';
    
    // Ottieni gli ID delle notizie da caricare
    const notizieDaCaricare = classeFetch.slice(numNotizieVisualizzate, numNotizieVisualizzate + numeroDaCaricare);
    
    notizieDaCaricare.forEach(id => {
        fetch(`${storyUrl}${id}.json`)
        .then(response => response.json())
        .then(json => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'm-4', 'p-3', 'd-flex', 'justify-content-center', 'align-items-center');
            cardDiv.style = 'width: 20rem;'
            cardContainer.appendChild(cardDiv);

            const cardTitle = document.createElement('h5');
            cardTitle.innerHTML = json.title;
            cardTitle.classList.add('card-title');
            cardDiv.appendChild(cardTitle);

            const cardLink = document.createElement('a');
            cardLink.innerHTML = 'Read more...';
            cardLink.setAttribute('href', json.url);
            cardLink.setAttribute('target', '_blank');
            cardLink.classList.add('btn', 'btn-primary', 'm-3');
            cardDiv.appendChild(cardLink);

            const dataPubblicazione = new Date(json.time * 1000);
            const dataFormattata = `${dataPubblicazione.getDate()}/${dataPubblicazione.getMonth() + 1}/${dataPubblicazione.getFullYear()}`;
            const cardDate = document.createElement('div');
            cardDate.innerHTML = dataFormattata;
            cardDate.classList.add('m-t-auto');
            cardDiv.appendChild(cardDate);
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });
    });
    
    numNotizieVisualizzate += numeroDaCaricare;
}
