import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";

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


// routes
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
