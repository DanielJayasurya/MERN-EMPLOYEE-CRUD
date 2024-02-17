const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

// Routes
const registrationRoutes = require('./routes/registrationRoute');
app.use('/registrations', registrationRoutes);


//Middleware for health check
app.use("/", async (req, res) => {
    try {await mongoose.connection.db.command({ ping: 1 });res.json({status: "Database is healthy",health: "API Server is up & running",});
    } catch (error) {console.error("Database is not healthy:", error);res.status(500).json({ status: "Database is not healthy", error: error.message });}
  });

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
