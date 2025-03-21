import RecordStoreAbstractInterface from "./recordStoreAbstractInterface.mjs";
import dbManager from "./db.mjs";


class NoteStore extends RecordStoreAbstractInterface {

    async create(note){
        console.log("NoteStore får inn: " + note.title, note.content);
        return await dbManager.create(`INSERT INTO public."Note_table"(title, content) VALUES ($1, $2) RETURNING id, title, content;`, note.title, note.content);
    }

    async read(note){
        return await dbManager.read(`SELECT id, title, content FROM public."Note_table" WHERE id=$1; `, note.id);
    }

    async readAll(){
        return await dbManager.read(`SELECT * FROM public."Note_table" ORDER BY id DESC; `);
    }


    async update(note){
        return await dbManager.update(`UPDATE public."Note_table" SET title=$1, content=$2 WHERE id=$3 RETURNING title, content, id;`, note.title, note.content, note.id); 
    }

    async purge(note){
        return await dbManager.purge(`DELETE FROM public."Note_table" WHERE id=$1;`, note.id);
    }

}

export default NoteStore;