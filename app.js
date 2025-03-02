import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import borrowRoutes from "./Routers/borrowTransactionRoutes.js"; // ✅ Import Borrow Routes

// Express server instance
const app = express();
const port = 4000;

// Connect to the database
connectDB();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow JSON payloads
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data

// Registering API routes
app.use("/api/v1", transactionRoutes); // Routes for credit/debit transactions
app.use("/api/auth", userRoutes); // Routes for user authentication (login, signup)
app.use("/api/borrow", borrowRoutes); // ✅ Routes for Borrow to Friend feature

// Root endpoint to check if the server is running
app.get("/", (req, res) => {
  res.send("FinManager Server is working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
