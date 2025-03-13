import TemplateManager from "../modules/templateManager.mjs";
import { getNote, deleteNote, updateNote } from "../apiHandler.mjs";

const templateFile = "./views/noteView.html"; // dette skal være path til html-filen

const template = await TemplateManager.fetchTemplate(templateFile);

const allNotesContainer = document.getElementById("all-notes-container");
const noteContainer = document.getElementById("note-container");
const noteFormDiv = document.getElementById("note-form-div");
// skal legge ved data i app.mjs?

async function showNoteView(id){
    try {
        const noteData = await getNote(id);
        console.log("shownoteview ", noteData);
        allNotesContainer.innerHTML = "";
        noteContainer.innerHTML = "";
        noteFormDiv.style.display = "none";

        const showNote = TemplateManager.cloneTemplate(template, noteContainer, {id, title: noteData.title, content: noteData.content});
        
        if(showNote){
            console.log("title: ", showNote);

            const titleElement = showNote.querySelector("#note-title");
            const contentElement = showNote.querySelector("#note-content");
            
            if(titleElement)
                {titleElement.textContent = noteData.title};
            if(contentElement)
                {contentElement.textContent = noteData.content};
            
            const editNoteButton = showNote.querySelector("#edit-note-button");
            const deleteNoteButton = showNote.querySelector("#delete-note-button");
        
            if(editNoteButton){
                console.log("editNoteButton ", editNoteButton);
                editNoteButton.addEventListener("click", async () => {
                    console.log("klikk")
                    const editTitle = showNote.querySelector("#edit-title");
                    const editContent = showNote.querySelector("#edit-content");
                    const editNoteForm = showNote.querySelector("#edit-note-form");
                    
                    editNoteButton.style.display = "none";
                    deleteNoteButton.style.display = "none";
                    editNoteForm.style.display = "block";

                    editTitle.value = noteData.title;
                    editContent.value = noteData.content;

                    editNoteForm.addEventListener("submit", async (evt) => {
                        evt.preventDefault();
                        const formData = new FormData(editNoteForm);
                        try {
                            await updateNote(noteData.id, formData);
                            window.location.replace("/");
                        } catch (error) {
                            console.error("Error updating note", error);
                        }
                    });
                });
            }
            
            if(deleteNoteButton){
                deleteNoteButton.addEventListener("click", async () => {
                    try {
                        
                        if(confirm("Are you sure you want to delete this note?") == true){
                            await deleteNote(noteData.id);
                            console.log("note deleted");
                            window.location.replace("/");
                        } 
                    }catch (error) {
                        console.error("Error deleting note", error);
                    }
                });
            }
        }

    } catch (error) {
        console.error("Error in showNoteView", error);
        noteContainer.innerHTML = "<p>Error loading note</p>";
        return null;
    };
};

export default showNoteView;