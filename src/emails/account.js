const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SGAPI)

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'lofgrenlobo@gmail.com', // Change to your verified sender
        subject: 'Welcome to Task Manager App!',
        text: `Welcome to the app, ${name}.`,
        html: `<strong>Welcome to the app, ${name}. </strong>`,
    }
    sgMail.send(msg)
}

const sendCancelationEmail = (email, name) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'lofgrenlobo@gmail.com', // Change to your verified sender
        subject: 'Your account has been cancelled from Task Manager App!',
        text: `Goodbye, ${name}.`,
        html: `<strong>Goodbye, ${name}. </strong>`,
    }
    sgMail.send(msg)
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
