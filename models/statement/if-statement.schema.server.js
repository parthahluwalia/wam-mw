/**
 * Created by Swapnil on 6/23/2016.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var IfStatementSchema = mongoose.Schema({
        comparator : {type : String, enum : ['Equal to','Greater than','Greater than or equal', 'Less than', 'Less than or equal']},
        leftOperand        :String,
        rightOperand        :String,
        then: String,
        else: String,
    });

    return IfStatementSchema;
};