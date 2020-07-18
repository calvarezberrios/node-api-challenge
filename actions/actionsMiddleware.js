const actionDb = require("../data/helpers/actionModel");

module.exports = {
    validateActionId: function(req, res, next) {
        const { id } = req.params;

        actionDb.get(id)
            .then(action => {
                if(action) {
                    req.action = action;
                    next();
                } else {
                    next({ code: 400, message: "Invalid Action ID" });
                }
            })
            .catch(() => {
                next({ code: 500, message: "Error retrieving action data." });
            });
    },
    validateAction: function(req, res, next) {

        if(Object.keys(req.body).length === 0) {
            next({ code: 400, message: "Please provide action data." });
        } else if(!(req.body.project_id && req.body.description && req.body.notes)) {
            next({ code: 400, message: "Please provide a action's project id, description, and notes data." });
        } else if(req.body.description.length > 128) {
            next({ code: 400, message: "Description is too long, must be no more than 128 characters." });
        } else {
            next();
        }
    }
}