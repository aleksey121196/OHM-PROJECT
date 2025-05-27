import express from 'express';
import { addOrder, getOrders, updateOrderStatus} from '../controllers/ordersController';


const router = express.Router();

router.post('/', addOrder);
router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus); // ✅ This will now work

export default router;
