let instance = null;


let counter = () => {
    let i = 0;

    if (instance == null) {
        instance = () => {
            i++;
            return i;
        };
    }
        return instance; // nå som vi har lagt inn en sjekk på om instance er null, så vil vi alltid returnere den samme instansen av counter
        // nå blir svaret 1234 
    
};

// sjekk om du har en instans av det du vil opprette, hvis ikke opprett en ny instans
// hvis du har en instans, returner den instansen

let i = counter();
i();
i();

let j = counter();
j();
j();


// hvordan kan vi sørge for at vi alltid bare har en counter i systemet her?

// vi skal løse dette med singleton pattern




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