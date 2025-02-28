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

    console.log("all decks: " + allDecks);
    console.log( "deck id= " + deck_id); 

    return {deck_id, deck};
}

export function shuffleDeck(deck_id){
    const deck = allDecks[deck_id];
    if(!deck){
        console.log(`Deck ${deck_id} not found`);
        return {error: `Deck ${deck_id} not found`};
    }
    console.log(deck);
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);
    allDecks[deck_id] = shuffledDeck;
    return shuffledDeck;
};

export function drawCard(deck_id){
    const deck = allDecks[deck_id];
    console.log(deck);

    if(deck.length === 0 || !deck){
        console.log(`Deck ${deck_id} is empty or not found.`);
        return {error: `Deck ${deck_id} is empty or not found.`};
    }
    const randomCard = deck[Math.floor(Math.random() * deck.length)];
    deck.splice(randomCard, 1)[0];
    allDecks[deck_id] = deck;
    return randomCard;
}
