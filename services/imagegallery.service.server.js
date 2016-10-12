/**
 * Created by rushi on 6/30/16.
 */
var mongoose = require("mongoose");

module.exports = function (app, model) {

    var imageGalleryModel = model.imageGalleryModel;
    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../../data' });

    app.post   ("/api/image/:developerId", addImage);
    app.delete ("/api/image/:imageId", deleteImage);
    app.get("/api/image/:developerId",findUserImages);
    app.post("/api/imageupload", upload.single('myFile'), uploadImage);

    function addImage(req,res)
    {
        console.log("In Image Server Service");
        var developerId=req.params.developerId;
        var ImageGallery=req.body
        ImageGallery._developer=developerId;
        imageGalleryModel
            .addImage(ImageGallery)
            .then(function(image){
                
                res.json(image);
            },function(error){
                res.status(404).send(error);
            });
    }
    function deleteImage(req,res){
        var imageId=req.params.imageId;
        imageGalleryModel
            .deleteImage(imageId)
            .then(function(response){
                res.send(200);
            },function(error){
                res.status(404).send(error);
            })
    }
    function findUserImages(req,res)
    {
        var developerId=req.params.developerId;
        console.log(developerId);
        imageGalleryModel
            .findUserImages(developerId)
            .then(function(images)
                {
                    res.json(images);
                },  function(error){
                    res.status(404).send(error);
                }
            )
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

        var imageGallery = {
                _developer:developerId,
                url: "/uploads/" + filename,
                source: "upload",
            
        };
        console.log(imageGallery)
        imageGalleryModel
            .addImage(imageGallery)
            .then(function(response) {
                    console.log("In ImageGallery");

                },
                function(err) {
                    res.status(404).send(err);
                });
        res.redirect("/ide/index.html#/developer/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId+"/image");
    }

};
