const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function getAllUsers(req, res) {
  return await User.findAll();
}

async function getUserById(req) {
  return await User.findByPk(req.params.id);
}

async function updateUser(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await User.update({ username, password: hashedPassword }, { where: { id: req.params.id } });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };