if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js"); 
}

// import * as api from "../routes/noteAPI.mjs";
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
});

noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Note created");

});

