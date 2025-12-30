const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");

const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventsController");

router.post("/", upload.single('image'), createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent)


module.exports = router;