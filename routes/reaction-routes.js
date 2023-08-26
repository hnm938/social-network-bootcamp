const router = require("express").Router();
const {
  createReaction,
  deleteReaction,
} = require("../controllers/reaction-controller");

// Define routes
router.route("/").post(createReaction);
router.route("/:thoughtId/:reactionId").delete(deleteReaction);

module.exports = router;
