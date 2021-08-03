const Intern = require('../lib/Intern');
const exceptions = require('../lib/Exceptions');
// top level test of Intern class
describe('Intern', () => {
    // testing initialization
    describe('Initialization', () => {
        let intern = new Intern('James', 1, 'validEmail', 'SchoolName');
        it("should return a name string", () => {
            expect(intern.name).toEqual('James');
        });
        it("should return a id as integer", () => {
            expect(intern.id).toBe(1);
        });
        it("should return an email string", () => {
            expect(intern.email).toBe('validEmail');
        });
        it("should return a school string", () => {
            expect(intern.school).toBe('SchoolName');
        });

        // missing arguments
        it("should raise a exceptions.MissingArgumentError if missing all arguments", () => {
            expect(()=> {
                new Intern()
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last 3 arguments", () => {
            expect(()=> {
                new Intern('Jarrod')
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last 2 arguments", () => {
            expect(()=> {
                new Intern('Jarrod', 4)
            }).toThrow(exceptions.MissingArgumentError);
        })
        it("should raise a exceptions.MissingArgumentError if missing last argument", () => {
            expect(()=> {
                new Intern('Jarrod', 4, 'ValidEmail')
            }).toThrow(exceptions.MissingArgumentError);
        })

        // bad argument types - str, int, str, str
        it("should raise a exceptions.BadArgumentError if bad name", () => {
            expect(()=> {
                new Intern(0, 1, 'ValidEmail', 'ValidSchoolName');
            }).toThrow(exceptions.BadArgumentError);
        })
        it("should raise a exceptions.BadArgumentError if bad id", () => {
            expect(()=> {
                new Intern('ValidName', 'badId', 'ValidEmail', 'ValidSchoolName');
            }).toThrow(exceptions.BadArgumentError);
        });
        it("should raise a exceptions.BadArgumentError if bad email", () => {
            expect(()=> {
                new Intern('ValidName', 1, 0, 'ValidSchoolName');
            }).toThrow(exceptions.BadArgumentError);
        });
        it("should raise a exceptions.BadArgumentError if bad school", () => {
            expect(()=> {
                new Intern('ValidName', 1, 'ValidEmail', 0);
            }).toThrow(exceptions.BadArgumentError);
        })
    });
    // testing get name method
    describe('get name method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail', 'ValidSchoolName');
        it("should return a name string", () => {
            expect(intern.getName()).toEqual('Jemima');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail', 'ValidSchoolName');
        it("should return an id integer", () => {
            expect(intern.getId()).toEqual(2);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail', 'ValidSchoolName');
        it("should return an email string", () => {
            expect(intern.getEmail()).toEqual('anotherValidEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail', 'ValidSchoolName');
        it("should return a role string", () => {
            expect(intern.getRole()).toEqual('Intern');
        });
    });
    // testing get school method
    describe('get school method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail', 'SchoolName');
        it("should return a school string", () => {
            expect(intern.getSchool()).toEqual('SchoolName');
        });
    });
});