var mongoose = require("mongoose");

module.exports = function(model) {

    // var Website = websiteModel.getMongooseModel();
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgets: findAllWidgets,
        findWidgetsForPage: findWidgetsForPage,
        findWidgetsForWebsite: findWidgetsForWebsite,
        findNamedWidgetsForWebsite: findNamedWidgetsForWebsite,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        removeWidget: removeWidget,
        sortWidget  : sortWidget,
       // findUserImages:findUserImages,
        deleteUserImages:deleteUserImages
    };
    return api;
    function deleteUserImages(imageId)
    {
      //  console.log("In delete User Images");
       // console.log(imageId);
        return Widget
           .update({'image.image_Id':imageId},{'image.image_Id':null,'image.url':"http:tpfg"}, {multi: true});

    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function findWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetsForWebsite(websiteId) {
        return Widget
            .find({_website: websiteId})
            .populate("_page");
    }

    function findNamedWidgetsForWebsite(websiteId) {
        return Widget
            .find({_website: websiteId, name: {$ne: null}})
            .populate("_page");
    }

    function findAllWidgets() {
        return Widget
            .find()
            .populate("_page _website");
    }

    function sortWidget(websiteId, pageId, startIndex, endIndex) {
        startIndex = parseInt(startIndex);
        endIndex = parseInt(endIndex);
        return Widget
            .find()
            .then(
                function(widgets) {
                    widgets
                        .forEach(
                            function(widget){
                                if(startIndex < endIndex) {
                                    if(widget.order < startIndex) {

                                    } else if(widget.order === startIndex) {
                                        widget.order = endIndex;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > startIndex && widget.order <= endIndex) {
                                        widget.order--;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > endIndex) {

                                    }
                                } else {
                                    if(widget.order < endIndex) {

                                    } else if(widget.order === startIndex) {
                                        widget.order = endIndex;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order < startIndex && widget.order >= endIndex) {
                                        widget.order++;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > startIndex) {

                                    }
                                }
                            }
                        );
                },
                function(err) {

                }
            );

        // return Website
        //     .findById(websiteId)
        //     .then(
        //         function(website) {
        //             website.pages.id(pageId).widgets.splice(endIndex, 0, website.pages.id(pageId).widgets.splice(startIndex, 1)[0]);
        //
        //             // notify mongoose 'pages' field changed
        //             website.markModified("pages");
        //
        //             website.save();
        //         }
        //     );
    }

    function removeWidget(websiteId, pageId, widgetId, newWidget) {
        return Widget.findById(widgetId).remove();
        // return Website
        //     .findById(websiteId)
        //     .then(
        //         function(website) {
        //             website.pages.id(pageId).widgets.remove(widgetId);
        //             return website.save();
        //         }
        //     );
    }

    function updateWidget(websiteId, pageId, widgetId, newWidget) {
        delete newWidget._id;
        return Widget
            .findById(widgetId)
            .then(
                function(widget) {
                    // var widget = website.pages.id(pageId).widgets.id(widgetId);

                    widget.bootClass = newWidget.bootClass;
                    widget.name = newWidget.name;
                    widget.text = newWidget.text;
                    if(widget.widgetType === "HEADER") {
                        if(newWidget.header) {
                            widget.header = newWidget.header;
                        }
                    } else if(widget.widgetType === "HTML") {
                        if(newWidget.html) {
                            widget.html = {
                                text: newWidget.html.text
                            };
                        }
                    } else if(widget.widgetType === "IMAGE") {
                        if(newWidget.image) {
                            widget.image = {
                                image_Id:newWidget.image.image_Id,
                                url   : newWidget.image.url,
                                width : newWidget.image.width
                            };
                        }
                    } else if(widget.widgetType === "YOUTUBE") {
                        if(newWidget.youTube) {
                            widget.youTube = {
                                url   : newWidget.youTube.url,
                                width : newWidget.youTube.width
                            };
                        }
                    } else if(widget.widgetType === "TEXT") {
                        if(!widget.textInput) {
                            widget.textInput = {};
                        }
                        if(newWidget.textInput) {
                            widget.textInput.placeholder = newWidget.textInput.placeholder;
                            widget.textInput.rows = newWidget.textInput.rows;
                            widget.textInput.formatted = newWidget.textInput.formatted;
                        }
                    } else if(widget.widgetType === "DATATABLE") {
                        widget.datatable = {
                            // save deletable in database
                            deletable: newWidget.datatable.deletable,
                            paginable: newWidget.datatable.paginable,
                            pageRows: newWidget.datatable.pageRows,
                            sortable: newWidget.datatable.sortable,
                            filterable: newWidget.datatable.filterable
                        };
                        // save datatable widget to database
                        if(newWidget.datatable.collection && newWidget.datatable.collection.name) {
                            widget.datatable.collectionName = newWidget.datatable.collection.name;
                        }
                        if(newWidget.datatable.fields) {
                            // split field names into array
                            if(typeof newWidget.datatable.fields === "string") {
                                widget.datatable.fields = newWidget.datatable.fields.split(",");
                            } else if(newWidget.datatable.fields.length > 0) {
                                if(newWidget.datatable.fields[0].indexOf(",") > -1) {
                                    widget.datatable.fields = newWidget.datatable.fields[0].split(",");
                                } else {
                                    widget.datatable.fields = newWidget.datatable.fields;
                                }
                            }
                        } else {
                            widget.datatable.fields = [];
                        }
                    } else if(widget.widgetType === "REPEATER") {

                        // save REPEATER widget to database
                        // same as DATATABLE with the added property 'template'
                        widget.repeater = {
                            // save deletable in database
                            deletable: newWidget.repeater.deletable
                        };
                        widget.repeater.template = newWidget.repeater.template;
                        if(newWidget.repeater.collection && newWidget.repeater.collection.name) {
                            widget.repeater.collectionName = newWidget.repeater.collection.name;
                        }
                        if(newWidget.repeater.fields) {
                            // split field names into array
                            if(typeof newWidget.repeater.fields === "string") {
                                widget.repeater.fields = newWidget.repeater.fields.split(",");
                            } else if(newWidget.repeater.fields.length > 0) {
                                if(newWidget.repeater.fields[0].indexOf(",") > -1) {
                                    widget.repeater.fields = newWidget.repeater.fields[0].split(",");
                                } else {
                                    widget.repeater.fields = newWidget.repeater.fields;
                                }
                            }
                        } else {
                            widget.repeater.fields = [];
                        }
                    } else if(widget.widgetType === "LINK") {
                        if(newWidget.link) {
                            widget.link = {
                                url    : newWidget.link.url,
                                target : newWidget.link.target
                            };
                        }
                    } else if(widget.widgetType === "BUTTON") {
                        if(newWidget.button) {
                            widget.button = {
                                style: newWidget.button.style,
                                dbCommand: newWidget.button.dbCommand
                            };
                            // widget.button.style     = newWidget.button.style;
                            
                            // save database command for when button is clicked
                            // widget.button.dbCommand = newWidget.button.dbCommand;
                            // save page id button navigates to
                            if(newWidget.button.navigate) {
                                widget.button.navigate = newWidget.button.navigate._id;
                            }
                        }
                    }
                    return widget.save();
                }
            );
    }

    function createWidget(developerId,websiteId, pageId, widgetType) {

        return Widget
            .findOne({_page: pageId})
            .sort('-order')
            .then(
                function(lastWidget) {
                    var widget = new Widget();
                    widget.widgetType = widgetType;
                    widget._page = pageId;
                    widget._website = websiteId;
                    widget._developer=developerId;
                    if(lastWidget) {
                        widget.order = ++lastWidget.order;
                    }
                    return Widget.create(widget);
                },
                function(error) {
                    console.log(error);
                }
            );

        // return Website.findById(websiteId)
        //     .then(
        //         function(website) {
        //
        //             var widget = {
        //                 widgetType: widgetType
        //             };
        //
        //             website.pages.id(pageId).widgets.push(widget);
        //
        //             return website.save();
        //         }
        //     );
    }
}