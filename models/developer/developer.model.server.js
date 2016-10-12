var mongoose = require("mongoose");
var q = require("q");

module.exports = function (model) {

    var DeveloperSchema = require("./developer.schema.server.js")();
    var Developer = mongoose.model("Developer", DeveloperSchema);

    var api = {
        createDeveloper: createDeveloper,
        findAllDevelopers: findAllDevelopers,
        findDeveloperByUsername: findDeveloperByUsername,
        updateDeveloper: updateDeveloper,
        deleteDeveloper: deleteDeveloper,
        findDeveloperByCredentials: findDeveloperByCredentials,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        findDeveloperById: findDeveloperById,
        searchDeveloper: searchDeveloper
    };
    return api;

    function searchDeveloper(username) {
        return Developer.find({'username': {$regex: username, $options: 'i'}});
    }

    function findUserByFacebookId(facebookId) {
        return Developer.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return Developer.findOne({'google.id': googleId});
    }

    function findDeveloperById(userId) {
        return Developer.findById(userId).populate("websites");
    }

    function findDeveloperByCredentials(credentials) {
        return Developer.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
    function deleteDeveloper (username) {
        var deferred = q.defer();
        Developer
            .remove (
                {username: username},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function updateDeveloper (username, developer) {
        var deferred = q.defer();
        delete developer._id;
        Developer
            .update (
                {username: username},
                {$set: developer},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findDeveloperByUsername (username) {
        var deferred = q.defer ();
        Developer
            .findOne (
                {username: username},
                function (err, developer) {
                    if (!err) {
                        deferred.resolve(developer);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findAllDevelopers () {
        var deferred = q.defer ();
        Developer.find (
            function (err, developers) {
                if (!err) {
                    deferred.resolve (developers);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function createDeveloper (developer) {
        var deferred = q.defer();
        Developer.create(developer, function (err, doc) {
            if (err) {
                deferred.reject (err);
            } else {
                deferred.resolve (doc);
            }
        });
        return deferred.promise;
    }
};