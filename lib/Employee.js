const exceptions = require('./Exceptions');

class Employee{
    constructor(name, id, email){
        if(arguments.length !== 3){
            // throw new Error();
            throw new exceptions.MissingArgumentError(`Needs 3 arguments, got: ${arguments.length}`)
        }
        if(typeof(name) ===  'string'){
            this.name = name;
        } else {
            // throw new Error();
            throw new exceptions.BadArgumentError(`${name} was not type string`);
        }
        let integer = parseInt(id, 10);
        if(isNaN(integer)){
            throw new exceptions.BadArgumentError(`${id} was not type integer`);
        } else {
            this.id = integer;
        }
        if(typeof(email) ===  'string'){
            this.email = email;
        } else {
            // throw new Error();
            throw new exceptions.BadArgumentError(`${email} was not type string`);
        }
    }

    getEmail(){
        return this.email;
    }
    
    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getRole(){
        return 'Employee';
    }


}

module.exports = Employee;