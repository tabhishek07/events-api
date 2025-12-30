const { ObjectId } = require("mongodb")

const { getDB } = require("../db");

//  --------- Controller logic to create event ------------

exports.createEvent = async (req, res) =>{

    try {
        
        const db = getDB();
        // flexible schema
        const event = {
            type: "event",
            name: req.body.name,
            tagline: req.body.tagline,
            description: req.body.description,
            schedule: new Date(req.body.schedule),
            image:req.file?req.file.path : null,
            moderator: req.body.moderator,
            category: req.body.category,
            sub_category: req.body.sub_category,
            rigor_rank: Number(req.body.rigor_rank),
            attendees: [],
            createdAt: new Date()
        }

        const result = await db.collection("events").insertOne(event);

        res.status(201).json({
            message:"Event created",
            id: result.insertedId
        })

    } catch (err) {
        res.status(500).json({
            message: "failed to create event",
            error: err.message
        })
    }
}

// --------- Controller logic to get all events  -----------

exports.getEvents = async (req, res) => {
    try {

        const db = getDB();

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const total = await db.collection("events").countDocuments();

        const events = await db
        .collection("events")
        .find({})
        .sort({ schedule: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

        res.status(200).json({
            page,
            limit,
            total,
            events
        });
        
    } catch (err) {
        res.status(500).json({
            message:"Failed to get events",
            error: err.message
        })
    }
}

// --------- Controller logic to get event by id ------------

exports.getEventById = async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;

        const event = await db.collection("events").findOne({
            _id: new ObjectId(id)
        });

        if(!event){
            return res.status(404).json({
                message: "Event not found",
            })
        }

        res.json({
            message: "event found",
            event
        });

    } catch (err) {
        res.status(500).json({
            message: "failed to get event",
            error: err.message
        })
        
    }
}

// --------- Controller logic to Update Event ----------------

exports.updateEvent = async (req, res) => {
    try {

        const db = getDB();
        const { id } = req.params;

        const updateData = {};

        // only sent fields are updated
        if(req.body.name) updateData.name = req.body.name;
        if(req.body.tagline) updateData.tagline = req.body.tagline;
        if(req.body.description) updateData.description = req.body.description
        if(req.body.schedule) updateData.schedule = new Date(req.body.schedule)
        if(req.body.moderator) updateData.moderator = req.body.moderator
        if(req.body.category) updateData.category = req.body.category
        if(req.body.sub_category) updateData.sub_category = req.body.sub_category
        if(req.body.rigor_rank) updateData.rigor_rank = Number(req.body.rigor_rank)

        if(req.file){
            updateData.image = req.file.path;
        }

        updateData.updatedAt = new Date();

        const result = await db.collection("events").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if(result.matchedCount === 0){
            return res.status(404).json({
                message:"Event not found"
            })
        }

        res.status(200).json({
            message: "Update success"
        });
        
    } catch (err) {
        res.status(500).json({
            message: "failed to update event",
            error: err.message
        })
    }
}

// --------- Controller logic to delete event ----------------

exports.deleteEvent = async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;

        const result = await db.collection("events").deleteOne({
            _id: new ObjectId(id)
        })
        
        if(result.matchedCount === 0){
            return res.status(404).json({
                message: "Event not found"
            })
        }

        res.status(200).json({
            message: "Event deleted"
        })


    } catch (err) {
        res.status(404).json({
            message: "Failed to delete",
            error: err.message
        });
        
    }
}