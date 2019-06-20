var userModel = require('../models/userModel')
var utility = require('../utilities/utility');
var config = require('../config/config');
var mailerUtility = require('../utilities/mailerUtility');


var authentication = {
    registerUser: function (req, res) {
        var user = new userModel();

        userModel.findOne({ email: req.body.email }, function (error, data) {
            if (error) {
                res.status(500).json({ status: 'error', message: 'Something went wrong' + error, docs: ' ' });
            } else if (data === null) {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.password = req.body.password;
                user.userType = req.body.userType;
                userModel.create(user, function (err, newUser) {
                    if (error) {
                        res.status(500).json({ status: 'error', message: 'Something went wrong' + error, docs: ' ' });
                    } else {
                        res.status(200).json({ status: 'success', message: 'User is registered successfully', docs: newUser })
                    }
                });
            } else {
                res.status(409).json({ status: 'duplicate', message: 'Email is already registerd ', docs: '' });
            }
        });
    },

    login: function (req, res) {
        console.log("******", req.body)
        var email = req.body.email;
        var password = req.body.password;
        if (email == '' || password == '') {
            res.status(401).json({
                status: 'error',
                message: "Enter email and password"
            });
            return;
        }
        console.log("dsadadddddddddd*********");
        
        userModel.findOne({ email: req.body.email, password: req.body.password }, function (error, loginData) {
            console.log(loginData);
            console.log(error)
            if (error) {
                res.status(500).json({ status: 'error', message: 'Something went wrong' + error, docs: ' ' });
            } else if (loginData) {
                console.log(loginData);
                var playLoad = {
                    _id: loginData._id,
                    firstName: loginData.firstName,
                    lastName: loginData.lastName,
                    email: loginData.email
                }
                var tokenData = utility.genAccessToken(playLoad);
                if (tokenData.success) {
                    var responseLoginData = {
                        userData: loginData,
                        authData: tokenData
                    }
                    console.log("responseLoginData====>", responseLoginData)
                    res.status(200).json({ status: 'success', message: 'User is logged in successfully', docs: responseLoginData })
                } else {
                    res.status(500).json({ status: 'error', message: 'Something went wrong' + error, docs: ' ' });
                }
            }else{
                console.log("********************no data")
                res.status(401).json({ status: 'error', message: 'Invalid username or password.' + error, docs: ' ' });             
            }

        });
    },

    forgotPassword: function(req, res) {
        console.log("forgot password email*****",req.body.email);
        userModel.findOne({ email: req.body.email}, function (error, userData) {
            if (error) {
                res.status(500).json({ status: 'error', message: 'Something went wrong' + error, docs: ' ' });
            } else if (userData) {
                let mailOptions = {
                    to: req.body.email, 
                    subject: config.emailConfig.forgotPassword.subject, 
                    templateFile: config.emailConfig.forgotPassword.htmlFile,
                    templateData:{
                        resetPwdUrl:config.emailConfig.forgotPassword.webUrl+'/auth/reset-password/id='+userData._id
                    }
                  };
                  console.log("mailOptions************* ",mailOptions)
                mailerUtility.mailerUtil(mailOptions,res);
            }
            
        });
        
    },

}

module.exports = authentication;