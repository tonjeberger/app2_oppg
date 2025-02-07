// import { fetchData } from "./fetches.mjs";

const deckContainer = document.getElementById('deckContainer');
const drawCard = document.getElementById('drawCardBtn');
const shuffleDeck = document.getElementById('shuffleDeckBtn');



let url = "http://localhost:8000/temp/deck";


loadDeck();

async function loadDeck() {
    
    try {

        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        let theDiv = document.createElement('div');
            theDiv.innerHTML = `
                <h2>Your deck id: ${data.deck_id}</h2>
                
                `;
        deckContainer.appendChild(theDiv);
        return data;

    } catch (error) {
        console.log('Error:', error);
    };
}

async function loadCard(deck_id){

    try {
        const drawCardUrl = url + '/' + deck_id + '/card';
        let response = await fetch(drawCardUrl);
        let data = await response.json();
        console.log(data);

        for(let card of data.deck){
            let theDiv = document.createElement('div');
                theDiv.innerHTML = `
                    <h2>${card.suit} ${card.value}</h2>
                    
                `;
            deckContainer.appendChild(theDiv);
        }

        return data;
        
    } catch (error) {
        console.log('Error:', error);
    }

};





drawCard.addEventListener('click', function(evt){
 loadCard(evt.deck_id);
});