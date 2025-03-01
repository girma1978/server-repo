// import { Router, type Request, type Response } from 'express';
// import { User } from '../models/user.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({
//     where: { username },
//   });
//   if (!user) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }

//   const passwordIsValid = await bcrypt.compare(password, user.password);
//   if (!passwordIsValid) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }

//   const secretKey = process.env.JWT_SECRET_KEY || '';

//   const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//   return res.json({ token });
// };

// const router = Router();

// // POST /login - Login a user
// router.post('/login', login);

// export default router;


import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the password with the hashed password in the database
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate JWT token
    const secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // If token is successfully generated, send it as a response
    if (!token) {
      return res.status(500).json({ message: 'Token generation failed' });
    }

    return res.status(200).json({ token });  // Send token as JSON response
  } catch (error) {
    console.error(error);  // Log error for debugging
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
