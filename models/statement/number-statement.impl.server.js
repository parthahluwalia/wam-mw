module.exports = function () {
    var api = {
        execute: execute
    };
    return api;

    function execute(statement, model) {

//      console.log(statement, model);
        var operand1, operand2;
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

        switch (statement.operation) {
            case 'VARIABLE' :
                model[statement.output] = operand1;
                break;
            case 'ADDITION' :
                model[statement.output] = operand1 + operand2;
                break;
            case 'SUBTRACTION' :
                model[statement.output] = operand1 - operand2;
                break;
            case 'MULTIPLICATION' :
                model[statement.output] = operand1 * operand2;
                break;
            case 'DIVISION' :
                model[statement.output] = operand1 / operand2;
                break;
            case 'GREATER_THAN' :
                model[statement.output] = operand1 > operand2;
                break;
        }
        return null;
    }
};
