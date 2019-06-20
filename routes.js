var express = require('express');
var router = express.Router();
var auth = require('./controllers/authentication.js');
var task = require('./controllers/taskController.js');
var multer = require('multer');

const storage = multer.diskStorage({
    destination : './public/upload/',
    filename: function (req, file, cb){
     
        cb(null,file.originalname);
    }
})


const upload = multer({
    storage : storage,

});
/*******************authentication module********************************/
router.post('/register', auth.registerUser);
router.post('/login', auth.login);
router.post('/forgotpassword', auth.forgotPassword);

/*******************task module********************************/
router.post('/createtask/:userId', upload.array('helperDocs',10),task.createTask)


module.exports = router;