var mongoose = require("mongoose");

module.exports = function () {

    var DataTableSchema = mongoose.Schema({
        collectionName :  String,
        fields         : [String],
        sortable       :  Boolean,
        filterable     :  Boolean,
        paginable      :  Boolean,
        pageRows       :  Number,
        deletable      :  Boolean // added deletable 
    });

    return DataTableSchema;
};