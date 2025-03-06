if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js"); 
}

import * as fetches from "../utils/fetches.mjs";
// import {notes} from "../data/notes.mjs";

const notes =[
    {
        id: 1,
        title: 'Note 1',
        date: "02-03-2025",
        note: 'Content of note 1'
    },
    {
        id: 2,
        title: 'Note 2',
        date: "02-03-2025",
        note: 'Content of note 2'
    }
];

const noteContainer = document.getElementById("note-container");
const newNoteBtn = document.getElementById("new-note-btn");
const noteForm = document.createElement("form");

const form = `
        <form id="note-form" method="post" display="none">
            <label for="title">Title:</label><br>
            <input type="text" name="title" required><br>
            <label for="note">Content:</label><br>
            <textarea name="note" rows="15" cols="70"></textarea><br>
            <input id="add-note" type="submit" value="Add note"></input>
        </form>
    `;

    
newNoteBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    noteContainer.innerHTML = "";
    noteForm.innerHTML = form;
    noteContainer.appendChild(noteForm);
        
    console.log("New note button clicked");
});

noteForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    console.log("Note created");

});

