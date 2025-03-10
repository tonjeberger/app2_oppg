const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH"
};

const isPROD = false // denne står som false under utviklingsfasen, så kan den endres til true under testing/publisering I guess?


const BASE_API_TEST1 = "Test1/";
const BASE_API_TEST2 = "Test2/";
const BASE_API_PROD = ""; 

const BASE_API = (isPROD) ? BASE_API_PROD : BASE_API_TEST1;
// her kan vi bytte mellom apiene våre ved å endre isPROD til true eller false

const API_ENDPOINTS = {
    GetTree: `${BASE_API}/tree`,
    DeleteNode: (id) => `/tree/${id}`,
}// her legger vi inn alle endpointene vi trenger, så slipper vi å skrive de inn flere steder

async function retrieveUsersTechTree(userID){
    const tree = await runRequest(API_ENDPOINTS.GetTree)
}

async function deleteTechTreeNode(userID){
    const tree = await runRequest(API_ENDPOINTS.DeleteNode(nodeID));
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