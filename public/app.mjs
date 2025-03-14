if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js"); 
}

import { getAllNotes, newNote } from "./apiHandler.mjs";
import showNoteView from "./controller/noteView.mjs";

const noteForm = document.getElementById("note-form")
const allNotesContainer = document.getElementById("all-notes-container");
const noteContainer = document.getElementById("note-container");
const noteFormDiv = document.getElementById("note-form-div");


loadNotes();
export async function loadNotes() {
    noteFormDiv.style.display = "block";
    try{
        const allNotes = await getAllNotes();
        allNotesContainer.innerHTML = "";
        noteContainer.innerHTML = "";
        let notes;

        if (Array.isArray(allNotes)) {
            notes = allNotes;
        } else {
            notes = [allNotes];
        }


        for(let note of notes){
            allNotesContainer.innerHTML += `<div><h2>Title: ${note.title}</h2> <button class="open-note-button">Open note</button><hr></div>`;
        }

        let openNoteButton = allNotesContainer.querySelectorAll(".open-note-button")

        for (let i = 0; i < notes.length; i++){
            openNoteButton[i].addEventListener("click", async () => {
                const note = notes[i];
                await showNoteView(note.id);
            });
        };
    } catch (error) {
        console.error("Error loading notes", error);
    }

}

noteForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    try {
        const formData = new FormData(noteForm);
        const note = await newNote(formData);
        console.log(note);
        noteForm.reset()
        loadNotes();
    } catch (error) {
        console.error("Error creating note", error);
    }
});