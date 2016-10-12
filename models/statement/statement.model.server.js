module.exports = function(models) {

    var mongoose = require("mongoose");
    var StatementSchema = require("./statement.schema.server.js")();
    var Statement       = mongoose.model("Statement", StatementSchema);
    var scriptModel     = models.scriptModel;

    var api = {
        saveStatement: saveStatement,
        findAllStatements:findAllStatements,
        deleteStatement: deleteStatement
    };
    return api;
    
    function findAllStatements(scope){
        var scriptId = scope.scriptId;
        return Statement
            .find({_script:scriptId})
            .then(
                function(statements){
                    return statements;
                },
                function(err){
                    console.log(err);
                }
            );
    }

    function deleteStatement(scope) {
        return Statement
            .remove(
                {
                    _id: scope.statementId
                }
            );
    }

    function findAllStatements(scope){
        var scriptId = scope.scriptId;
        return Statement
            .find({_script:scriptId})
            .then(
                function(statements){
                    return statements;
                },
                function(err){
                    console.log(err);
                }
            );
    }

    function findAllStatements(scope){
        var scriptId = scope.scriptId;
        return Statement
            .find({_script:scriptId})
            .then(
                function(statements){
                    return statements;
                },
                function(err){
                    console.log(err);
                }
            );
    }

    function deleteStatement(scope) {
        return Statement
            .remove(
                {
                    _id: scope.statementId
                }
            );
    }

    function findAllStatements(scope){
        var scriptId = scope.scriptId;
        return Statement
            .find({_script:scriptId})
            .then(
                function(statements){
                    return statements;
                },
                function(err){
                    console.log(err);
                }
            );
    }

    function deleteStatement(scope) {
        return Statement
            .remove(
                {
                    _id: scope.statementId
                }
            );
    }

    function findAllStatements(scope){
        var scriptId = scope.scriptId;
        return Statement
            .find({_script:scriptId})
            .then(
                function(statements){
                    return statements;
                },
                function(err){
                    console.log(err);
                }
            );
    }

    function saveStatement(scope, statement) {
        statement._script = scope.scriptId;

            if(scope.statementId === 'new') {
                return Statement
                    .create(statement)
                    .then(
                        function(statement) {
                            return statement
                                .populate('_script');
                        },
                        function(err){
                            console.log(err);
                        }
                    );
            } else {
                return Statement
                    .findByIdAndUpdate(statement._id, statement)
                    .populate('_script');
            }
        }
};