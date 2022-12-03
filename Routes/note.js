const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE:1 Get all the notes using: GET "/api/auth/createUser".login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

//ROUTE:2 Add a new note using: POST "/api/auth/createUser".login required
router.post(
	"/addnote",
	fetchuser,
	[body("title", "Enter a valid title").isLength({ min: 3 })],
	[body("description", "Enter a valid description").isLength({ min: 5 })],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;
			// If there are errors, return Bad request and the errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const note = new Notes({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const savedNote = await note.save();
			res.json(savedNote);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

module.exports = router;
