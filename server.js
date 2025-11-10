const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json()); // parses JSON request body
app.use(express.static("public")); // 👈 add this line

// ✅ Connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/userAppDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to Local MongoDB"))
.catch(err => console.log("❌ DB Connection Error:", err));

// ✅ Use routes
app.use("/api/users", userRoutes);

// ✅ Start the server (keeps app running)
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
