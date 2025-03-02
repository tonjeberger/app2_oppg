// her skal alle fetches være, og importeres this hoved js filen

const url = "http://localhost:8000/"


export async function listNotes(){

    const response = await fetch(url + "notes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const notes = await response.json();
    return notes;
}

export async function getNoteById(id){

    const response = await fetch(url + "notes/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const note = await response.json();
    return note;
}

export async function createNote(){

    const response = await fetch(url + "notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const note = await response.json();
    return note;
}