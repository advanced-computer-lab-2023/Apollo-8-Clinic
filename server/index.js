import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";
import adminRoutes from "./routes/admin.js";
import appointmentRoutes from './routes/appointment.js';

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

// images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory where your images are located
const imagesDirectory = path.join(__dirname, './uploads');

// Set up a route to serve images
app.use('/images', express.static(imagesDirectory));

// routes
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/admin", adminRoutes);
app.use("/appointment", appointmentRoutes);
