export default class Score {
    constructor(id, userId, game, points, date = new Date()) {
        this.id = id;
        this.userId = userId;
        this.game = game;
        this.points = points;
        this.date = date;
    } 
}