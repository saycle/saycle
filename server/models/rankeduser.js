var RankedUser = (function () {
    function RankedUser(rankedUserObj) {
        this.username = rankedUserObj.username;
        this.charCount = rankedUserObj.password;
        this.recentStoryId = rankedUserObj.verified;
        this.recentStoryTitle = rankedUserObj.email;
    }
    return RankedUser;
})();
module.exports = RankedUser;
//# sourceMappingURL=rankeduser.js.map