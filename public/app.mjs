if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js"); // Register the service worker, js-filen. dette er ikke en modul, så den har vi bare kalr .js
} // kan sees på som ett event som lytter etter en serviceWorker, og når den finner en så registrerer den den
// import sessionFileStore from "session-file-store";
//navigator -> browser
//serviceWorker -> en unik bckground worker som kan kjøre i bakgrunnen, kan bare kjøre en SW

import * as api from "../routes/noteAPI.mjs";
// import {notes} from "../data/notes.mjs";

const notes =[
    {
        id: 1,
        title: 'Note 1',
        date: "02-03-2025",
        content: 'Content of note 1'
    },
    {
        id: 2,
        title: 'Note 2',
        date: "02-03-2025",
        content: 'Content of note 2'
    }
];

const noteContainer = document.getElementById("note-container");
const newNoteBtn = document.getElementById("new-note-btn");
const noteForm = document.createElement("form");

const form = `
    <form id="note-form" display="block">
        <input type="text" name="title" placeholder="Title"><br>
        <textarea name="content" rows="15" cols="70" placeholder="Your note"></textarea><br>
        <input id="add-note" type="submit" value="Add note"></input>
    </form>`;

    
newNoteBtn.addEventListener("click", async () => {
    console.log("New note button clicked");
    noteContainer.innerHTML = form;
    noteContainer.appendChild(noteForm);
    let note = await api.createNote(formData);
    noteContainer.appendChild(note);

});

noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(notes);
    console.log("Note created" + note);

});

