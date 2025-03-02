import BorrowTransaction from "../models/borrowTransaction.js";

// 📌 Create a new borrow transaction
export const createBorrowTransaction = async (req, res) => {
  try {
    const { borrowerId, lenderId, amount, dueDate } = req.body;

    if (!borrowerId || !lenderId || !amount || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = new BorrowTransaction({
      borrowerId,
      lenderId,
      amount,
      dueDate,
      status: "pending",
    });

    await transaction.save();
    res.status(201).json({ message: "Borrow transaction created", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Update loan repayment status
export const updateLoanStatus = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    const transaction = await BorrowTransaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.status = status;
    await transaction.save();
    res.status(200).json({ message: "Loan status updated", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get all borrow transactions for a user
export const getUserBorrowTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await BorrowTransaction.find({
      $or: [{ borrowerId: userId }, { lenderId: userId }],
    }).populate("borrowerId lenderId", "name email");

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
