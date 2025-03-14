const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH"
};

const isPROD = true // false: localhost, true: render

const BASE_API_TEST = "http://localhost:8000";
const BASE_API_PROD = "https://app2-oppg.onrender.com"; 

const BASE_API = (isPROD) ? BASE_API_PROD : BASE_API_TEST;

const API_ENDPOINTS = {
    AllNotes: `${BASE_API}/notes`,
    NewNote: `${BASE_API}/notes`,
    GetNote: (id) => `${BASE_API}/notes/${id}`,
    UpdateNote: (id) => `${BASE_API}/notes/${id}`,
    DeleteNote: (id) => `${BASE_API}/notes/${id}`
}


export async function newNote(formData){
    try {
        let title = formData.get("title");
        let content = formData.get("content");
        const note = await runRequest(API_ENDPOINTS.NewNote, HTTP_METHODS.POST, {title, content});
        return note;
        
    } catch (error) {
        console.error("Error creating note", error);
    }
}
export async function getAllNotes(){
    try {
        const notes = await runRequest(API_ENDPOINTS.AllNotes);
        return notes;
        
    } catch (error) {
        console.error("Error getting all notes", error);
    
    }
}
export async function getNote(id){
    try {
        const note = await runRequest(API_ENDPOINTS.GetNote(id));
        return note;
        
    } catch (error) {
        console.error("Error getting note", error);
        
    }
}
export async function updateNote(id, formData){
    try {
        let title = formData.get("edit-title");
        let content = formData.get("edit-content");
        const note = await runRequest(API_ENDPOINTS.UpdateNote(id), HTTP_METHODS.PUT, {title, content});
        return note;
        
    } catch (error) {
        console.error("Error updating note", error);
        
    }
}

export async function deleteNote(id){
    try {
        const response = await runRequest(API_ENDPOINTS.DeleteNote(id), HTTP_METHODS.DELETE);
        return response;
    } catch (error) {
        console.error("Error deleting note", error);
        throw error;
    }
}

async function runRequest(path, method = HTTP_METHODS.GET, data = null){
    const request = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    }

    if ([HTTP_METHODS.POST, HTTP_METHODS.PATCH, HTTP_METHODS.PUT].includes(method)) {
        request.body = JSON.stringify(data);
    }

    let response = await fetch(path, request);
    
    return await response.json();
}

console.log(`API running ${isPROD ? "PROD" : "test"}`);