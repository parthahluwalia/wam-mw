var mongoose = require("mongoose");

module.exports = function () {

    var HeaderSchema    = require("./header.schema.server.js")();
    var TextInputSchema = require("./text-input.schema.server.js")();
    var LinkSchema      = require("./link.schema.server.js")();
    var ButtonSchema    = require("./button.schema.server.js")();
    var RepeaterSchema  = require("./repeater.schema.server.js")();
    var DataTableSchema = require("./data-table.schema.server.js")();
    var YouTubeSchema   = require("./you-tube.schema.server.js")();
    var ImageSchema     = require("./image.schema.server.js")();
    var HtmlSchema      = require("./html.schema.server.js")();

    var WidgetSchema = mongoose.Schema({
        _developer: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer' },
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
        _website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
        widgetType: {type: String, enum: ["HTML", "HEADER", "LABEL", "TEXT",
            "LINK", "BUTTON", "IMAGE", "YOUTUBE","DATATABLE", "REPEATER"]},
        name      : String,
        title     : String,
        text      : String,
        url       : String,
        html      : HtmlSchema,
        link      : LinkSchema,
        image     : ImageSchema,
        youTube   : YouTubeSchema,
        header    : HeaderSchema,
        datatable : DataTableSchema,
        repeater  : RepeaterSchema,
        button    : ButtonSchema,
        textInput : TextInputSchema,
        placeholder : String,
        rows      : Number,
        bootClass : {type: String, default: 'col-xs-12'},
        formatted : Boolean,
        order     : { type: Number, default: 0 }
    });

    return WidgetSchema;
};