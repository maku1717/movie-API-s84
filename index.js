// dependencies and modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// routes
const userRoutes = require("./routes/user");
const moviesRoutes = require("./routes/movie");

require("dotenv").config();

// server setup
const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:8000", "http://localhost:8000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// database Connection
mongoose.connect(process.env.MONGODB_STRING);
//Prompts a message in the terminal once the connection is "open" and we are able to successfully connect to our database
mongoose.connection.once("open", () => {
  console.log("Now connected to MongoDB Atlas");
});

// backend Routes
app.use("/users", userRoutes);
app.use("/movies", moviesRoutes);

if (require.main === module) {
  //"process.env.PORT || 3000" will use the environment variable if it is available OR will use port 3000 if none is defined
  app.listen(process.env.PORT || 3000, () => {
    console.log(`API is now online on port ${process.env.PORT || 3000}`);
  });
}
