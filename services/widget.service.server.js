module.exports = function (app, model) {

    var websiteModel = model.websiteModel;
    var widgetModel = model.widgetModel;

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../../data' });

    app.post ("/api/website/:websiteId/page/:pageId/widget", createWidget);
    app.get  ("/api/website/:websiteId/page/:pageId/widget", findWidgetsForPage);
    app.get  ("/api/website/:websiteId/widget", findWidgetsForWebsite);
    app.get  ("/api/widget", findAllWidgets);
    app.get  ("/api/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
    app.put  ("/api/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
    app.delete("/api/website/:websiteId/page/:pageId/widget/:widgetId", removeWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put    ("/api/website/:websiteId/page/:pageId/widget", updateWidgets);
    app.get   ("/api/widget/:widgetId/page", findPagesFromWidgetId);
    app.get("/api/widget/images/:imageId",deleteUserImages);
   //app.get ("/api/upload", upload.single('myFile'), uploadImage);


    function findUserImages(req,res)
    {
        var userId=req.params.userId;
        widgetModel
            .findUserImages(userId)
            .then(function(images)
                {
                    res.json(images);
                },  function(error){
                    res.status(404).send(error);
                }
            )
    }
    function findAllWidgets(req, res) {
        widgetModel
            .findAllWidgets()
            .then(
                function(widgets) {
                    console.log(widgets);
                    res.json(widgets);

                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function findPagesFromWidgetId(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findPagesFromWidgetId(widgetId)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateWidgets(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if (startIndex && endIndex) {
            widgetModel
                .sortWidget(websiteId, pageId, startIndex, endIndex)
                .then(
                    function (stat) {
                        return res.json(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function uploadImage(req, res) {
        console.log("In Api Upload")
    //    var username      = req.user.username;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var developerId   = req.body.developerId;
        var destination   = myFile.destination;
        var path          = myFile.path;
        var originalname  = myFile.originalname;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var filename      = myFile.filename;

        var widget = {
            image:{
                url: "/uploads/" + filename,
                width: width
            }
        };
                    widgetModel
                        .updateWidget(websiteId, pageId, widgetId, widget)
                        .then(function(response) {
                            console.log("In widget");

                            },
                            function(err) {
                                res.status(404).send(err);
                            });
        res.redirect("/ide/index.html#/developer/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                }



    function removeWidget(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;
        widgetModel
            .removeWidget(websiteId, pageId, widgetId)
            .then(
                function(response) {
                    res.send(200);
                },
                function(err) {
                    res.status(404).send(err);
                }
            );
    }

    function updateWidget(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(websiteId, pageId, widgetId, widget)
            .then(
                function(response) {
                   // console.log(response);
                    res.json(response);
                },
                function(err) {
                    res.status(404).send(err);
                }
            );


    }

    function findWidgetById(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(err) {
                    res.status(404).send(err);
                }
            );

        // websiteModel
        //     .findWebsiteById(websiteId)
        //     .then(
        //         function(website) {
        //             res.json(website.pages.id(pageId).widgets.id(widgetId));
        //         },
        //         function(err) {
        //             res.status(400).send(err);
        //         }
        //     );
    }

    function findWidgetsForPage(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        widgetModel
            .findWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.json(widgets);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findWidgetsForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        widgetModel
            .findNamedWidgetsForWebsite(websiteId)
            .then(
                function(widgets) {
                    res.json(widgets);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createWidget(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        var widgetType = req.query.widgetType;
        var devloperId=req.query.developerId;
        widgetModel
            .createWidget(devloperId,websiteId, pageId, widgetType)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }
    function deleteUserImages(req,res){
        var  imageId=req.params.imageId;
        widgetModel
            .deleteUserImages(imageId)
            .then(function(response){
                //console.log(widget)
             res.send(200)
            },function (err){
                res.status(400).send(err)
            });
    }
}