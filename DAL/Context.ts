import UserController = require('./UserController.ts');
import StoryController = require('./StoryController.ts');

export = {
    Users: UserController.DAL.UserController,
    Stories: StoryController.DAL.StoryController
};