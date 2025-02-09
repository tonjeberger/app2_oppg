import {suits, values} from './kortdata.mjs';

export const allDecks = {};

export function newDeck(){
    
    const deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({suit, value});
        });
    });
    let deck_id = Math.floor(Math.random() * 10)// toString(Math.floor(Math.random() * 10));
    allDecks[deck_id] = deck;
    return {deck_id, deck};
}

export function shuffleDeck(deck_id){
    const deck = allDecks[deck_id];
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);
    allDecks[deck_id] = shuffledDeck;
    return shuffledDeck;
};

export function drawCard(deck_id){
    const deck = allDecks[deck_id];
    const randomCard = deck[Math.floor(Math.random() * deck.length)];
    return randomCard;
}