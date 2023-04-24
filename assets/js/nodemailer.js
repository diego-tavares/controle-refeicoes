const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: ''
    }
});


const mailOptions = {
    from: 'diego.tavares@3geoconsult.com.br',
    to: 'exemplo@exemplo.com',
    subject: 'Relatório de Funcionários',
    text: corpoEmail
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('E-mail enviado: ' + info.response);
    }
});
