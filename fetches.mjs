async function fetchDeck(deck_id){
    console.log(deck_id);
    try {
        const response = await fetch('http://localhost:8000/temp/deck/' + deck_id);
        if (!response.ok) {
            throw new Error('Nope');
        }
        const data = await response.json();
        console.log(data); 
        return data;
    } catch (error) {
      //console.error('Error:', error);
    }

}

fetchDeck(4).then(data => {
    if (data) {
        console.log('Deck:', data);
    }
});

export async function fetchData(url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Nope');
        }
        const data = await response.json();
        return Promise.resolve(data);

    } catch (error) {
      //console.error('Error:', error);
    }
}