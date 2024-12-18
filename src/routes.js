const express = require("express");
const { getChannel } = require("./rabbitmq");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Payment Workflow API!");
});

router.post("/payment", async (req, res) => {
  const paymentDetails = req.body;

  if (!paymentDetails.user || !paymentDetails.paymentType || !paymentDetails.cardNo) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    const channel = getChannel();
    await channel.sendToQueue("PaymentQueue", Buffer.from(JSON.stringify(paymentDetails)));
    console.log("Payment sent to queue:", paymentDetails);

    res.status(200).send({ message: "Payment queued successfully" });
  } catch (error) {
    console.error("Error sending to queue:", error);
    res.status(500).send({ error: "Failed to queue payment" });
  }
});

module.exports = router;
