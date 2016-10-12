var mongoose = require("mongoose");

module.exports = function () {

    // var PageSchema = require("../page/page.schema.server.js")();

    var WebsiteSchema = mongoose.Schema({
        _developer: {type: mongoose.Schema.Types.ObjectId, ref: 'Developer'},
        developerUsername: String,
        name: {type: String, default: "Website Name"},
        description: String,
        dateCreated: {type: Date, default: Date.now},
        dateModified: {type: Date, default: Date.now},
        // pages: [PageSchema]
        pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }]
    }, {collection: "website"});

    return WebsiteSchema;
};
