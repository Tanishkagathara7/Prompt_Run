import { Router } from 'express';
import { DomainItemController } from '../controllers/domainItem.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// All domain endpoints are strictly protected with JWT middleware
router.use(requireAuth);

// Item CRUD routes
router.post('/', DomainItemController.create);
router.get('/', DomainItemController.getAll);
router.get('/:id', DomainItemController.getById);
router.put('/:id', DomainItemController.update);
router.delete('/:id', DomainItemController.delete);

export default router;
