import express from 'express';
import { save, history,myOrder } from '../controller/order.controller.js';
import { verify } from '../middleware/authenticate.js';

const router = express();
router.get("/myorder/:id",verify,myOrder)
router.post("/save", verify, save);
router.get("/order-history", verify, history);
export default router;