﻿import Story = require('../models/story');
import Cycle = require('../models/cycle');
import RunQuery = require('./runquery');
import Guid = require('./guid');
import Q = require('q');

class StoryController {

    static getStories(): Q.Promise<Story[]> {
        return RunQuery.runQuery("SELECT (SELECT COUNT(1) FROM cycles WHERE story = stories.id) AS cyclecount, id, title, username, date, deleted FROM stories ORDER BY (SELECT MAX(date) FROM cycles WHERE cycles.story = stories.id GROUP BY story)", []).then((result) => {
            return result.rows;
        });
    };

    static getStoryById(id: string): Q.Promise<Story> {
        return RunQuery.runQuery("SELECT id, title, username, date, active, password,deleted FROM stories WHERE id = $1", [id]).then((result) => {
            return this.getCycles(id).then((cycles) => {
                var story: Story = result.rows[0];
                story.cycles = cycles;
                return story;
            });
        });
    };

    static addStory(story: Story): Q.Promise<any> {
        story.id = Guid.newGuid();
        return RunQuery.runQuery("INSERT INTO stories (id, title, username, date) VALUES ($1, $2, $3, $4)",
            [story.id, story.title, story.username, new Date()]);
    };

    static deleteStory(story: Story): Q.Promise<any> {
        return RunQuery.runQuery("UPDATE Stories SET deleted = true WHERE id = $1",
            [story.id]);
    };

    static undeleteStory(story: Story): Q.Promise<any> {
        return RunQuery.runQuery("UPDATE Stories SET deleted = false WHERE id = $1",
            [story.id]);
    };

    static finalDeleteStory(story: Story): Q.Promise<any> {
        return RunQuery.runQuery("DELETE FROM Cycles WHERE story = $1", [story.id]).then(() => {
	        return RunQuery.runQuery("DELETE FROM Stories WHERE id = $1", [story.id]);
        });
    };

    static getCycles(storyId: string): Q.Promise<Cycle[]> {
        return RunQuery.runQuery("SELECT story, index, text, username, date FROM cycles WHERE story = $1 ORDER BY index ASC", [storyId]).then((result) => {
            return result.rows;
        });
    };

    static addCycle(cycle: Cycle): Q.Promise<any> {
        return RunQuery.runQuery("INSERT INTO cycles (story, index, username, text, date) VALUES ($1, $2, $3, $4, $5)",
            [cycle.story, cycle.index, cycle.username, cycle.text, new Date()]);
    };

}

export = StoryController;