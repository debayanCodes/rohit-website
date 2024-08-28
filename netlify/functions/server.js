// netlify/functions/server.js

const nodemailer = require('nodemailer');
const { parse } = require('querystring');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'downloadingmedia@gmail.com', // Replace with your email address
        pass: 'owtt ltte tpyq wfym'         // Replace with your email password or an app-specific password
    },
    logger: true, // Log information about email sending
    debug: true   // Output debugging information
});

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        try {
            const { name, email, message } = JSON.parse(event.body);

            const mailOptions = {
                from: 'downloadingmedia@gmail.com', // Use your email as the sender
                to: 'downloadingmedia@gmail.com', // Replace with your email address
                subject: 'New Contact Form Submission',
                text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
            };

            await transporter.sendMail(mailOptions);
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'success', message: 'Email sent successfully!' })
            };
        } catch (error) {
            console.error('Error sending email:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ status: 'error', message: 'Failed to send email. Please try again later.' })
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ status: 'error', message: 'Method not allowed' })
    };
};