const sessionCountContainer = document.getElementById("sessionCountContainer");
// const counterContainer = document.getElementById('counterContainer');
// const counterBtn = document.getElementById('counterBtn');

let url = "http://localhost:8000";


// let count = 0;
// let btnClicked = false;

// let theDiv = document.createElement('div');
// counterContainer.appendChild(theDiv);
// counter();


// function counter() {
    
//     theDiv.innerHTML = `
//         <h2>you clicked the buttons ${count} times</h2>
//         <hr>
//     `;
//     btnClicked = true;
//     count++;
//     console.log(count);
// }

// counterBtn.addEventListener('click', () => {
//     counter();
//     saveClicks();
// });

// function saveClicks() {
//     localStorage.setItem('clicks', count);
// }





//loadSessionCount();

// async function loadSessionCount() {

//     try {

//         let config = {
//             method: 'GET',
//             headers: {
//              authorization: token
//             }
//         };
        
//         let response = await fetch(url, config);
//         let data = await response.json();
//         console.log(data);

//     } catch (error) {
//         console.log('Error:', error);
        
//     }
// }
