import express from 'express';
import Note from '../data/notes.mjs'

const router = express.Router();

const note = new Note();

router.use(express.json());

router.get("/notes", (req, res) => {
    // list all notes
    res.send('List all notes');
}); // dette skal vel egentlig bare være forsiden?

router.post("/notes", (req, res) => {
    // create a new note
    note.title = req.body.title; // må få satt title og noteData, dette skal komme fra formet
    note.noteData = req.body.noteData;
    console.log("POST /notes");
});

router.get("/notes/:id", (req, res) => {
    //show note with a pecific id
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