import mongoose from "mongoose";
import BorrowTransaction from "../models/borrowTransaction.js";

// 📌 Create a new borrow transaction
export const createBorrowTransaction = async (req, res) => {
  try {
    const { borrowerId, lenderId, amount, dueDate } = req.body;

    // ✅ Convert borrowerId & lenderId from String to ObjectId
    if (!mongoose.Types.ObjectId.isValid(borrowerId) || !mongoose.Types.ObjectId.isValid(lenderId)) {
      return res.status(400).json({ message: "Invalid borrowerId or lenderId" });
    }

    const borrowerObjectId = new mongoose.Types.ObjectId(borrowerId);
    const lenderObjectId = new mongoose.Types.ObjectId(lenderId);

    if (!amount || !dueDate) {
      return res.status(400).json({ message: "Amount and dueDate are required" });
    }

    const transaction = new BorrowTransaction({
      borrowerId: borrowerObjectId,
      lenderId: lenderObjectId,
      amount,
      dueDate,
      status: "pending",
    });

    await transaction.save();
    res.status(201).json({ message: "Borrow transaction created", transaction });
  } catch (error) {
    console.error("Error creating borrow transaction:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Update loan repayment status
export const updateLoanStatus = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const transaction = await BorrowTransaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.status = status;
    await transaction.save();
    res.status(200).json({ message: "Loan status updated", transaction });
  } catch (error) {
    console.error("Error updating loan status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get all borrow transactions for a user
export const getUserBorrowTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const transactions = await BorrowTransaction.find({
      $or: [{ borrowerId: userId }, { lenderId: userId }],
    }).populate("borrowerId lenderId", "name email");

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching borrow transactions:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
