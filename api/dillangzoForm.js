import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phoneNumber,
    alternatePhoneNumber,
    address,
    city,
    nationality,
    languagesToLearn,
    preferredSchedule,
    currentLevel,
    hearAbout,
  } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !address || !city) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        family: 4, // ✅ Force IPv4 to fix EHOSTUNREACH issue
      });
      

    await transporter.sendMail({
      from: `"DILLANGZO Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: "📩 New Admission Form Submission – DILLANGZO Academy",
      html: `
        <h2>🎓 New Admission Request</h2>
        <h3>👤 Basic Information</h3>
        <p><b>First Name:</b> ${firstName}</p>
        <p><b>Last Name:</b> ${lastName}</p>
        <p><b>Date of Birth:</b> ${dateOfBirth || "N/A"}</p>
        <p><b>Gender:</b> ${gender}</p>

        <h3>📞 Contact Information</h3>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phoneNumber}</p>
        <p><b>Alternate Phone:</b> ${alternatePhoneNumber || "N/A"}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Nationality:</b> ${nationality}</p>

        <h3>🌍 Language Learning Preferences</h3>
        <p><b>Languages to Learn:</b> ${languagesToLearn.join(", ")}</p>
        <p><b>Current Level:</b> ${currentLevel}</p>
        <p><b>Preferred Schedule:</b> ${preferredSchedule || "Not specified"}</p>
        <p><b>Heard About Academy From:</b> ${hearAbout}</p>
      `,
    });

    res.json({ success: true, message: "✅ Admission form submitted successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "❌ Failed to send email" });
  }
});

export default router;
