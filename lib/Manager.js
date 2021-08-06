let Employee = require('./Employee');
let exceptions = require('./Exceptions');
class Manager extends Employee{
    constructor({name, id, email, officeNumber}={}){
        // since we are allowing keyword args, arguments becomes an array with one object element for unpacking
        if(name === undefined || id === undefined || email === undefined || officeNumber === undefined){
            throw new exceptions.MissingArgumentError(`Expected 4 arguments, got ${arguments[0].length}`);
        }
        super(name, id, email);

        var integerOfficeNumber = parseInt(officeNumber, 10);
        if(isNaN(integerOfficeNumber)){
            throw new exceptions.BadArgumentError(`${officeNumber} was not type integer`);
        } else {
            this.officeNumber = integerOfficeNumber;
        }
        
        // if(typeof(officeNumber) ===  'number'){
        //     this.officeNumber = officeNumber;
        // } else {
        //     // throw new Error();
        //     throw new exceptions.BadArgumentError(`${officeNumber} was not type integer`);
        // }
    }

    getOfficeNumber(){
        return this.officeNumber;
    }

    getRole(){
        return 'Manager';
    }
}

module.exports = Manager;