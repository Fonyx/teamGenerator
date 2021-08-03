let Employee = require('./Employee');
let exceptions = require('./Exceptions');
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        if(arguments.length < 4){
            throw new exceptions.MissingArgumentError(`Expected 3 arguments, got ${arguments.length}`);
        }
        super(name, id, email);
        
        if(typeof(officeNumber) ===  'number'){
            this.officeNumber = officeNumber;
        } else {
            // throw new Error();
            throw new exceptions.BadArgumentError(`${officeNumber} was not type integer`);
        }
    }

    getOfficeNumber(){
        return this.officeNumber;
    }

    getRole(){
        return 'Manager';
    }
}

module.exports = Manager;