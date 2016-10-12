module.exports = function () {
    var api = {
        execute: execute
    };
    return api;

    function execute(statement, model) {
        switch (statement.operation) {
            case 'VARIABLE' :
                break;
            case 'CONCATENATE' :
                var operand1 = model[statement.input[0].variable];
                if(!operand1) {
                    var operand1 = statement.input[0].literal;
                }
                var operand2 = model[statement.input[1].variable];
                if(!operand2) {
                    var operand2 = statement.input[1].literal;
                }
                model[statement.output] = operand1 + operand2;
                break;
            case 'SUBSTRING' :
                break;
            case 'LENGTH' :
                break;
        }
        return null;
    }
};
