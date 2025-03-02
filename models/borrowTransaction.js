import mongoose from "mongoose";

const borrowTransactionSchema = new mongoose.Schema(
  {
    borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lenderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("BorrowTransaction", borrowTransactionSchema);
