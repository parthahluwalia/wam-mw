/**
 * Created by rushi on 6/30/16.
 */
var mongoose = require("mongoose");

module.exports = function () {
    var ImageGallerySchema = mongoose.Schema({
        _developer: {type: mongoose.Schema.Types.ObjectId, ref: 'Developer'},
        url:String,
        source:String,
        name:String
    },{collection: "imageGallery"});
    return ImageGallerySchema;
};