// netlify/functions/server.js

const nodemailer = require('nodemailer');
const { parse } = require('querystring');
const { promisify } = require('util');

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
            const parsedBody = await promisify(parse)(event.body);
            const { name, email, message } = parsedBody;

            const mailOptions = {
                from: email,
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
