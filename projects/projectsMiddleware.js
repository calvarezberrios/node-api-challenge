const projectDb = require("../data/helpers/projectModel");

module.exports = {
    validateProjectId: function(req, res, next) {
        const { id } = req.params;

        projectDb.get(id)
            .then(project => {
                if(project) {
                    req.project = project;
                    next();
                } else {
                    next({ code: 400, message: "Invalid Project ID" });
                }
            })
            .catch(err => {
                console.log(err);
                next({ code: 500, message: "Error retrieving project data." });
            });
    },
    validateProject: function(req, res, next) {

        if(Object.keys(req.body).length === 0) {
            next({ code: 400, message: "Please provide post data." });
        } else if(!(req.body.name && req.body.description)) {
            next({ code: 400, message: "Please provide a project name and description." });
        } else {
            next();
        }
    }
}