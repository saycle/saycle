var RunQuery = require('./RunQuery');
var CycleController = (function () {
    function CycleController() {
    }
    CycleController.getCycles = function (storyId) {
        return RunQuery.runQuery("SELECT * FROM cycles WHERE story = $1", [storyId]).then(function (result) {
            return result.rows;
        });
    };
    ;
    CycleController.addCycle = function (cycle) {
        return RunQuery.runQuery("INSERT INTO cycles (story, index, username, text) VALUES ($1, $2, $3, $4)", [cycle.story, cycle.index, cycle.username, cycle.text]);
    };
    ;
    return CycleController;
})();
module.exports = CycleController;
//# sourceMappingURL=CycleController.js.map