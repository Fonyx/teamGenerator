const Manager = require('../lib/Manager');

// top level test of Manager class
describe('Manager', () => {
    // testing initialization
    describe('Initialization', () => {
        it("should return a name string", () => {
            const manager = new Manager('James', 1, 'validEmail', 123);
            expect(manager.name).toEqual('James');
        });
        it("should return a id as integer", () => {
            const manager = new Manager('James', 1, 'validEmail', 123);
            expect(manager.id).toBe(1);
        });
        it("should return an email string", () => {
            const manager = new Manager('James', 1, 'validEmail', 123);
            expect(manager.name).toBe('validEmail');
        });
        it("should return an email string", () => {
            const manager = new Manager('James', 1, 'validEmail', 123);
            expect(manager.officeNumber).toBe(123);
        });


        it("should raise a MissingArgumentError if miss-constructed", () => {
            expect(()=> {
                new Manager()
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Manager('Jarrod')
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Manager('Jarrod', 4)
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Manager('Jarrod', 4, 'ValidEmail')
            }).toThrowError(MissingArgumentError);
        })


        it("should raise a BadArgumentError if bad id", () => {
            expect(()=> {
                new Manager('ValidName', 'badId', 'ValidEmail', 1);
            }).toThrowError(BadArgumentError);
        })
        it("should raise a BadArgumentError if bad name", () => {
            expect(()=> {
                new Manager(0, 0, 'ValidEmail', 1);
            }).toThrowError(BadArgumentError);
        })
        it("should raise a BadArgumentError if bad email", () => {
            expect(()=> {
                new Manager('ValidName', 'badId', 0, 1);
            }).toThrowError(BadArgumentError);
        })
        it("should raise a BadArgumentError if bad office number", () => {
            expect(()=> {
                new Manager('ValidName', 0, 'ValidEmail', "badOfficeNumber");
            }).toThrowError(BadArgumentError);
        })
    });
    // testing get name method
    describe('get name method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail');
        it("should return a name string", () => {
            expect(manager.getName()).toEqual('James');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail');
        it("should return an id integer", () => {
            expect(manager.getId()).toEqual(2);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail');
        it("should return an email string", () => {
            expect(manager.getEmail()).toEqual('anotherValidEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        const manager = new Manager('Jemima', 2, 'anotherValidEmail');
        it("should return a role string", () => {
            expect(manager.getRole()).toEqual('Manager');
        });
    });
});