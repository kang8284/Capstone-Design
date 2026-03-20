const userModel = require('../models/userModel');

exports.getUsers = (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  userModel.createUser(name, email, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'User created' });
  });
};