module.exports = function (app, model) {

    app.post   ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement/:statementType", addStatement);
    app.get    ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement/:statementId", findStatement);
    app.put    ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement/:statementId", saveStatement);
    app.delete ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement/:statementId", deleteStatement);
    app.get    ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement", findAllStatements);

    var statementModel = model.statementModel;
    var scriptModel    = model.scriptModel;
    
    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllStatements(req, res) {
        statementModel
            .findAllStatements(req.params)
            .then(
                function(statements) {
                    res.json(statements);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function deleteStatement(req, res) {
        statementModel
            .deleteStatement(req.params)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function saveStatement(req, res) {
        statementModel
            .saveStatement(req.params, req.body)
            .then(
                function(statement) {
                    if(!statement._script.statements) {
                        statement._script.statements = [];
                    }
                    statement._script.statements.push(statement._id);
                    scriptModel
                        .saveScript(req.params, statement._script)
                        .then(
                            function(){
                                res.send(200);
                            },
                            function(err) {
                                res.send(400);
                            }
                        );
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    // handle http request for statement
    function findStatement(req, res) {
        scriptModel
            .findStatementById(req.params)
            .then(
                function(statement) {
                    res.json(statement);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    // handle http request to add a new statement
    function addStatement(req, res) {
        scriptModel
            .addStatement(req.params)
            .then(
                function(script) {
                    res.json(script);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }
}