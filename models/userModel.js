const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({

    // _id  : mongoose.Schema.Types.ObjectId,
    firstName: String, // users first name
    lastName: {type: String, default : ' '},
    email  : {
        type  : String,
        required : [true, 'Email is required']
    },
    password  : {
        type  : String,
        required  : [true, 'password is required']

    },
    userType:{type: String, default : 'user'}
});

module.exports = mongoose.model('user', userSchema);