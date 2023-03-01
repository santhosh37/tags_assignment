var express = require("express");
var router = express.Router();
const tagsController = require("./../controllers/tagsController");

/* GET tags list. */
router.get("/", function (req, res, next) {
  tagsController.list(req, res);
});

router.post("/", (request, response) => {
  tagsController.create(request, response);
});

router.put("/", (request, response) => {
  tagsController.update(request, response);
});

router.delete("/", (request, response) => {
  tagsController.delete(request, response);
});

module.exports = router;
