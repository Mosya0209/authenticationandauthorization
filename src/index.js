// auth-package.js

const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Sample user data (usually fetched from a database)
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' },
  { id: 2, username: 'admin', password: 'adminpassword', role: 'admin' }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Authorization middleware
function authorize(role) {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      if (role && decoded.role !== role) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
      req.user = decoded;
      next();
    });
  };
}

// Example protected route
app.get('/admin', authorize('admin'), (req, res) => {
  res.json({ message: 'Admin route accessed successfully', user: req.user });
});

// Example protected route
app.get('/user', authorize('user'), (req, res) => {
  res.json({ message: 'User route accessed successfully', user: req.user });
});

module.exports = app;