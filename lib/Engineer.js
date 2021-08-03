let Employee = require('./Employee');
let exceptions = require('./Exceptions');

class Engineer extends Employee{
    constructor(name, id, email, github){
        if(arguments.length < 4){
            throw new exceptions.MissingArgumentError(`Expected 4 arguments, got ${arguments.length}`);
        }
        super(name, id, email);
        if(typeof(github) !== 'string'){
            throw new exceptions.BadArgumentError(`Github argument ${github} was not type string`);
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