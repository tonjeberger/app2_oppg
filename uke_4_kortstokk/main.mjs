// import {newDeck, shuffleDeck, drawCard} from './kortFunksjoner.mjs';


document.addEventListener('DOMContentLoaded', () => {
    const drawCardBtn = document.getElementById('drawCardBtn');
    const deckContainer = document.getElementById('deckContainer');
    const shuffleDeckBtn = document.getElementById('shuffleDeckBtn');
    const newDeckBtn = document.getElementById('newDeckBtn');

    let cardDiv = document.createElement('div');
    deckContainer.appendChild(cardDiv);
    
    let deckDiv = document.createElement('div');
    deckContainer.appendChild(deckDiv);

    let currentDeckId = null;
    let currentDeck = [];

    let url = "http://localhost:8000/temp/deck";





    loadDeck();

//_________________Load deck_______________________
    async function loadDeck() {
        let response = await fetch(url, {method: "GET"});

        if (response.ok) {
            let data = await response.json();
            currentDeckId = data.deck_id; 

            return;
        }
        
        response = await fetch(url, {method: "POST"});
        if (response.ok) {
            let data = await response.json();
            currentDeckId = data.deck_id;
            deckDiv.innerHTML = "";
            if (currentDeckId) {
                let deck = await loadShuffledDeck(currentDeckId);
                currentDeck = deck;

                updateShownDeck(); 
    
            }
        }
    }; 

//_________________Load shuffled deck_______________________
    async function loadShuffledDeck(deck_id){
        const shuffleDeckUrl= url + "/shuffle/" + deck_id;
        let response = await fetch(shuffleDeckUrl, {method: "PATCH"});
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            return data;
    }
        
        
//_________________Load card_______________________
    async function loadCard(deck_id){

        cardDiv.innerHTML = "";
        const drawCardUrl = url + "/" + deck_id + "/card";

        try {
            let response = await fetch(drawCardUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            cardDiv.innerHTML = `
            <h2>${data.value} of ${data.suit}<br>
            <img src="./playingCards/${data.value}_of_${data.suit}.png" width="100px" height="150px">
            </h2>
            `;

        currentDeck = currentDeck.filter(card => !(card.value === data.value && card.suit === data.suit));            

        updateShownDeck();
            
            return data;
            
        } catch (error) {
            console.log('Error:', error);
        }
    };
    
//_________________Update shown deck_______________________
    function updateShownDeck() {
        deckDiv.innerHTML = "";
        deckDiv.innerHTML = `<h3>Cards remaining: ${currentDeck.length}</h3><br>`;
        for (let i = 0; i < currentDeck.length; i++) {
            deckDiv.innerHTML += `
            <p>${currentDeck[i].value} of ${currentDeck[i].suit}</p>
            `;
        }
        deckContainer.appendChild(deckDiv);
    }



//_________________Event listeners_______________________


    newDeckBtn.addEventListener('click', function(evt){
        evt.preventDefault();
        if(currentDeckId){
            currentDeckId = null;
            currentDeck = [];
            deckDiv.innerHTML = "";
            cardDiv.innerHTML = "";
        loadDeck();
        }

    });


    drawCardBtn.addEventListener('click', function(evt){
        evt.preventDefault();
        if (currentDeckId) {
            loadCard(currentDeckId);

        };
    });
    
    shuffleDeckBtn.addEventListener("click", async function(evt){
        evt.preventDefault();
        if (currentDeckId) {
            let deck = await loadShuffledDeck(currentDeckId);
            currentDeck = deck;
            updateShownDeck();
    
        };
    });


});
