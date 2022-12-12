var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    provider:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    profile_picture:{
        type: String,
        required: false
    },
    menu:{
        sections:[{
            menu_id:{
                type: String,
                required: true
            },
            items:[{
                title:{
                    type: String,

                },
                description:{
                    type: String,

                },
                price:{
                    type: String,

                },
            }]

        }],
    },
    menu_saved:{
        type: String,
    }
});


module.exports = mongoose.model('Account',AccountSchema);
