const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TokenBlacklistModel = require('../models/blacklist.model');

/**
 * @name registerUserController
 * @desc Register a new user expecting username, email and password in the request body
 * @access Public
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide username, email and password" });
  }

  const userAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }]
  });

  if (userAlreadyExists) {
    return res.status(400).json({ message: "User with this email or username already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash
  });

  const token = jwt.sign(
    { id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token)

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
}

/**
 * @name loginUserController
 * @desc Login a user expecting email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token)

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
}

/**
 * @name logoutUserController
 * @desc Logout a user by blacklisting the token and clearing the cookie
 * @access Public
 */

async  function logoutUserController(req, res) {
  const token = req.cookies.token;
  // console.log("Logout token:", token);

  if (token) {
    // Add the token to the blacklist
    await TokenBlacklistModel.create({ token });
  }
  
  // Clear the cookie
  res.clearCookie('token');

  res.status(200).json({ message: "User logged out successfully" });
  
}  

/**
 * @name getMeController
 * @desc Get the currently logged-in user's information
 * @access Private
 */

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id)
  res.status(200).json({
    message: "User information fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });

}


module.exports = { registerUserController, loginUserController, logoutUserController, getMeController };