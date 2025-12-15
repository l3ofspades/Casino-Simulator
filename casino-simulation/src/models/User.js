export default class User {
    constructor(id, name, email, password, scores = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.scores = scores;
    }
}