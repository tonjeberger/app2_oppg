import express from 'express';
import Note from '../data/notes.mjs'
import HTTP_CODES from '../utils/httpCodes.mjs';
const router = express.Router();


router.use(express.json());

// router.get("/notes", (req, res) => {
    //     // list all notes
    //     res.send('List all notes');
    // }); // dette skal vel egentlig bare være forsiden?
    
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

router.get("/notes/:id", (req, res) => {
    //show note with a specific id
    console.log("GET /notes/:id");
});

router.patch("/notes/:id", (req, res) => {
    //update note with a specific id
    console.log("PATCH /notes/:id");
});

router.put("/notes/:id", (req, res) => {
    //replace note with a specific id
    console.log("PUT /notes/:id");
});

router.delete("/notes/:id", (req, res) => {
    //delete note with a specific id
    console.log("DELETE /notes/:id");
});

export default router;