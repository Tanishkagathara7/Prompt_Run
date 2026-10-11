import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { validatePassword } from '../utils/validation';

export interface EmailAuthPayload {
  email: string;
  password: string;
  name?: string;
  mode?: string;
  role?: string;
  organization?: string;
  domainProfile?: Record<string, any>;
}

export const generateToken = (userId: string, email: string, role?: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is missing on server.');
  }
  return jwt.sign({ id: userId, email, role: role || 'user' }, JWT_SECRET, { expiresIn: '7d' });
};

export class AuthService {
  static async emailAuthenticate(payload: EmailAuthPayload) {
    const { email, password, name, mode } = payload;

    if (!email || !password) {
      const error: any = new Error('Email and password are required');
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (mode === 'signup') {
      // Fast index existence check using MongoDB projection
      const existingUser = await User.exists({ email: normalizedEmail });
      if (existingUser) {
        const error: any = new Error('An account already exists with this email address.');
        error.statusCode = 400;
        throw error;
      }

      // Enforce strong password validation on Sign Up
      const passwordError = validatePassword(password);
      if (passwordError) {
        const error: any = new Error(passwordError);
        error.statusCode = 400;
        throw error;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email: normalizedEmail,
        name: name ? name.trim() : normalizedEmail.split('@')[0],
        role: payload.role || 'user',
        organization: payload.organization || undefined,
        domainProfile: payload.domainProfile || {},
        provider: 'email',
        passwordHash: hashedPassword,
      });
      await newUser.save();
      console.log(`👤 New user registered via email: ${newUser.email} (role: ${newUser.role})`);

      return {
        success: true,
        token: generateToken((newUser._id as any).toString(), newUser.email, newUser.role),
        user: {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          organization: newUser.organization,
          domainProfile: newUser.domainProfile,
          provider: newUser.provider,
          avatarUrl: newUser.avatarUrl,
          createdAt: newUser.createdAt,
        },
      };
    } else {
      let user = await User.findOne({ email: normalizedEmail });
      // Mode: 'login' - User MUST be registered
      if (!user) {
        const error: any = new Error('No user found with this email. Please sign up first.');
        error.statusCode = 404;
        throw error;
      }

      // If user registered with email mode, they MUST have a passwordHash
      if (user.passwordHash) {
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          const error: any = new Error('Invalid email or password.');
          error.statusCode = 401;
          throw error;
        }
      } else {
        // If user registered with Google or GitHub and hasn't set a password yet
        user.passwordHash = await bcrypt.hash(password, 10);
        await user.save();
      }

      return {
        success: true,
        token: generateToken((user._id as any).toString(), user.email, user.role),
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          organization: user.organization,
          domainProfile: user.domainProfile,
          provider: user.provider,
          avatarUrl: user.avatarUrl,
        },
      };
    }
  }


  static async getUserProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      const error: any = new Error('User profile not found.');
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        organization: user.organization,
        domainProfile: user.domainProfile,
        provider: user.provider,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      },
    };
  }
}
