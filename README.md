# Auth Package

Auth Package is a lightweight authentication and authorization package for Node.js applications, utilizing JSON Web Tokens (JWT) for secure authentication and middleware for authorization control.

## Installation

Install the package via npm:

npm install auth-package

## Usage

### Setting Up

First, require the package in your Node.js application:

const authPackage = require('auth-package');

### Authentication

To handle user authentication, use the provided /login endpoint. Send a POST request with the user's credentials (username and password) to obtain a JWT token.

app.post('/login', (req, res) => {
  // Authenticate user and generate JWT token
});

### Authorization

Protect routes by using the provided authorize middleware. Pass the required role as an argument to restrict access to authorized users only.

app.get('/admin', authPackage.authorize('admin'), (req, res) => {
  // Handle admin route
});

app.get('/user', authPackage.authorize('user'), (req, res) => {
  // Handle user route
});

## Configuration

Ensure to set a secure secret key for JWT token generation:

const JWT_SECRET = 'your_secret_key';

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.