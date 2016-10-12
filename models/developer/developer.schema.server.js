var mongoose = require("mongoose");

module.exports = function () {
    var DeveloperSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}]
    }, {collection: 'developer'});
    return DeveloperSchema;
};
