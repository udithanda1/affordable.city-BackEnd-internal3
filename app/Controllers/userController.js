const config = require('../config');
const jwt = require('jsonwebtoken');

const UserController = {
  index(req, res) {
    const token = req.get('Authorization');
    const decoded = jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoic2hhbWltQGdtYWlsLmNvbSIsInVzZXJJRCI6MSwiaWF0IjoxNTA5MzM3NjExLCJleHAiOjE1MDkzMzk0MTF9.CLMb-8mjV9VrRM4rxitOKC3U6A611Xzpg4X3o-4HYaY', config.keys.secret);
    const email = decoded.userID;
    res.status(200).json({ message: `Welcome to the users area ${email}!` });
  }
};

module.exports = UserController;
