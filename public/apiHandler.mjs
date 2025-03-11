const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH"
};

const isPROD = false // false: localhost, true: render

const BASE_API_TEST = "http://localhost:8000";
const BASE_API_PROD = "https://app2-oppg.onrender.com"; 

const BASE_API = (isPROD) ? BASE_API_PROD : BASE_API_TEST; // her kan vi bytte mellom apiene våre ved å endre isPROD til true eller false

const API_ENDPOINTS = {
    NewNote: `${BASE_API}/notes`,
    GetNote: (id) => `${BASE_API}/notes/${id}`,
    UpdateNote: (id) => `${BASE_API}/notes/${id}`,
    DeleteNote: (id) => `${BASE_API}/notes/${id}`
}// her legger vi inn alle endpointene vi trenger, så slipper vi å skrive de inn flere steder
// de med id er funksjoner slik at de er dynamiske, og kan brukes mens kode kjører

export async function newNote(){
    const note = await runRequest(API_ENDPOINTS.NewNote(), HTTP_METHODS.POST, {title: "title", content: "content"});
    return note;
}
export async function getNote(id){
    const note = await runRequest(API_ENDPOINTS.GetNote(id));
    return note;
}
export async function updateNote(id){
    const note = await runRequest(API_ENDPOINTS.UpdateNote(id));
    return note;
}

export async function deleteNote(id){
    const note = await runRequest(API_ENDPOINTS.DeleteNote(id));
    return note;
}

async function runRequest(path, method = HTTP_METHODS.GET, data = null){
    const request = {
        method,
        headers: {
            "Content-Type": "application/json"
        }// vi må fortelle serveren at det er json vi sender
    }

    if([HTTP_METHODS.POST, HTTP_METHODS.PUT, HTTP_METHODS.PATCH].any(method)){
        request.body = JSON.stringify(data);
    }
    
    let response = await fetch(path); // dette er egentlig den eneste fetchen vi trenger
    return await response.json();
}

console.log(`API running ${isPROD ? "PROD" : "test"}`);