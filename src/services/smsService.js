// This file handles SMS sending functionality using a third-party service like Twilio or Nexmo.

const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER);

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = async (to, message) => {
    try {
        const messageResponse = await client.messages.create({
            body: message,
            from: TWILIO_PHONE_NUMBER,
            to: to
        });
        return messageResponse;
    } catch (error) {
        throw new Error(`Failed to send SMS: ${error.message}`);
    }
};

module.exports = {
    sendSMS
};