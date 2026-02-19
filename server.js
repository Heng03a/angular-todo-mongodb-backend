import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose';

// Import routes (ES Module style)
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const app = express();
// comment below - Production shall not have the URl logged and shown - For secdurity reason
////console.log('MONGODB_URI:', process.env.MONGODB_URI);
////console.log("ENV CHECK:", process.env.MONGODB_URI ? "Loaded" : "Missing");

// CORS
const allowedOrigins = [
  "http://localhost:4200",
  "https://angular-todo-mongodb-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.options("*", cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend running — Boss Jialumen Edition");
});

// Connect DB
////connectDB();
