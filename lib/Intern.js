let Employee = require('./Employee');
const exceptions = require('./Exceptions');

class Intern extends Employee{
    constructor(name, id, email, school){
        if(arguments.length < 4){
            throw new exceptions.MissingArgumentError(`Expected 3 arguments, got ${arguments.length}`);
        }
        super(name, id, email);
        if(typeof(school) !== 'string'){
            throw new exceptions.BadArgumentError(`School argument ${school} wasn't a string`)
        } else {
            this.school = school;
        }
    }

    getSchool(){
        return this.school
    }

    getRole(){
        return 'Intern';
    }

}

module.exports = Intern;