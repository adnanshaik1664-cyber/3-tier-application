const express = require("express");
const router = express.Router();

const db = require("../db");

// GET all tasks
router.get("/", (req, res) => {

    db.query("SELECT * FROM tasks", (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

});

// ADD task
router.post("/", (req, res) => {

    const { name } = req.body;

    db.query(

        "INSERT INTO tasks(name) VALUES(?)",

        [name],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Task Added"
            });

        }

    );

});

// DELETE task
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    db.query(

        "DELETE FROM tasks WHERE id=?",

        [id],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Task Deleted"
            });

        }

    );

});

module.exports = router;