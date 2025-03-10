import NoteStore from "./noteStore.mjs";

const noteStorageHandler = new NoteStore(); // create a new instance of the NoteStore class

class Note {

    constructor(title, noteData) {
        this.title = title;
        this.noteData = noteData;
    }

    async create(){
        const note = await noteStorageHandler.create(this);
        this.title = note.title;
        this.noteData = note.noteData;
        return this;
    }

    async read(){
        const note = await noteStorageHandler.read(this);
        this.title = note.title;
        this.noteData = note.noteData;
        return this;
    }

    async update(){
        const note = await noteStorageHandler.update(this);
        this.title = note.title;
        this.noteData = note.noteData;
        return this;
    }

    async purge(){
        await noteStorageHandler.purge(this);
        return null;
    }

}