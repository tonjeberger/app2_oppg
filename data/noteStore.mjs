import RecordStoreAbstractInterface from "./recordStoreAbstractInterface.mjs";
import dbManager from "./db.mjs";


class NoteStore extends RecordStoreAbstractInterface {

    // her skal sql-spørringen inn
    create(note){
        dbManager.create
    }

}

export default NoteStore;