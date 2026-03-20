const db = require('../config/db');

exports.getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

exports.createUser = (name, email, callback) => {
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], callback);
};