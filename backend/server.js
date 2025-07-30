const express = require("express");
const db = require("./db.js");
const cors = require("cors");
require("dotenv").config();
const articlesRouter = require("./routes/articles");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////////////////////////////////////////////////////////
//     Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://newsroomfrontend.vercel.app",

];

// ✅ CORS middleware (add only ONCE, at top)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

//////////////////////////////////////////////////////////

app.use("/api", authRoutes);
app.use("/api/articles", articlesRouter);  // ✅ sahi



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
