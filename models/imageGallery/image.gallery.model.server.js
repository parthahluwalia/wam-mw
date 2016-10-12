/**
 * Created by rushi on 6/30/16.
 */
var mongoose = require("mongoose");
var q = require("q");

module.exports = function (model) {
    var ImageGallerySchema = require("./imagegallery.schema.server")();
    var ImageGallery = mongoose.model("ImageGallery", ImageGallerySchema);
    

    var api={
        findUserImages:findUserImages,
        addImage:addImage,
        deleteImage:deleteImage

    };
    return api;

    function findUserImages(developerId)
    {
        return ImageGallery
            .find({_developer:developerId});
    }
     function addImage(imagegallery)
     {
        
         return ImageGallery.create(imagegallery);
     }
    function deleteImage(imageId) {
        console.log(imageId);
        return  ImageGallery.remove({_id: imageId});
    }

};