const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { connectRabbitMQ } = require("./rabbitmq");

const app = express();
app.use(bodyParser.json());
app.use(routes);

const PORT = 3000
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectRabbitMQ()
  .then(() => {
    console.log("RabbitMQ connected successfully");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("RabbitMQ connection failed", err);
    process.exit(1);
  });
