const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

async function register(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: '1h' });
  res.json({ token });
}

module.exports = { register, login };