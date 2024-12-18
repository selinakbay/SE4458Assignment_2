# SE4458 ASSIGNMENT_2
Payment Workflow using RabbitMQ

# Project Overview
The system follows a three-step process:

Send Payment Data: The user sends payment details via a REST API (POST /payment).
Payment Processing: The payment details are consumed from the PaymentQueue, simulated as processed, and forwarded to the NotificationQueue.
Send Email Notification: The system sends an email notification to the user, confirming that the payment has been processed.

# Technologies Used
Node.js: Backend runtime.
Express.js: REST API framework.
RabbitMQ: Message queue service for asynchronous processing.
Docker: Containerization for RabbitMQ and the app.

# API Endpoints
POST /payment
Description: Sends payment details to the PaymentQueue.

Payload:

json
Kodu kopyala
{
  "user": "testuser@example.com",
  "paymentType": "credit",
  "cardNo": "1234123412341234"
}
Response:

json
Kodu kopyala
{
  "message": "Payment queued successfully"
}

# Design Overview
1. Queues
PaymentQueue: Holds incoming payment requests.
NotificationQueue: Holds notifications to be sent after payment processing.
2. Consumers
Payment Consumer:
Simulates processing payment.
Forwards a message to NotificationQueue.
Notification Consumer:
Sends an email notification to the user.
3. Architecture
POST /payment  ->  PaymentQueue -> [Payment Consumer] -> NotificationQueue -> [Notification Consumer] -> Email Sent

# Assumptions
SMTP credentials are provided for email functionality.
RabbitMQ runs in a Docker container.
Emails are sent in plaintext for simplicity.

# Issues Encountered
Relative Path Errors: Fixed by ensuring proper paths in require statements.
Environment Variable Management: Used dotenv for secure credential management.

