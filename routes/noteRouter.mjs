import express from 'express';
import Note from '../data/notes.mjs'
import HTTP_CODES from '../utils/httpCodes.mjs';
const router = express.Router();


router.use(express.json());

router.get("/notes", async (req, res) => {
        try {
            const notes = new Note();
            const allNotes = await notes.readAll();
            if(allNotes.length === 0){
                res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No notes found");
            }
             
            res.status(HTTP_CODES.SUCCESS.OK).json(allNotes);
            
            
        } catch (error) {
            console.error("Error reading notes: ", error);
            res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Error reading notes");
        }
    });

    
router.post("/notes", async (req, res) => {
    try {
        const note = new Note(req.body.title, req.body.content);
        const newNote = await note.create();
        res.status(HTTP_CODES.SUCCESS.OK).json(newNote);
    } catch (error) {
        console.error("Error creating note: ", error);
    }
});

router.get("/notes/:id", async (req, res) => {
    try {
        const note = new Note();
        note.id = req.params.id;
        const noteToShow = await note.read();

        res.status(HTTP_CODES.SUCCESS.OK).json(noteToShow);
    } catch (error) {
        console.error("Error reading note: ", error);
    }
});


router.put("/notes/:id", async (req, res) => {
    try {
        const note = new Note(req.body.title, req.body.content);
        note.id = req.params.id;
        const noteToEdit = await note.update();

        res.status(HTTP_CODES.SUCCESS.OK).json(noteToEdit);
    } catch (error) {
        console.error("Error reading note: ", error);
        
    }
});

router.delete("/notes/:id", async (req, res) => {
    try {
        const note = new Note();
        note.id = req.params.id;
        await note.purge();
        res.status(HTTP_CODES.SUCCESS.OK).json({success: true});
    } catch (error) {
        console.error("Error deleting note: ", error);
    }
});

export default router;