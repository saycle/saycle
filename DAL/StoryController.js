var RunQuery = require('./RunQuery');
var StoryController = (function () {
    function StoryController() {
    }
    StoryController.getStories = function () {
        return RunQuery.runQuery("SELECT (SELECT COUNT(1) FROM cycles WHERE story = id) AS cyclecount, id, title, username, date FROM stories", []).then(function (result) {
            return result.rows;
        });
    };
    ;
    StoryController.getStoryById = function (id) {
        var _this = this;
        return RunQuery.runQuery("SELECT * FROM stories WHERE id = $1", [id]).then(function (result) {
            return _this.getCycles(id).then(function (cycles) {
                var story = result.rows[0];
                story.cycles = cycles;
                return story;
            });
        });
    };
    ;
    StoryController.addStory = function (story) {
        return RunQuery.runQuery("INSERT INTO stories (id, title, username) VALUES ($1, $2, $3)", [story.id, story.title, story.username]);
    };
    ;
    StoryController.getCycles = function (storyId) {
        return RunQuery.runQuery("SELECT * FROM cycles WHERE story = $1", [storyId]).then(function (result) {
            return result.rows;
        });
    };
    ;
    StoryController.addCycle = function (cycle) {
        return RunQuery.runQuery("INSERT INTO cycles (story, index, username, text, date) VALUES ($1, $2, $3, $4, $5)", [cycle.story, cycle.index, cycle.username, cycle.text, new Date()]);
    };
    ;
    return StoryController;
})();
module.exports = StoryController;
//# sourceMappingURL=StoryController.js.map