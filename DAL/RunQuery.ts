import pg = require('pg');
import Q = require('q');

class RunQuery {

    static conString: string = process.env.DATABASE_URL;

    static runQuery(query: string, values: any[]): Q.Promise<any> {

        var deferred = Q.defer();

        pg.connect(RunQuery.conString, function (err, client, done) {
            if (err)
                throw err;

            client.query(query, values, function (err, result) {
                //call `done()` to release the client back to the pool
                done();

                if (err)
                    throw err;

                deferred.resolve(result);

            });

        });

        return deferred.promise;
    }
}

export = RunQuery;