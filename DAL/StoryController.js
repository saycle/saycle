var RunQuery = require('./RunQuery');
var StoryController = (function () {
    function StoryController() {
    }
    StoryController.getStories = function () {
        return RunQuery.runQuery("SELECT * FROM stories", []).then(function (result) {
            return result.rows;
        });
    };
    ;
    StoryController.getStoryById = function (id) {
        return RunQuery.runQuery("SELECT * FROM stories WHERE id = $1", [id]);
    };
    ;
    StoryController.addStory = function (story) {
        return RunQuery.runQuery("INSERT INTO stories (id, title, username) VALUES ($1, $2, $3)", [story.id, story.title, story.username]);
    };
    ;
    return StoryController;
})();
module.exports = StoryController;
//# sourceMappingURL=StoryController.js.map