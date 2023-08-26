const { Thought } = require("../models");

const reactionController = {
  // POST to create a reaction in a thoughts reactions array
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // DELETE a reaction by reactionId from a thoughts reactions array
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },
};

module.exports = reactionController;
