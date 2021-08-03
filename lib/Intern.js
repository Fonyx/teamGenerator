let Employee = require('./Employee');
const { BadArgumentError } = require('./Exceptions');

class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        if(!school instanceof String){
            throw BadArgumentError(`School argument ${school} wasn't a string`)
        } else {
            this.school = school;
        }
    }
}

module.exports = Intern;