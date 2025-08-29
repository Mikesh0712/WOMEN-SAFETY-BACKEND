const { db } = require('../config/firebase');
const { sendSMS } = require('../services/smsService');

// Controller function to handle SOS
exports.sendSOS = async (req, res) => {
    const { contacts, location, userEmail } = req.body;

    if (!contacts || !location || !userEmail) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Save SOS alert to Firestore
        const sosRef = db.collection('sos_alerts').doc();
        await sosRef.set({
            userEmail,
            contacts,
            location,
            timestamp: new Date().toISOString()
        });

        // Send SMS to each contact except "112"
        for (const contact of contacts) {
            if (contact === "112") continue; // Skip emergency helpline
            await sendSMS(contact, `SOS Alert!\nLocation: ${location}\nFrom: ${userEmail}`);
        }

        return res.status(200).json({ success: true, message: 'SOS alert sent and saved successfully!' });
    } catch (error) {
        console.error('Error sending SOS:', error);
        return res.status(500).json({ success: false, message: 'Failed to send SOS alert' });
    }
};