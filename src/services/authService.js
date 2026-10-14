/**
 * Authentication Service
 * Communicates with real Express backend authentication endpoints.
 * Automatically handles HTTP-only cookie sessions with credentials: 'include'.
 */

const API_BASE = '/api/auth';

export const authService = {
  /**
   * Register a new user in the database
   */
  async register({ name, email, password, confirmPassword }) {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Includes HTTP-only session cookies
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed. Please try again.');
    }

    return data;
  },

  /**
   * Login user and establish HTTP-only session cookie
   */
  async login({ email, password }) {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Receives HTTP-only cookie
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Invalid email or password.');
    }

    return data;
  },

  /**
   * Logout user and clear HTTP-only cookie on server
   */
  async logout() {
    try {
      const response = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Logout error:', err);
      return { success: true };
    }
  },

  /**
   * Fetch current authenticated user from session cookie
   */
  async getCurrentUser() {
    const response = await fetch(`${API_BASE}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null; // Not authenticated
      }
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch current user.');
    }

    const data = await response.json();
    return data.user;
  }
};

export default authService;
