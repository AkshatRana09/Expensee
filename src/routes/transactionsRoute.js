import express from 'express';
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionByUserId } from '../controllers/transactionsController.js';
const router = express.Router();

router.get("/summary/:userId", getSummaryByUserId); 
router.get("/:userId",getTransactionByUserId);
router.post("/",createTransaction);
router.delete("/:id",deleteTransaction);
export default router;
