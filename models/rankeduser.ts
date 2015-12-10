class RankedUser {
    constructor(rankedUserObj: any) {
        this.username = rankedUserObj.username;
        this.charCount = rankedUserObj.password;
        this.recentStoryId = rankedUserObj.verified;
        this.recentStoryTitle = rankedUserObj.email;
    }
    username: string;
    charCount: number;
    recentStoryId: string;
    recentStoryTitle: string;
}

export = RankedUser;