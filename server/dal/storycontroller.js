"use strict";
var RunQuery = require('./runquery');
var Guid = require('./guid');
var StoryController = (function () {
    function StoryController() {
    }
    StoryController.getStories = function (username) {
        return RunQuery.runQuery("SELECT (SELECT COUNT(1) FROM cycles WHERE story = stories.id) AS cyclecount, " +
            "id, title, username, date, (SELECT MAX(date) FROM cycles WHERE cycles.story = stories.id) modified, deleted, " +
            "(SELECT MAX(date) FROM cycles WHERE cycles.story = stories.id) modified, " +
            "(CASE WHEN $1 <> '' AND EXISTS(SELECT 1 FROM cycles WHERE stories.id = cycles.story AND stories.username = $2) THEN " +
            "True " +
            "ELSE " +
            "False " +
            "END) usercontributed " +
            "FROM stories " +
            "ORDER BY " +
            "CASE WHEN stories.id = '495ded94-c4d4-454e-ad7e-0dd1df90fd70' THEN " +
            "NULL " +
            "ELSE " +
            "(SELECT MAX(date) FROM cycles WHERE cycles.story = stories.id) " +
            "END DESC;", [username, username]).then(function (result) {
            return result.rows;
        }, function (error) {
            error;
        });
    };
    ;
    StoryController.getStoryById = function (id) {
        var _this = this;
        return RunQuery.runQuery("SELECT id, title, username, date, active, password,deleted FROM stories WHERE id = $1", [id]).then(function (result) {
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
    StoryController.deleteStory = function (story) {
        return RunQuery.runQuery("UPDATE Stories SET deleted = true WHERE id = $1", [story.id]);
    };
    ;
    StoryController.undeleteStory = function (story) {
        return RunQuery.runQuery("UPDATE Stories SET deleted = false WHERE id = $1", [story.id]);
    };
    ;
    StoryController.finalDeleteStory = function (story) {
        return RunQuery.runQuery("DELETE FROM Cycles WHERE story = $1", [story.id]).then(function () {
            return RunQuery.runQuery("DELETE FROM Stories WHERE id = $1", [story.id]);
        });
    };
    ;
    StoryController.getCycles = function (storyId) {
        return RunQuery.runQuery("SELECT story, index, text, username, date FROM cycles WHERE story = $1 ORDER BY index ASC", [storyId]).then(function (result) {
            return result.rows;
        });
    };
    ;
    StoryController.addCycle = function (cycle) {
        return RunQuery.runQuery("INSERT INTO cycles (story, username, text, date, index) " +
            "VALUES ($1, $2, $3, $4, " +
            "(SELECT CASE WHEN (SELECT COUNT(*) FROM cycles WHERE story = $1) > 0 THEN " +
            "(SELECT MAX(index) + 1 FROM cycles WHERE story = $1) " +
            "ELSE " +
            "0 " +
            "END))", [cycle.story, cycle.username, cycle.text, new Date()]);
    };
    ;
    StoryController.changeCycle = function (cycle) {
        return RunQuery.runQuery("UPDATE cycles SET text = $1 WHERE story = $2 AND index = $3", [cycle.text, cycle.story, cycle.index]);
    };
    ;
    StoryController.deleteCycle = function (cycle) {
        return RunQuery.runQuery("DELETE FROM cycles WHERE story = $1 AND index = $2", [cycle.story, cycle.index]);
    };
    ;
    return StoryController;
}());
module.exports = StoryController;
//# sourceMappingURL=storycontroller.js.map