const nodeMailer = require("nodemailer");
var config = require("../config/config");
var EmailTemplate = require("email-templates");
const hbs = require("nodemailer-express-handlebars");

transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: config.emailConfig.fromEmail,
        pass: config.emailConfig.password
    }
});

transporter.use(
    "compile",
    hbs({
        // viewEngine: {
        //     extName: ".handlebars",
        //     partialsDir: "./email-template",
        // },
        viewPath: "./email-template/",
        extName: ".handlebars"
    })
);

function mailerUtil(emailData, res)  {
    console.log("email temp path********** ", emailData);
    var templateData = emailData.templateData;
    console.log("temp data:::: ", templateData);
    let mailOptions = {
        from: config.emailConfig.fromEmail,
        to: emailData.to,
        subject: emailData.subject,
        template: emailData.templateFile,
        context: templateData
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Error occurs in email******",err);
            res.status(401).json({ status: 'fail', message: 'Reset password mail sent fail ', docs: '' })


        }else if(data){
            console.log("Email sent!!!"+JSON.stringify(data));
            res.status(200).json({ status: 'success', message: 'Reset password mail sent ', docs: '' })

        }
    })
}

module.exports.mailerUtil = mailerUtil;
