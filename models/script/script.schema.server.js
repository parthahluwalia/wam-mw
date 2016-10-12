var mongoose = require("mongoose");

module.exports = function() {

    var StatementSchema = require("../statement/statement.schema.server.js")();

    var ScriptSchema = mongoose.Schema({
        _widget    : {type: mongoose.Schema.ObjectId, ref: 'Script'},
        name       :  String,
        scope      :  Object,
        statements : [{type: mongoose.Schema.ObjectId, ref: 'Statement'}]
    }, {collection: 'script'});

    return ScriptSchema;
};