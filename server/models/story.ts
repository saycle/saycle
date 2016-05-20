import Cycle = require('./cycle');

class Story {
    id: string;
    title: string;
    username: string;
    active: boolean;
    password: string;
    cycles: Cycle[];
    cyclecount: number;
    date: Date;
    isLockedBy: string;
    deleted: boolean;
}

export = Story;