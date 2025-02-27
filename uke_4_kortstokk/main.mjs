// // import { fetchData } from "./fetches.mjs";
// // import {deckContainer, drawCardBtn, shuffleDeckBtn} from '../public/index.html';
import {newDeck, shuffleDeck, drawCard} from './kortFunksjoner.mjs';



const drawCardBtn = document.getElementById('drawCardBtn');
const deckContainer = document.getElementById('deckContainer');
const shuffleDeckBtn = document.getElementById('shuffleDeckBtn');
// const deckContainer = document.getElementById('deckContainer');
// const drawCardBtn = document.getElementById('drawCardBtn');
// const shuffleDeckBtn = document.getElementById('shuffleDeckBtn');
// let currentDeckId = null;
let currentDeckId = sessionStorage.getItem('currentDeckId');
let url = "http://localhost:8000/temp/deck";

async function loadDeck() {
        console.log('Loading deck');
        if(currentDeckId === null){
            try {
                
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                console.log(data);
                
                currentDeckId = data.deck_id;
                sessionStorage.setItem('currentDeckId', currentDeckId);
                console.log('Deck id:', currentDeckId);
                
                let theDiv = document.createElement('div');
                theDiv.innerHTML = `
                <h2>Your deck id: ${data.deck_id}</h2>
                `;
                deckContainer.appendChild(theDiv);
                return data;
                
            } catch (error) {
                console.log('Error:', error);
            }; 
        }else {
            console.log('Deck already loaded:', currentDeckId);
            let theDiv = document.createElement('div');
            theDiv.innerHTML = `
            <h2>Your deck id: ${currentDeckId}</h2>
            `;
            deckContainer.appendChild(theDiv)
        }
    } 
    
    async function loadCard(deck_id){

        const drawCardUrl = url + "/" + deck_id + "/card";
        try {
            let response = await fetch(drawCardUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            console.log(data);

            // // for(let card of data.deck){
            //     let theDiv = document.createElement('div');
            //     theDiv.innerHTML = `
            //         <h2>${data.suit} ${data.value}</h2>
            //     `;
            //     deckContainer.appendChild(theDiv);
            //     console.log('Card:', data.suit, data.value);
            // // }

            return data;
            
        } catch (error) {
            console.log('Error:', error);
        }

    };
    loadDeck();
    // loadCard(currentDeckId);

    drawCardBtn.addEventListener('click', function(evt){
        evt.preventDefault();
        console.log('Drawing card, preventDefault');
        if (currentDeckId) {
            loadCard(currentDeckId).then(() => {
                console.log('Drawing card');
            }).catch(error => {
                console.log('Error drawing card:', error);
            });
        } else {
            console.log('No deck loaded');
        }
    });

