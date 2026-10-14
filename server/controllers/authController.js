import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

// Cookie options for secure HTTP-only session storage
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/'
});

/**
 * Generate JWT token for user
 */
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || 'skillbridge_fallback_secret_key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn }
  );
};

export const AuthController = {
  /**
   * POST /api/auth/register
   * Registers a new user with secure password hash
   */
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const normalizedEmail = email.trim().toLowerCase();

      // Check for existing duplicate email
      if (UserModel.emailExists(normalizedEmail)) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email address already exists. Please log in instead.'
        });
      }

      // Hash password securely with bcrypt salt rounds = 10
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Save user to real database
      const newUser = UserModel.create({
        name,
        email: normalizedEmail,
        password_hash
      });

      // Generate JWT session token
      const token = generateToken(newUser);

      // Send token in HTTP-only cookie
      res.cookie('token', token, getCookieOptions());

      return res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome to SkillBridge AI.',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          created_at: newUser.created_at
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({
        success: false,
        message: 'A database or server error occurred during registration. Please try again.'
      });
    }
  },

  /**
   * POST /api/auth/login
   * Authenticates user, verifies password hash, and sets HTTP-only cookie
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const normalizedEmail = email.trim().toLowerCase();

      // Find user by email
      const user = UserModel.findByEmail(normalizedEmail);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password. Please verify your credentials.'
        });
      }

      // Verify bcrypt password hash
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password. Please verify your credentials.'
        });
      }

      // Generate session token
      const token = generateToken(user);

      // Set HTTP-only cookie
      res.cookie('token', token, getCookieOptions());

      return res.status(200).json({
        success: true,
        message: 'Login successful! Welcome back.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'A database or server error occurred during login. Please try again.'
      });
    }
  },

  /**
   * POST /api/auth/logout
   * Clears HTTP-only cookie and invalidates session
   */
  async logout(req, res) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });

      return res.status(200).json({
        success: true,
        message: 'Successfully logged out.'
      });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to complete logout.'
      });
    }
  },

  /**
   * GET /api/auth/me
   * Returns current authenticated user from session cookie
   */
  async getCurrentUser(req, res) {
    try {
      // req.user was populated by requireAuth middleware
      return res.status(200).json({
        success: true,
        user: req.user
      });
    } catch (error) {
      console.error('Get current user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve user profile.'
      });
    }
  }
};

export default AuthController;
