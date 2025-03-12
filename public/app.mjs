if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js"); 
}

import { getAllNotes, newNote, getNote, updateNote, deleteNote } from "./apiHandler.mjs";
import showNoteView from "./controller/noteView.mjs";

const noteForm = document.getElementById("note-form")
const noteContainer = document.getElementById("note-container");
// noteContainer.innerHTML = "";


// document.body.append(showNoteView(4));
loadNotes();
async function loadNotes() {
    const notes = await getAllNotes();
    // listNotesController.view(notes);
    // for(let note of notes){
    //     noteContainer.innerHTML += `<div><h2>Title: ${note.title}</h2> <button id="open-note">open note</button></div>`;
    // }
    console.log(notes);
    // noteContainer.innerHTML += `<div><h2>Title: ${notes.title}</h2> <button id="open-note">open note</button></div>`; // denne skal flyttes til et view
}


// sende inn skjema for ny note
noteForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formData = new FormData(noteForm);
    const note = await newNote(formData);
    // noteContainer.innerHTML += `<div><h2>Title: ${note.title}</h2> <button id="open-note">open note</button></div>`; // denne skal flyttes til et view
    console.log(note);
    console.log("Note created");
});

// når jeg skal hente ut notes må de legges i egne divs med en 
// egen knapp for å åpne hver note. Siden jeg ikke skal ha html i en js-fil må jeg lage en template
// for hver note, og bruke dem når en ny note skal legges til.