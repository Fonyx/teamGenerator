const Intern = require('../lib/Intern');
const exceptions = require('../lib/Exceptions');
// top level test of Intern class
describe('Intern', () => {
    let validIntern = new Intern({name:'James', id:1, email:'validEmail', school:'SchoolName'});
    // testing initialization
    describe('Initialization', () => {
        it("should return a name string", () => {
            expect(validIntern.name).toEqual('James');
        });
        it("should return a id as integer", () => {
            expect(validIntern.id).toBe(1);
        });
        it("should return an email string", () => {
            expect(validIntern.email).toBe('validEmail');
        });
        it("should return a school string", () => {
            expect(validIntern.school).toBe('SchoolName');
        });

        // missing arguments
        it("should raise a exceptions.MissingArgumentError if missing all arguments", () => {
            expect(()=> {
                new Intern({});
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last 3 arguments", () => {
            expect(()=> {
                new Intern({name:'Jarrod'})
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last 2 arguments", () => {
            expect(()=> {
                new Intern({name:'Jarrod', id:4})
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last argument", () => {
            expect(()=> {
                new Intern({name:'Jarrod', id:4, email:'ValidEmail'})
            }).toThrow(exceptions.MissingArgumentError);
        })

        // bad argument types - str, int, str, str
        it("should raise a exceptions.BadArgumentError if bad name", () => {
            expect(()=> {
                new Intern({name:0, id:1, email:'ValidEmail', school:'ValidSchoolName'});
            }).toThrow(exceptions.BadArgumentError);
        })
        it("should raise a exceptions.BadArgumentError if bad id", () => {
            expect(()=> {
                new Intern({name:'ValidName', id:'badId', email:'ValidEmail', school:'ValidSchoolName'});;
            }).toThrow(exceptions.BadArgumentError);
        });
        it("should raise a exceptions.BadArgumentError if bad email", () => {
            expect(()=> {
                new Intern({name:'ValidName', id:'badId', email:0, school:'ValidSchoolName'});
            }).toThrow(exceptions.BadArgumentError);
        });
        it("should raise a exceptions.BadArgumentError if bad school", () => {
            expect(()=> {
                new Intern({name:'ValidName', id:'badId', email:0, school:0});
            }).toThrow(exceptions.BadArgumentError);
        })
    });
    // testing get name method
    describe('get name method', () => {
        it("should return a name string", () => {
            expect(validIntern.getName()).toEqual('James');
        });
    });
    // testing get id method
    describe('get id method', () => {
        it("should return an id integer", () => {
            expect(validIntern.getId()).toEqual(1);
        });
    });
    // testing get email method
    describe('get email method', () => {
        it("should return an email string", () => {
            expect(validIntern.getEmail()).toEqual('validEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        it("should return a role string", () => {
            expect(validIntern.getRole()).toEqual('Intern');
        });
    });
    // testing get school method
    describe('get school method', () => {
        it("should return a school string", () => {
            expect(validIntern.getSchool()).toEqual('SchoolName');
        });
    });
});