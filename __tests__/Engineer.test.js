const Engineer = require('../lib/Engineer');


// top level test of Engineer class
describe('Engineer', () => {
    // testing initialization
    describe('Initialization', () => {
        it("should return a name string", () => {
            const engineer = new Engineer('James', 1, 'validEmail');
            expect(engineer.name).toEqual('James');
        });
        it("should return a id as integer", () => {
            const engineer = new Engineer('James', 1, 'validEmail');
            expect(engineer.id).toBe(1);
        });
        it("should return an email string", () => {
            const engineer = new Engineer('James', 1, 'validEmail');
            expect(engineer.name).toBe('validEmail');
        });


        it("should raise a MissingArgumentError if miss-constructed", () => {
            expect(()=> {
                new Engineer()
            }).toThrowError(MissingArgumentError);
        });
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Engineer('Jarrod')
            }).toThrowError(MissingArgumentError);
        });
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Engineer('Jarrod', 4)
            }).toThrowError(MissingArgumentError);
        });
        it("should raise a MissingArgumentError Error if miss-constructed", () => {
            expect(()=> {
                new Engineer('Jarrod', 4, 'ValidEmail')
            }).toThrowError(MissingArgumentError);
        });


        it("should raise a BadArgumentError if bad id", () => {
            expect(()=> {
                new Engineer('ValidName', 'badId', 'ValidEmail', 'github');
            }).toThrowError(BadArgumentError);
        });
        it("should raise a BadArgumentError if bad name", () => {
            expect(()=> {
                new Engineer(0, 0, 'ValidEmail', 'github');
            }).toThrowError(BadArgumentError);
        });
        it("should raise a BadArgumentError if bad email", () => {
            expect(()=> {
                new Engineer('ValidName', 'badId', 0, 'github');
            }).toThrowError(BadArgumentError);
        });
        it("should raise a BadArgumentError if bad github", () => {
            expect(()=> {
                new Engineer('ValidName', 'badId', 'ValidEmail', 0);
            }).toThrowError(BadArgumentError);
        });
    });
    // testing get name method
    describe('get name method', () => {
        const engineer = new Engineer('Jemima', 2, 'anotherValidEmail');
        it("should return a name string", () => {
            expect(engineer.getName()).toEqual('James');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const engineer = new Engineer('Jemima', 2, 'anotherValidEmail');
        it("should return an id integer", () => {
            expect(engineer.getId()).toEqual(2);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const engineer = new Engineer('Jemima', 2, 'anotherValidEmail');
        it("should return an email string", () => {
            expect(engineer.getEmail()).toEqual('anotherValidEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        const engineer = new Engineer('Jemima', 2, 'anotherValidEmail', 'githublink');
        it("should return a role string", () => {
            expect(engineer.getRole()).toEqual('Engineer');
        });
    });
    // testing get github method
    describe('get github method', () => {
        const engineer = new Engineer('Jemima', 2, 'anotherValidEmail', 'githublink');
        it("should return a github string", () => {
            expect(engineer.getGithub()).toEqual('githublink');
        });
    });
});