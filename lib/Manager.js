let Employee = require('./Employee');

class Manager extends Employee{
    constructor(name){
        super(name);
    }
}

module.exports = Manager;