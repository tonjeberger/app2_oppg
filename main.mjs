// import { fetchData } from "./fetches.mjs";

const deckContainer = document.getElementById('deckContainer');
const drawCard = document.getElementById('drawCardBtn');
const shuffleDeck = document.getElementById('shuffleDeckBtn');



let url = "http://localhost:8000/temp/deck";




loadData();

async function loadData() {
    
    try {

        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        //if(Array.isArray(data.deck)){
        for(let value of data.deck){
            let theDiv = document.createElement('div');
                theDiv.innerHTML = `
                    <h2>${value.suit} ${value.value}</h2>
                    <hr>
                `;
            deckContainer.appendChild(theDiv);
        }
    //}

        // deckContainer.innerHTML = data;
        return data;
        
    } catch (error) {
        console.log('Error:', error);
    }


};



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