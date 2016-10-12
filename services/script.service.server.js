module.exports = function (app, model) {

    app.post   ("/api/website/:websiteId/page/:pageId/widget/:widgetId/script", saveScript);
    app.get    ("/api/website/:websiteId/page/:pageId/widget/:widgetId/script", findScript);
    app.post   ("/api/script/:scriptId/run", runScript);

    app.post   ("/api/website/:websiteId/page/:pageId/widget/:widgetId/script/statement/:statementType", addStatement);
    app.get    ("/api/website/:websiteId/page/:pageId/widget/:widgetId/script/statement/:statementId", findStatement);
    app.put    ("/api/website/:websiteId/page/:pageId/widget/:widgetId/script/statement/:statementId", updateStatement);
    app.delete ("/api/website/:websiteId/page/:pageId/widget/:widgetId/script/statement/:statementId", deleteStatement);

    var scriptModel = model.scriptModel;

    function deleteStatement(req, res) {
        scriptModel
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

    function updateStatement(req, res) {
        scriptModel
            .updateStatement(req.params, req.body)
            .then(
                function(statement) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    // handle http request for statement
    function findStatement(req, res) {
        scriptModel
            .findStatement(req.params)
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

    function findScript(req, res) {
        scriptModel
            .findScript(req.params)
            .then(
                function(script) {
                    res.json(script);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function saveScript(req, res) {

        // path parameters
        var websiteId = req.params.websiteId;
        var pageId        = req.params.pageId;
        var widgetId      = req.params.widgetId;

        // body data
        var script        = req.body;

        scriptModel
            .saveScript(req.params, script)
            .then(
                function(script) {
                    res.json(script);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }



    function runScript(req, res){
        var scriptId = req.params.scriptId;
        var scriptObj = req.body;

        //var scriptObj = {"+":[1,2], "-":[4,3]};
        var resultObj = {};

        Object.keys(scriptObj).forEach(function(key) {
            resultObj[key] = getResult(key,scriptObj[key][0],scriptObj[key][1])
        });
        return res.json(resultObj);

    }

    function getResult(operation,a,b){
       if (operation == "+"){
           return a + b;
       }
       else if(operation == "-"){
           return a - b;
       }
       else
           return a * b;

    }
}