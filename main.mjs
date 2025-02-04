// import { fetchData } from "./fetches.mjs";

const drawCard = document.getElementById('draw-card');
const deckContainer = document.getElementById('deck-container');


let url = "http://localhost:8000/temp/deck";




loadData();

async function loadData() {
    

    
    try {
        let config = {
            method: 'GET',
            // headers: {
            //     'Access-Control-Allow-Origin': 'http://localhost:8000/temp/deck',
            //     'Vary': 'http://localhost:8000/temp/deck',
            // }    
        }

        let response = await fetch('./script.mjs', config);
        let data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.log('Error:', error);
    }
    // const deck_id = deck.deck_id;
    // console.log(deck_id);
    // const shuffledDeck = await fetch('http://localhost:8000/temp/deck/shuffle/' + deck_id);
    // console.log(shuffledDeck);
    // const card = await fetch('http://localhost:8000/temp/deck/' + deck_id + '/card');
    // console.log(card);
    // //console.log(deck);
    // console.log(shuffledDeck);
    // console.log(card);
};



drawCard.addEventListener('click', async () => {
    //const deck_id = 4;
    const url = 'http://localhost:8000/temp/deck/'; // + deck_id + '/card';
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