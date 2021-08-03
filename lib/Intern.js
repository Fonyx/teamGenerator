let Employee = require('./Employee');

class Intern extends Employee{
    constructor(name){
        super(name);
    }
}

module.exports = Intern;