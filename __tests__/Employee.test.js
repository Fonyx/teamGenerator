const Employee = require('../lib/Employee');
const Exceptions = require('../lib/Exceptions');

// top level test of Employee class
describe('Employee', () => {
    // testing initialization
    describe('Initialization', () => {
        // Happy Path
        it("should return a name string", () => {
            const employee = new Employee('James', '1', 'validEmail');
            expect(employee.name).toBe('James');
        });
        it("should return a id integer", () => {
            const employee = new Employee('James', '1', 'validEmail');
            expect(employee.id).toBe(1);
        });
        it("should return an email string", () => {
            const employee = new Employee('James', '1', 'validEmail');
            expect(employee.email).toBe('validEmail');
        });

        // Missing arguments
        it("UHP should raise a MissingArgumentError if no arguments", () => {
            expect(()=> {
                new Employee();
            }).toThrowError(Exceptions.MissingArgumentError);
        });
        it("UHP should raise a MissingArgumentError if missing id", () => {
            expect(() => {
                new Employee('Jarrod', 'email');
            }).toThrowError(Exceptions.MissingArgumentError);
        });
        it("UHP should raise a MissingArgumentError if missing email", () => {
            expect(()=> {
                new Employee('Jarrod', 4);
            }).toThrowError(Exceptions.MissingArgumentError);
        });
        // incorrect types for arguments - str, int, str
        it("UHP should raise a BadArgumentError if bad name", () => {
            expect(()=> {
                new Employee(0, 'BadId-ShouldBeInt', 'email');
            }).toThrowError(Exceptions.BadArgumentError);
        });
        it("UHP should raise a BadArgumentError if bad id", () => {
            expect(()=> {
                new Employee('Name', 'BadId-ShouldBeInt', 'email');
            }).toThrowError(Exceptions.BadArgumentError);
        });
        it("UHP should raise a BadArgumentError if bad email", () => {
            expect(()=> {
                new Employee('Name', 'BadId-ShouldBeInt', {badEmail:'ThisShouldBeAStringNotAnObject'});
            }).toThrowError(Exceptions.BadArgumentError);
        });
    });
    //testing get name method
    describe('get name method', () => {
        const employee = new Employee('Jemima', 2, 'anotherValidEmail');
        it("should return a name string", () => {
            expect(employee.getName()).toBe('Jemima');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const employee = new Employee('Jemima', 2, 'anotherValidEmail');
        it("should return an id integer", () => {
            expect(employee.getId()).toBe(2);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const employee = new Employee('Jemima', 2, 'anotherValidEmail');
        it("should return an email string", () => {
            expect(employee.getEmail()).toBe('anotherValidEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        const employee = new Employee('Jemima', 2, 'anotherValidEmail');
        it("should return a role string", () => {
            expect(employee.getRole()).toBe('Employee');
        });
    });
});