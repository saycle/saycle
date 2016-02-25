var RunQuery = require('./runquery');
var Guid = require('./guid');
var StoryController = (function () {
    function StoryController() {
    }
    StoryController.getStories = function () {
        return RunQuery.runQuery("SELECT (SELECT COUNT(1) FROM cycles WHERE story = id) AS cyclecount, id, title, username, date FROM stories ORDER BY (SELECT MAX(date) FROM cycles GROUP BY storyid WHERE storyid = stories.id)", []).then(function (result) {
            return result.rows;
        });
    };
    ;
    StoryController.getStoryById = function (id) {
        var _this = this;
        return RunQuery.runQuery("SELECT id, title, username, date, active, password FROM stories WHERE id = $1", [id]).then(function (result) {
            return _this.getCycles(id).then(function (cycles) {
                var story = result.rows[0];
                story.cycles = cycles;
                return story;
            });
        });
    };
    ;
    StoryController.addStory = function (story) {
        story.id = Guid.newGuid();
        return RunQuery.runQuery("INSERT INTO stories (id, title, username, date) VALUES ($1, $2, $3, $4)", [story.id, story.title, story.username, new Date()]);
    };
    ;
    StoryController.getCycles = function (storyId) {
        return RunQuery.runQuery("SELECT story, index, text, username, date FROM cycles WHERE story = $1 ORDER BY index ASC", [storyId]).then(function (result) {
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
//# sourceMappingURL=storycontroller.js.map