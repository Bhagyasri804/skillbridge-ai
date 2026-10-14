import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export function requireAuth(req, res, next) {
  let token = null;

  // 1. Check HTTP-only cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Check Authorization Bearer header as secondary fallback
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in to continue.'
    });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'skillbridge_fallback_secret_key';
    const decoded = jwt.verify(token, jwtSecret);

    const user = UserModel.findById(decoded.id);
    if (!user) {
      // Clear invalid cookie
      res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
      });
      return res.status(401).json({
        success: false,
        message: 'User session expired or user no longer exists. Please log in again.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    // Clear invalid or expired cookie
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.'
    });
  }
}
