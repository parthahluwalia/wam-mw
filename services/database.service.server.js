var mongojs = require("mongojs");

module.exports = function(app, model) {

    var db = model.mongo;
    
    // listen for incoming insert database commands
    app.post("/api/database/:username/:websitename/:pageName", insert);
    app.get ("/api/database/:username/:websitename/:pageName", select);
    app.delete("/api/database/:username/:websitename/:pageName/:recordId", remove);

    // handle HTTP delete request
    function remove(req, res) {
        var username = req.params.username;
        var websitename = req.params.websitename;
        var pageName = req.params.pageName;
        var recordId = req.params.recordId;

        var collectionName = username+"_"+websitename+"_"+pageName;
        collectionName = collectionName.replace(/ /g, '_');
        var collection = db.collection(collectionName);
        
        // remove record by ID
        collection.remove({"_id": mongojs.ObjectId(recordId)},
            function(err, docs){
                if(!err) {
                    res.send(200);
                } else {
                    res.status(400).send(err);
                }
            });
    }

    // web service endpoint to retrieve datatable data from collection
    // used page as collection name
    function select(req, res) {
        var username = req.params.username;
        var websitename = req.params.websitename;
        var pageName = req.params.pageName;
        var collectionName = username+"_"+websitename+"_"+pageName;
        collectionName = collectionName.replace(/ /g, '_');
        var collection = db.collection(collectionName);
        collection.find(function(err, docs){
            if(!err) {
                res.json(docs);
            } else {
                res.status(400).send(err);
            }
        });
    }

    function insert(req, res) {
        
        // data document is in body
        var fields = req.body;
        var callbackUrl = fields["callback-url"];
        fields.created = Date.now;
        
        // use page name as name of collection
        var username = req.params.username;
        var websitename = req.params.websitename;
        var pageName = req.params.pageName;
        var collectionName = username+"_"+websitename+"_"+pageName;
        collectionName = collectionName.replace(/ /g, '_');
        var collection = db.collection(collectionName);
        
        // insert document into collection
        collection.insert(
            fields,
            function (err, doc) {
                if(!err) {
                    if(callbackUrl) {
                        res.redirect(callbackUrl);
                    } else {
                        res.json(doc);
                    }
                } else {
                    res.status(400).send(err);
                }
            }
        );
    }
};
