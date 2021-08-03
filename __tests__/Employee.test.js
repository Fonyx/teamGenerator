const Employee = require('../lib/Employee');


// top level test of Employee class
describe('Employee', () => {
    // testing initialization
    describe('Initialization', () => {
        it("should return a name string", () => {
            const employee = new Employee('James', 1, 'validEmail');
            expect(employee.name).toEqual('James');
        });
        it("should return a id integer", () => {
            const employee = new Employee('James', 1, 'validEmail');
            expect(employee.id).toBe(1);
        });
        it("should return an email string", () => {
            const employee = new Employee('James', 1, 'validEmail');
            expect(employee.name).toBe('validEmail');
        });
        it("should raise a MissingArgumentError if miss-constructed", () => {
            expect(()=> {
                new Employee()
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Employee('Jarrod')
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Employee('Jarrod', 4)
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Employee('Jarrod', 4, 'ValidEmail')
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a BadArgumentError if bad id", () => {
            expect(()=> {
                new Employee('ValidName', 'badId', 'ValidEmail', 1);
            }).toThrowError(BadArgumentError);
        })
        it("should raise a BadArgumentError if bad name", () => {
            expect(()=> {
                new Employee(0, 0, 'ValidEmail', 1);
            }).toThrowError(BadArgumentError);
        })
        it("should raise a BadArgumentError if bad email", () => {
            expect(()=> {
                new Employee('ValidName', 'badId', 0, 1);
            }).toThrowError(BadArgumentError);
        })
    });
    // testing get name method
    describe('get name method', () => {
        const employee = new Employee('Jemima', 2, 'anotherValidEmail');
        it("should return a name string", () => {
            expect(employee.getName()).toEqual('James');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const employee = new Employee('Jemima', 2, 'anotherValidEmail');
        it("should return an id integer", () => {
            expect(employee.getId()).toEqual(2);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const employee = new Employee('Jemima', 2, 'anotherValidEmail');
        it("should return an email string", () => {
            expect(employee.getEmail()).toEqual('anotherValidEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        const employee = new Employee('Jemima', 2, 'anotherValidEmail');
        it("should return a role string", () => {
            expect(employee.getRole()).toEqual('Employee');
        });
    });
});