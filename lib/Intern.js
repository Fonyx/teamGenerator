const { attr } = require('cheerio/lib/api/attributes');
let Employee = require('./Employee');
const exceptions = require('./Exceptions');

class Intern extends Employee{
    constructor({name, id, email, school}={}){
        // since we are allowing keyword args, arguments becomes an array with one object element for unpacking
        if(name === undefined || id === undefined || email === undefined || school === undefined){
            throw new exceptions.MissingArgumentError(`Expected 4 arguments, got ${arguments[0].length}`);
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