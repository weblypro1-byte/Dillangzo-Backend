import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    destination,
    startYear,
    studyLevel,
    terms,
    contactBy,
    updates,
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !destination || !studyLevel) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DILLANGZO Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: "📩 New Enquiry Form Submission",
      html: `
        <h3>🎓 New Student Enquiry</h3>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Destination:</b> ${destination}</p>
        <p><b>Start Year:</b> ${startYear}</p>
        <p><b>Study Level:</b> ${studyLevel}</p>
      `,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

export default router;
