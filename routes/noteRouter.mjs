import express from 'express';
import Note from '../data/notes.mjs'
import HTTP_CODES from '../utils/httpCodes.mjs';
const router = express.Router();


router.use(express.json());

router.get("/notes", async (req, res) => {
        // list all notes
        try {
            const notes = new Note();
            const allNotes = await notes.readAll();
            console.log("allNotes: ", allNotes);
            if(allNotes.length === 0){
                res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No notes found");
            }
            console.log("notes i router: ", allNotes);
             
            res.status(HTTP_CODES.SUCCESS.OK).json(allNotes);
            
            
        } catch (error) {
            console.error("Error reading notes: ", error);
            res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Error reading notes");
        }
        // res.send(notes);
    }); // dette skal vel egentlig bare være forsiden?


    
router.post("/notes", async (req, res) => {
    try {
        const note = new Note(req.body.title, req.body.content);
    console.log(note, " : instans av Note");
    // note er et objekt av klassen Note
        const newNote = await note.create();
        res.status(HTTP_CODES.SUCCESS.OK).json(newNote);
    } catch (error) {
        console.error("Error creating note: ", error);
    }
    console.log("POST /notes");
});

router.get("/notes/:id", async (req, res) => {
    //show note with a specific id
    console.log("GET /notes/:id");
});

router.patch("/notes/:id", async (req, res) => {
    //update note with a specific id
    console.log("PATCH /notes/:id");
});

router.put("/notes/:id", async (req, res) => {
    //replace note with a specific id
    console.log("PUT /notes/:id");
});

router.delete("/notes/:id", async (req, res) => {
    //delete note with a specific id
    console.log("DELETE /notes/:id");
});

export default router;