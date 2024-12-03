import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email, feedbackType, title, steps, priority } = await request.json();

    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Admin email to receive the feedback
      subject: `New Feedback Submission: ${feedbackType}`,
      text: `
        Feedback Type: ${feedbackType}
        Title: ${title}
        Steps to Reproduce: ${steps}
        Priority Level: ${priority}
        Submitted by: ${email}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Feedback submitted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send feedback." }, { status: 500 });
  }
}
