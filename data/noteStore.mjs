import RecordStoreAbstractInterface from "./recordStoreAbstractInterface.mjs";
import dbManager from "./db.mjs";


class NoteStore extends RecordStoreAbstractInterface {

    // her skal sql-spørringen inn
    create(note){
        dbManager.create(`INSERT INTO public."Note_table"(title, note) VALUES ($2, $3) RETURNING id, title, note;`, [note.title, note.noteData]);
    }

    read(note){
        dbManager.read(`SELECT id, title, note FROM public."Note_table" WHERE id=$1; `, [note.id]);
    }

    update(note){
        dbManager.update(`UPDATE public."Note_table" SET title=$1, note=$2 WHERE id=$3 RETURNING id, title, note;`, [note.title, note.noteData, note.id]); 
    }

    purge(note){
        dbManager.purge(`DELETE FROM public."Note_table" WHERE id=$1;`, [note.id]);
    }

}

export default NoteStore;