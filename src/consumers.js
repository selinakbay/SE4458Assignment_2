const { getChannel } = require("./src/rabbitmq.js");
const nodemailer = require("nodemailer");
require("dotenv").config(); 

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, 
  },
});

async function startConsumers() {
  const channel = getChannel();

  channel.consume("PaymentQueue", async (msg) => {
    const paymentDetails = JSON.parse(msg.content.toString());
    console.log("Processing payment:", paymentDetails);

    setTimeout(async () => {
      console.log("Payment processed successfully:", paymentDetails);

      const notification = { user: paymentDetails.user, message: "Your payment has been processed" };
      await channel.sendToQueue("NotificationQueue", Buffer.from(JSON.stringify(notification)));
      channel.ack(msg);
    }, 2000);
  });

  channel.consume("NotificationQueue", (msg) => {
    const notification = JSON.parse(msg.content.toString());
    console.log("Sending notification:", notification);

    const mailOptions = {
      from: '"Payment Workflow" <noreply@example.com>',
      to: notification.user,
      subject: "Payment Processed",
      text: notification.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return channel.nack(msg);
      }

      console.log("Email sent successfully:", info.messageId);
      channel.ack(msg);
    });
  });

  console.log("Consumers started");
}

module.exports = { startConsumers };
require('dotenv').config();
console.log("SMTP User:", process.env.SMTP_USER);
