import Q = require('q');
import Cycle = require('../models/Cycle');
import RunQuery = require('./RunQuery');

export module DAL {
    export class CycleController {

        static getCycles(storyId: string): Q.Promise<Cycle[]> {
            return RunQuery.runQuery("SELECT * FROM cycles WHERE story = $1", [storyId]);
        };

        static addCycle(cycle: Cycle): Q.Promise<any> {
            return RunQuery.runQuery("INSERT INTO cycles (story, index, username, text) VALUES ($1, $2, $3, $4)",
                [cycle.story, cycle.index, cycle.username, cycle.text]);
        };

    }
}