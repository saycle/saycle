import Story = require('../models/Story');
import RunQuery = require('./RunQuery');
import Q = require('q');

class StoryController {

    static getStories(): Q.Promise<Story[]> {
        return RunQuery.runQuery("SELECT * FROM stories", []);
    };

    static getStoryById(id: string): Q.Promise<Story> {
        return RunQuery.runQuery("SELECT * FROM stories WHERE id = $1", [id]);
    };

    static addStory(story: Story): Q.Promise<any> {
        return RunQuery.runQuery("INSERT INTO stories (id, title, username) VALUES ($1, $2, $3)",
            [story.id, story.title, story.username]);
    };

}

export = StoryController;