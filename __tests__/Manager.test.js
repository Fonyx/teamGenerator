const Manager = require('../lib/Manager');
const exceptions = require('../lib/Exceptions');

// top level test of Manager class
describe('Manager', () => {
    let validManager = new Manager({name:'James', id:1, email:'validEmail', officeNumber:123});
    // testing initialization
    describe('Initialization', () => {
        it("should return a name string", () => {
            expect(validManager.name).toEqual('James');
        });
        it("should return a id as integer", () => {
            expect(validManager.id).toBe(1);
        });
        it("should return an email string", () => {
            expect(validManager.email).toBe('validEmail');
        });
        it("should return an email string", () => {
            expect(validManager.officeNumber).toBe(123);
        });


        it("should raise a exceptions.MissingArgumentError if missing all arguments", () => {
            expect(()=> {
                new Manager({})
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last 3 arguments", () => {
            expect(()=> {
                new Manager({name: 'Jarrod'})
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last 2 arguments", () => {
            expect(()=> {
                new Manager({name:'Jarrod', id:4})
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last argument", () => {
            expect(()=> {
                new Manager({name:'Jarrod', id:4, email:'ValidEmail'})
            }).toThrow(exceptions.MissingArgumentError);
        })


        it("should raise a exceptions.BadArgumentError if bad name", () => {
            expect(()=> {
                new Manager({name:0, id:0, email:'ValidEmail', officeNumber: 'badOfficeNumber'});
            }).toThrow(exceptions.BadArgumentError);
        })
        it("should raise a exceptions.BadArgumentError if bad id", () => {
            expect(()=> {
                new Manager({name:'ValidName', id:false, email:'ValidEmail', officeNumber: 'badOfficeNumber'});
            }).toThrow(exceptions.BadArgumentError);
        })
        it("should raise a exceptions.BadArgumentError if bad email", () => {
            expect(()=> {
                new Manager({name:'ValidName', id:0, email:{badEmail: 'bad'}, officeNumber: 123});
            }).toThrow(exceptions.BadArgumentError);
        })
        it("should raise a exceptions.BadArgumentError if bad office number", () => {
            expect(()=> {
                new Manager({name:'ValidName', id:0, email:'ValidEmail', officeNumber: 'badOfficeNumber'});
            }).toThrow(exceptions.BadArgumentError);
        })
    });
    // testing get name method
    describe('get name method', () => {
        it("should return a name string", () => {
            expect(validManager.getName()).toEqual('James');
        });
    });
    // testing get id method
    describe('get id method', () => {
        it("should return an id integer", () => {
            expect(validManager.getId()).toEqual(1);
        });
    });
    // testing get email method
    describe('get email method', () => {
        it("should return an email string", () => {
            expect(validManager.getEmail()).toEqual('validEmail');
        });
    });
    // testing get office number method
    describe('get office number method', () => {
        it("should return an officeNumber integer", () => {
            expect(validManager.getOfficeNumber()).toEqual(123);
        });
    });
    // testing get role method
    describe('get role method', () => {
        it("should return a role string", () => {
            expect(validManager.getRole()).toEqual('Manager');
        });
    });
});