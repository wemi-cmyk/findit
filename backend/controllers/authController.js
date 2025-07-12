const User = require('../models/user');
const bcrypt = require('bcrypt');


//
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "User already exists." });
    }

       // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered!", 
user: { id: newUser.id, name: newUser.name, email: newUser.email }    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed." });
  }
};


// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    res.status(200).json({
      message: "Login successful!",
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed." });
  }
};
