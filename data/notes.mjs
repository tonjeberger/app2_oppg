import NoteStore from "./noteStore.mjs";

const noteStorageHandler = new NoteStore(); // create a new instance of the NoteStore class

class Note {

    constructor(title, content) {
        this.title = title;
        this.content = content;
    } // this her er det som blir sendt inn som argumenter til create, read, update og purge

    async create(){
        const note = await noteStorageHandler.create(this);
        this.title = note.title;
        this.content = note.content;
        console.log('Note created:', note);
        return this;
    } 

    async read(){
        const note = await noteStorageHandler.read(this);
        this.title = note.title;
        this.content = note.content;
        return this;
    }

    async update(){
        const note = await noteStorageHandler.update(this);
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