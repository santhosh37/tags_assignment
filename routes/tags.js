var express = require("express");
var router = express.Router();
const tagsController = require("./../controllers/tagsController");

/* Fetch all the tags. */
router.get("/", function (req, res, next) {
  tagsController.list(req, res);
});

/* Create a new tags. */
router.post("/", (request, response) => {
  tagsController.create(request, response);
});

/* Update a existing tag. */
router.put("/", (request, response) => {
  tagsController.update(request, response);
});

/* Delete a tag by Id. */
router.delete("/", (request, response) => {
  tagsController.delete(request, response);
});

module.exports = router;
