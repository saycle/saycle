﻿import Story = require('../models/story');
import Cycle = require('../models/cycle');
import RunQuery = require('./runquery');
import Guid = require('./guid');
import Q = require('q');

class StoryController {

    static getStories(): Q.Promise<Story[]> {
        return RunQuery.runQuery("SELECT (SELECT COUNT(1) FROM cycles WHERE story = id) AS cyclecount, id, title, username, date FROM stories", []).then((result) => {
            return result.rows;
        });
    };

    static getStoryById(id: string): Q.Promise<Story> {
        return RunQuery.runQuery("SELECT * FROM stories WHERE id = $1", [id]).then((result) => {
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

    static getCycles(storyId: string): Q.Promise<Cycle[]> {
        return RunQuery.runQuery("SELECT * FROM cycles WHERE story = $1", [storyId]).then((result) => {
            return result.rows;
        });
    };

    static addCycle(cycle: Cycle): Q.Promise<any> {
        return RunQuery.runQuery("INSERT INTO cycles (story, index, username, text, date) VALUES ($1, $2, $3, $4, $5)",
            [cycle.story, cycle.index, cycle.username, cycle.text, new Date()]);
    };

}

export = StoryController;