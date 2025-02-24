const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());


const MONGO_URI = "mongodb+srv://Hospital:nmuKCHFzSdXDSUtV@hospital.gzyr4.mongodb.net/your_database_name?retryWrites=true&w=majority&appName=hospital";

mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Routes
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});