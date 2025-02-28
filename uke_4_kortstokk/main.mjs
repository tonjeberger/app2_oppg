// // import { fetchData } from "./fetches.mjs";
// // import {deckContainer, drawCardBtn, shuffleDeckBtn} from '../public/index.html';
import {newDeck, shuffleDeck, drawCard} from './kortFunksjoner.mjs';


document.addEventListener('DOMContentLoaded', () => {
    const drawCardBtn = document.getElementById('drawCardBtn');
    const deckContainer = document.getElementById('deckContainer');
    const shuffleDeckBtn = document.getElementById('shuffleDeckBtn');

    let cardDiv = document.createElement('div');
    deckContainer.appendChild(cardDiv);

    let currentDeckId = null;

    let url = "http://localhost:8000/temp/deck";




    async function loadDeck() {
        console.log('Loading deck');
        let response = await fetch(url, {method: "GET"});

        if (response.ok) {
            let data = await response.json();
            console.log("Deck exists: " + data.deck_id);
            currentDeckId = data.deck_id;
            showDeckInfo(currentDeckId);
            return;
        }
        
        console.log('Deck does not exist, creating new deck');
        
        response = await fetch(url, {method: "POST"});
        if (response.ok) {
            let data = await response.json();
            currentDeckId = data.deck_id;
            showDeckInfo(currentDeckId);
        }
        console.log('Deck created:', currentDeckId);

    }; 

    function showDeckInfo(deck_id){
        let theDiv = document.createElement('div');
        theDiv.innerHTML = `
            <h2>Your deck id: ${deck_id}</h2>
        `;
        deckContainer.appendChild(theDiv)
    }
        
        
    async function loadCard(deck_id){

        cardDiv.innerHTML = "";
        const drawCardUrl = url + "/" + deck_id + "/card";

        try {
            let response = await fetch(drawCardUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            console.log(data);
            cardDiv.innerHTML = `
                <h2>${data.value} of ${data.suit}<br>
                <img src="./playingCards/${data.value}_of_${data.suit}.png" width="100px" height="150px">
                </h2>
            `;

            return data;
            
        } catch (error) {
            console.log('Error:', error);
        }
    };

    async function shuffleDeck(deck_id){
        const shuffleDeckUrl= url + "/shuffle/" + deck_id;
    }

    loadDeck();

    drawCardBtn.addEventListener('click', function(evt){
        evt.preventDefault();
        console.log('Drawing card, preventDefault');
        if (currentDeckId) {
            loadCard(currentDeckId)
        };
    });

    shuffleDeckBtn.addEventListener("click", function(evt){
        evt.preventDefault();
        console.log('Shuffling deck, preventDefault');
        if (currentDeckId) {
            shuffleDeck(currentDeckId);
        }

    });

});
