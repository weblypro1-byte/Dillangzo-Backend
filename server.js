import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import enquiryRoute from "./api/enquiry.js";
import contactRoute from "./api/contact.js";
import academyFormRoute from "./api/dillangzoForm.js"; // ✅ New route

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/enquiry", enquiryRoute);
app.use("/api/contact", contactRoute);
app.use("/api/dillangzoForm", academyFormRoute); // ✅ Added

app.get("/", (req, res) => {
  res.send("✅ DILLANGZO Academy Backend Running Successfully!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
