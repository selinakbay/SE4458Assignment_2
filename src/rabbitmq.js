const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {
  try {
    console.log("Connecting to RabbitMQ at amqp://rabbitmq...");
    const connection = await amqp.connect("amqp://rabbitmq"); 
    channel = await connection.createChannel();
    console.log("RabbitMQ Channel created");

    await channel.assertQueue("PaymentQueue", { durable: true });
    await channel.assertQueue("NotificationQueue", { durable: true });
    console.log("Queues declared successfully");
  } catch (error) {
    console.error("RabbitMQ connection failed:", error);
    process.exit(1);
  }
}

function getChannel() {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };
