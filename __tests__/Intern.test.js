const Intern = require('../lib/Intern');

// top level test of Intern class
describe('Intern', () => {
    // testing initialization
    describe('Initialization', () => {
        it("should return a name string", () => {
            const intern = new Intern('James', 1, 'validEmail');
            expect(intern.name).toEqual('James');
        });
        it("should return a id as integer", () => {
            const intern = new Intern('James', 1, 'validEmail');
            expect(intern.id).toBe(1);
        });
        it("should return an email string", () => {
            const intern = new Intern('James', 1, 'validEmail');
            expect(intern.name).toBe('validEmail');
        });


        it("should raise a MissingArgumentError if miss-constructed", () => {
            expect(()=> {
                new Intern()
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Intern('Jarrod')
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Intern('Jarrod', 4)
            }).toThrowError(MissingArgumentError);
        })
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Intern('Jarrod', 4, 'ValidEmail')
            }).toThrowError(MissingArgumentError);
        })


        it("should raise a BadArgumentError if bad id", () => {
            expect(()=> {
                new Intern('ValidName', 'badId', 'ValidEmail', 1);
            }).toThrowError(BadArgumentError);
        })
        it("should raise a BadArgumentError if bad name", () => {
            expect(()=> {
                new Intern(0, 0, 'ValidEmail', 1);
            }).toThrowError(BadArgumentError);
        })
        it("should raise a BadArgumentError if bad email", () => {
            expect(()=> {
                new Intern('ValidName', 'badId', 0, 1);
            }).toThrowError(BadArgumentError);
        })
    });
    // testing get name method
    describe('get name method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail');
        it("should return a name string", () => {
            expect(intern.getName()).toEqual('James');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail');
        it("should return an id integer", () => {
            expect(intern.getId()).toEqual(2);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail');
        it("should return an email string", () => {
            expect(intern.getEmail()).toEqual('anotherValidEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        const intern = new Intern('Jemima', 2, 'anotherValidEmail');
        it("should return a role string", () => {
            expect(intern.getRole()).toEqual('Intern');
        });
    });
});