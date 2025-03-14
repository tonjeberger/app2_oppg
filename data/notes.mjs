import NoteStore from "./noteStore.mjs";

const noteStorageHandler = new NoteStore();

class Note {

    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    async create(){
        const note = await noteStorageHandler.create(this);
        this.title = note.title;
        this.content = note.content;
        console.log('Note created:', note);
        return this;
    } 

    async read(){
        const note = await noteStorageHandler.read(this);
        this.id = note.id;
        this.title = note.title;
        this.content = note.content;
        console.log("read note")                                                    
        return this;
    }

    async readAll(){
        const notes = await noteStorageHandler.readAll();
        return notes;
    }

    async update(){
        const note = await noteStorageHandler.update(this);
        console.log('Note updated:', note);
        this.title = note.title;
        this.content = note.content;
        return this;
    }

    async purge(){
        await noteStorageHandler.purge(this);
        return null;
    }

} 

export default Note;