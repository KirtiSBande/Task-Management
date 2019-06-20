const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'user' },
    taskName: {type :String, required : [true, 'Task name is required']},
    taskDesciption:{type :String, required : [true, 'Task description is required']},
    approvalNeeded: {type: Boolean, default: false},
    authorities: [{
        authUserId: { type: mongoose.Schema.ObjectId, ref: 'user' },
        canView: { type: Boolean },
        canApprove: { type: Boolean },
        isApproved:{ type: Boolean, default: false }
    }],
    helperDocs :[
        {
            
        }
    ],
    userInput:{
        file : [{
            reqFileName : {type : String},
            reqFileDescription : {type : String},
            isFileRequired : {type: Boolean, default: true }
        }],
        contents :[{
            reqContentName : {type : String},
            reqContentDescription : {type : String},
            isContentRequired : {type: Boolean, default: true }
        }]
    },
    status:{type :String, required : [true, 'Status is required']}
    /**
     * status : terminated =>permanantly task terminated
     * status : onHold => Temporary stopped
     * status : canStart => Task is approved but not started yet
     * status : inProgress => Task is approved and started
     * status : new => task is not approved yet 
     */
})

module.exports = mongoose.model('task', taskSchema);