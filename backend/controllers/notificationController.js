import { sendNotificationEmail } from '../services/emailService.js';

export const sendEmail = async (req, res) => {
  try {
    const { recipientEmail, subject, content } = req.body;
    await sendNotificationEmail(recipientEmail, subject, content);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
