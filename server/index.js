import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";
import adminRoutes from "./routes/admin.js";
import appointmentRoutes from './routes/appointment.js';
import stripe from 'stripe';


const app = express();
app.use(express.json());
app.use(cors());
const stripeInstance = new stripe('sk_test_51OAbKKFG7BNY2kzIjyhX3ByBqijkVoASpjD4fcyOIjGcYiyxMdpHzQAf2rX7bBcokOGHeo7uwxDLX8mkStLJD3pj001MnvPqcn');

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
app.use("/admin", adminRoutes);
app.use("/appointment", appointmentRoutes);
// This is your test secret API key.



const YOUR_DOMAIN = 'http://localhost:5173/patientFamilyAppointments/';

const storeItems = new Map([
  [1, {price: 200 , name:'Dr. hamada session'}], [2,  {price: 200 , name:'Dr. hamada session'}]
])

app.post('/AppointmentCheckout', async (req, res) => {
  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: 'price_1OAhcrFG7BNY2kzIxPQqkTZi', // Replace with the actual Price ID from your Stripe Dashboard
        quantity: 4
      }, 
    ],
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

const PACKAGE_DOMAIN = 'http://localhost:5173/PatientHP_FM/';

app.post('/PackageCheckout', async (req, res) => {
  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: 'price_1OAhcrFG7BNY2kzIxPQqkTZi', // Replace with the actual Price ID from your Stripe Dashboard
        quantity: 1
      }, 
    ],
    success_url: `${PACKAGE_DOMAIN}?success=true`,
    cancel_url: `${PACKAGE_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));