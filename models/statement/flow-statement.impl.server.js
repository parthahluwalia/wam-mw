module.exports = function () {
    var api = {
        execute: execute
    };
    return api;

    function execute(statement, model) {

        var operand1, operand2, operand3;
        if(statement.input[0]) {
            operand1 = model[statement.input[0].variable];
            if(typeof operand1 === 'undefined') {
                operand1 = statement.input[0].literal;
            }
        }
        if(statement.input[1]) {
            operand2 = model[statement.input[1].variable];
            if(typeof operand2 === 'undefined') {
                operand2 = statement.input[1].literal;
            }
        }
        if(statement.input[2]) {
            operand3 = model[statement.input[2].variable];
            if(typeof operand3 === 'undefined') {
                operand3 = statement.input[2].literal;
            }
        }

        switch (statement.operation) {
            case 'IF' :
                if(operand1) {
                    return operand2
                } else {
                    return operand3;
                }
                break;
        }
        return null;
    }
};
