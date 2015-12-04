import Cycle = require('./cycle');

class Story {
    id: string;
    title: string;
    username: string;
    cycles: Cycle[];
}

export = Story;