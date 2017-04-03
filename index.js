"use strict";

const fs = require('fs');

const config = require('./config');

const nodemailer = require('nodemailer');

const emails = require('./list');

const content = fs.readFileSync('content.html', 'utf8');;

const transport = nodemailer.createTransport({
    host : config.host,
    port : config.port,
    secure : config.secure,
    auth : {
        user: config.user,
        pass: config.pass
    }
});

const params = {
	from : config.from,
	subject : config.subject,
	html : content
};

const sendMail = (to) => new Promise((resolve, reject) => {
	params.to = to;
    transport.sendMail(
    	params, 
    	(error, info) => error ? reject(error.message) : resolve(info.response)
	);
});

Promise.all(emails.map(sendMail))
	.then(console.log)
	.catch(console.error);
