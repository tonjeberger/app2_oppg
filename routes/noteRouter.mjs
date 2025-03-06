import express from 'express';

const router = express.Router();

router.use(express.json());

router.get("/notes", (req, res) => {
    // list all notes
    res.send('List all notes');
});

router.post("/notes", (req, res) => {
    // create a new note
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