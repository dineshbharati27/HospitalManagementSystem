require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/user");

const doctorRoutes = require("./routes/doctorRoutes");
const dashboardCardRoutes = require("./routes/dashboardCards"); 
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointment");
const authRoutes = require("./routes/auth");
const medicineRoutes = require("./routes/medicineRoutes");
const orderRoutes = require("./routes/orderRoutes");
const faqRoutes = require("./routes/faqRoutes")

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/api/dashboardcards", dashboardCardRoutes);
app.use("/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/faqs", faqRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
