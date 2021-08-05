let Employee = require('./Employee');
let exceptions = require('./Exceptions');

class Engineer extends Employee{
    constructor({name, id, email, github}={}){
        // since we are allowing keyword args, arguments becomes an array with one object element for unpacking
        if(name === undefined || id === undefined || email === undefined || github === undefined){
            throw new exceptions.MissingArgumentError(`Expected 4 arguments, got ${arguments[0].length}`);
        }
        super(name, id, email);
        if(typeof(github) !== 'string'){
            throw new exceptions.BadArgumentError(`Github argument was not type string`);
        } else {
            this.github = github;
        }
    }

    getRole(){
        return 'Engineer';
    }

    getGithub(){
        return this.github;
    }
}

module.exports = Engineer;