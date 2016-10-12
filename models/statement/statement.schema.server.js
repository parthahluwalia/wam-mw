// statement schema will hold all the other schemas for the other types of statements, e.g., Numb
var mongoose = require("mongoose");

module.exports = function() {

    var StatementSchema = mongoose.Schema({
        _script : {type: mongoose.Schema.ObjectId, ref: 'ScriptModel'}, //AW: Changed Script to ScriptModel
        name: String,
        statementType   : {type : String, enum : ["NUMBER", "STRING", "DATE", "OBJECT", "ARRAY", "DATABASE", "BOOLEAN", "DECISION"]},
        variables: [String],
        title: String,
        databaseStatement : require("./database-statement.schema.server")(),
        numberStatement : require("./number-statement.schema.server")(),
        dateStatement   : require("./date-statement.schema.server")(),
        stringStatement   : require("./string-statement.schema.server")(),
        ifStatement: require("./if-statement.schema.server")(),
        booleanStatement: require("./boolean-statement.schema.server")()
    }, {collection: 'statement'});

    return StatementSchema;
};