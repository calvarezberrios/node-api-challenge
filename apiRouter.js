const express = require("express");

const projectsRouter = require("./projects/projectsRouter")
const actionsRouter = require("./actions/actionsRouter");

const router = express.Router();
router.use(express.json());

router.use("/projects", projectsRouter);
router.use("/actions", actionsRouter);

router.get("/", (req, res) => res.send("API running successfully!"));

router.use((err, req, res, next) => {
    res.status(err.code).json(err);
});

module.exports = router;