// import { fetchData } from "./fetches.mjs";

const deckContainer = document.getElementById('deckContainer');
const drawCard = document.getElementById('drawCardBtn');
const shuffleDeck = document.getElementById('shuffleDeckBtn');



let url = "http://localhost:8000/temp/deck";








drawCard.addEventListener('click', async () => { 
    //const deck_id = 4;
    url = url + data.deck.deck_id + '/card'; // får ikke hentet ut data enda

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Nope');
        }
        const data = await response.json();
        console.log(data.deck);
        return Promise.resolve(data.deck);

    } catch (error) {
      //console.error('Error:', error);
    }
    
});