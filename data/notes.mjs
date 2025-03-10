import NoteStore from "./noteStore.mjs";

const ns = new NoteStore(); // create a new instance of the NoteStore class

export function addNote() {
  console.log('addNote');
    const note = [];
};

// koble infoen fra formet til denne?

// infoen fra denne funksjonen sendes tilbake til klient, men må også sendes til en dabaase

export function saveNotes(){
    ns.save(this);
}