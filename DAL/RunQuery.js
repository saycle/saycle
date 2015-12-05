var pg = require('pg');
var Q = require('q');
var RunQuery = (function () {
    function RunQuery() {
    }
    RunQuery.runQuery = function (query, values) {
        var deferred = Q.defer();
        pg.connect(RunQuery.conString, function (err, client, done) {
            if (err)
                deferred.reject(err);
            else
                client.query(query, values, function (err, result) {
                    //call `done()` to release the client back to the pool
                    done();
                    if (err)
                        deferred.reject(err);
                    else
                        deferred.resolve(result);
                });
        });
        return deferred.promise;
    };
    RunQuery.conString = process.env.DATABASE_URL;
    return RunQuery;
})();
module.exports = RunQuery;
//# sourceMappingURL=runquery.js.map