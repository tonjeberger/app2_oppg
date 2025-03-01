import {suits, values} from './kortdata.mjs';

export const allDecks = {};

export function newDeck(){
    
    const deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({suit, value});
        });
    });
    let deck_id = Math.ceil(Math.random() * 10);
    allDecks[deck_id] = deck;
    return {deck_id, deck};
}

export function shuffleDeck(deck_id){
    const deck = allDecks[deck_id];
    if(!deck){
        return {error: `Deck ${deck_id} not found`};
    }
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);
    allDecks[deck_id] = shuffledDeck;
    return shuffledDeck;
};

export function drawCard(deck_id){
    const deck = allDecks[deck_id];
    if(deck.length === 0 || !deck){
        return {error: `Deck ${deck_id} is empty or not found.`};
    }
    const randomCard = deck[Math.floor(Math.random() * deck.length)];
    deck.splice(deck.indexOf(randomCard), 1);
    allDecks[deck_id] = deck;
    return randomCard;
}
