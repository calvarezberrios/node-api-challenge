const express = require("express");

const actionsDb = require("../data/helpers/actionModel");
const actionsMiddleware = require("./actionsMiddleware");

const router = express.Router();

router.use("/:id", actionsMiddleware.validateActionId);

router.get("/", (req, res, next) => {
    actionsDb.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            next({ code: 500, message: "There was an error retrieving actions." });
        })
});

router.get("/:id", (req, res, next) => {
    res.status(200).json(req.action);
});

router.post("/", actionsMiddleware.validateAction, (req, res, next) => {
    const newAction = req.body;

    actionsDb.insert(newAction)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(() => {
            next({ code: 500, message: "There was an error creating the action." });
        })
}); 

router.put("/:id", actionsMiddleware.validateAction, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    actionsDb.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json(updated);
            } else {
                next({ code: 404, message: "Action Id not found." });
            }
        })
        .catch(() => {
            next({ code: 500, message: "There was an error updating the action." });
        });
});

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    actionsDb.remove(id)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(() => {
            next({ code: 500, message: "There was an error removing the action." });
        })
});

module.exports = router;