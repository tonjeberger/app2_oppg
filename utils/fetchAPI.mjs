

const url = "http://localhost:8000/"


async function getNote(id){
    const response = await fetch(url + "notes/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const note = await response.json();
    return note;
}

async function newNote(noteForm){};

async function editNote(id){}

async function deleteNote(id){};