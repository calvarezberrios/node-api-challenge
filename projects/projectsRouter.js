const express = require("express");

const projectDb = require("../data/helpers/projectModel");
const projectMiddleware = require("./projectsMiddleware");

const router = express.Router();

router.use("/:id", projectMiddleware.validateProjectId);

router.get("/", (req, res, next) => {
    projectDb.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            next({ code: 500, message: "There was an error retrieving projects from the database."});
        });
});

router.get("/:id", (req, res, next) => {
    res.status(200).json(req.project);
});

router.post("/", projectMiddleware.validateProject, (req, res, next) => {
    const newProject = req.body;

    projectDb.insert(newProject)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(() => {
            next({ code: 500, message: "There was an error creating the project." });
        });
});

router.get("/:id/actions", (req, res, next) => {
    const { id } = req.params;

    projectDb.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            next({ code: 500, message: "There was an error retrieving the actions for the project." });
        })
});

router.put("/:id", projectMiddleware.validateProject, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    projectDb.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json(updated);
            } else {
                next({ code: 404, message: "Project Id not found." });
            }
        })
        .catch(() => {
            next({ code: 500, message: "There was an error updating project." });
        })
});

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    projectDb.remove(id)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(() => {
            next({ code: 500, message: "There was an error removing the project." });
        })
});

module.exports = router;