import express from "express";
import { createBorrowTransaction, updateLoanStatus, getUserBorrowTransactions } from "../controllers/borrowTransactionController.js";

const router = express.Router();

// Route to create a borrow transaction
router.post("/borrow", createBorrowTransaction);

// Route to update loan status
router.post("/borrow/update-status", updateLoanStatus);

// Route to get borrow transactions for a user
router.get("/borrow/:userId", getUserBorrowTransactions);

export default router;
