import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { requireAuth, authLimiter } from '../middleware/auth';

const router = Router();

// Simple email login / signup endpoint
router.post('/email', authLimiter, AuthController.emailAuth);

// Protected route to retrieve current user profile using Bearer token
router.get('/me', requireAuth, AuthController.getMe);

export default router;
