const Manager = require('../lib/Manager');
const exceptions = require('../lib/Exceptions');

// top level test of Manager class
describe('Manager', () => {
    // testing initialization
    describe('Initialization', () => {
        let manager = new Manager('James', 1, 'validEmail', 123);
        it("should return a name string", () => {
            expect(manager.name).toEqual('James');
        });
        it("should return a id as integer", () => {
            expect(manager.id).toBe(1);
        });
        it("should return an email string", () => {
            expect(manager.email).toBe('validEmail');
        });
        it("should return an email string", () => {
            expect(manager.officeNumber).toBe(123);
        });


        it("should raise a exceptions.MissingArgumentError if missing all arguments", () => {
            expect(()=> {
                new Manager()
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last 3 arguments", () => {
            expect(()=> {
                new Manager('Jarrod')
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last 2 arguments", () => {
            expect(()=> {
                new Manager('Jarrod', 4)
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last argument", () => {
            expect(()=> {
                new Manager('Jarrod', 4, 'ValidEmail')
            }).toThrow(exceptions.MissingArgumentError);
        })


        it("should raise a exceptions.BadArgumentError if bad name", () => {
            expect(()=> {
                new Manager(0, 0, 'ValidEmail', 1);
            }).toThrow(exceptions.BadArgumentError);
        })
        it("should raise a exceptions.BadArgumentError if bad id", () => {
            expect(()=> {
                new Manager('ValidName', 'badId', 'ValidEmail', 1);
            }).toThrow(exceptions.BadArgumentError);
        })
        it("should raise a exceptions.BadArgumentError if bad email", () => {
            expect(()=> {
                new Manager('ValidName', 0, {badEmail: "badEmailShouldBeStringNotObject"}, 1);
            }).toThrow(exceptions.BadArgumentError);
        })
        it("should raise a exceptions.BadArgumentError if bad office number", () => {
            expect(()=> {
                new Manager('ValidName', 0, 'ValidEmail', "badOfficeNumber");
            }).toThrow(exceptions.BadArgumentError);
        })
    });
    // testing get name method
    describe('get name method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail', 123);
        it("should return a name string", () => {
            expect(manager.getName()).toEqual('Jemima');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail', 123);
        it("should return an id integer", () => {
            expect(manager.getId()).toEqual(2);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail', 123);
        it("should return an email string", () => {
            expect(manager.getEmail()).toEqual('anotherValidEmail');
        });
    });
    // testing get office number method
    describe('get office number method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail', 123);
        it("should return an officeNumber integer", () => {
            expect(manager.getOfficeNumber()).toEqual(123);
        });
    });
    // testing get role method
    describe('get role method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail', 123);
        it("should return a role string", () => {
            expect(manager.getRole()).toEqual('Manager');
        });
    });
});