var mongoose = require("mongoose");

module.exports = function () {

    var ImageSchema = mongoose.Schema({
        image_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'ImageGallery',default: null},
        url   : String,
        width : String,
        height: String

    });

    return ImageSchema;
};