const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createJWT, isTokenValid } = require('../utils/jwt');

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = await User.countDocuments({}) === 0;
  const role = isFirstAccount ? 'admin' : 'user'; 

  const user = await User.create({ email, name, password, role });
  const tokenPayload = { userId: user._id, role: user.role, name: user.name };

  const token = createJWT({ payload: tokenPayload });

  res.status(StatusCodes.CREATED).json({ user: tokenPayload, token });
};

const login = async (req, res) => {
  res.send('login user')
}

const logout = async (req, res) => {
  res.send('logout user')
}

module.exports = {
  register,
  login,
  logout
}