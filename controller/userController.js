const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const validator = require("validator");
// Create User controller

module.exports = {
  addUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // encrypting the passowrd
      const userExist = await User.findOne({ username: username });
      if (userExist) {
        return res.status(201).json({
          message:
            "User already exist with this name, Please try another unique user name!"
        });
      }
      
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({
        message: "User created successfully",
        data: {
          username:newUser.username, email:newUser.email
        },
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const { identifier } = req.params;
      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (!user) {
        return res.status(200).json({
          message: "This user does not exist in our database!",
        });
      }
      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { identifier } = req.params;
      const { username, email, password } = req.body;

      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (!user) {
        return res
          .status(200)
          .json({ message: "This user does not exist in our database!" });
      }
      if (username) {
        const userExist = await User.findOne({ username: username });
        if (userExist) {
          return res.status(201).json({
            message:
              "User already exist with this name, Please try another unique user name!"});
        }
      }
      if (email) {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
          return res.status(201).json({
            message:
              "User already exist with this email, Please try another  email!",
            data: newUser,
          });
        }
      }
      let newHashedPassword = "";
      if (password) {
        newHashedPassword = await bcrypt.hash(password, 10);
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: userid },
        { $set: { username, email, password: newHashedPassword } },
        { new: true }
      );

      return res.status(200).json({
        message: "User updated successfully",
        data: {
          username:updatedUser.username,
          email:updatedUser.email
        },
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
  deleteuser: async (req, res) => {
    try {
      const { identifier } = req.params;
      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });
      if (!user) {
        return res
          .status(200)
          .json({ message: "This user does not exist in our database!" });
      }

      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};
