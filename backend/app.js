const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const foodRoutes = require("./routes/foodRoutes");
const groupItemRoutes = require('./routes/groupItemRoutes');

const app = express();

// Connect to database
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// Use food routes
app.use("/api", foodRoutes);
app.use('/api', groupItemRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
