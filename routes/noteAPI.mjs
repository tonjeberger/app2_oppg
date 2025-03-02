// her skal alle fetches være, og importeres this hoved js filen

const url = "http://localhost:8000/"


export async function listNotes(){

    const response = await fetch(url + "note", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const notes = await response.json();
    return notes;
}