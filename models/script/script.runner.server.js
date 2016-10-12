module.exports = function() {
    var runners = {
        'NUMBER': require('../statement/number-statement.impl.server')(),
        'STRING': require('../statement/string-statement.impl.server')(),
        'CONSOLE': require('../statement/console-statement.impl.server')(),
        'FLOW': require('../statement/flow-statement.impl.server')()
    };

    var api = {
        run: run
    };
    return api;

    function run(script, model) {
        var statements = script.statements;
        // create label to index map
        var label2indexMap = {};
        for (var index=0; index<statements.length; index++) {
            var statement = statements[index];
            if (statement.label) {
                label2indexMap[statement.label] = index;
            }
        }
        // execute
        var index = 0;
        do {
            var statement = statements[index];
            var runner = runners[statement.type];
            var nextLabel = runner.execute(statement, model);
            if(nextLabel) {
                index = label2indexMap[nextLabel];
            } else {
                index++;
            }
        } while(index < statements.length);
    }
};
