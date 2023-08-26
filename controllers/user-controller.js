const { User } = require("../models");

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v", // Exclude __v field from thoughts
      })
      .populate({
        path: "friends",
        select: "-__v", // Exclude __v field from friends
      })
      .select("-__v") // Exclude __v field from the main user query
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // GET a single user by _id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // POST a new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // PUT to update a user by _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // DELETE a user by _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id" });
        }
        // Bonus: Remove user's associated thoughts
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted" });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // POST to add a new friend to a user's friend list
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // DELETE to remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
