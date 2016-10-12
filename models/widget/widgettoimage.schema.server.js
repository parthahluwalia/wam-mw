/**
 * Created by rushi on 6/25/16.
 */
var mongoose = require("mongoose");

module.exports = function () {

    var ImagetoWidgetSchema = mongoose.Schema({
        url   : String,
        width : String,
        height: String,

    });

    return ImagetoWidgetSchema;
};