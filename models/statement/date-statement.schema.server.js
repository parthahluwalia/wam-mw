var mongoose = require("mongoose");

module.exports = function() {

    var DateStatementSchema = mongoose.Schema({
        dateOperation : {
            label: {type : String, enum : ["Add", "Subtract", "Create Date from String", "Create Date from milliseconds",
                "Create Date from selecting in calendar", "Create Date by providing each parameter"]}
        },
        dateOperand1         : String,
        pickedDate1          : String,
        operand1MilliSeconds : String,
        operand1Seconds      : String,
        operand1Minutes      : String,
        operand1Hours        : String,
        operand1Date         : String,
        operand1Month        : String,
        operand1Year         : String,
        operand2Seconds      : String,
        operand2Minutes      : String,
        operand2Hours        : String,
        operand2Date         : String,
        operand2Month        : String,
        operand2Year         : String,
        resultDateOperation  : String
    });

    return DateStatementSchema;
};
