const Engineer = require('../lib/Engineer');
const exceptions = require('../lib/Exceptions');

// top level test of Engineer class
describe('Engineer', () => {
    // testing initialization
    describe('Initialization', () => {
        it("should return a name string", () => {
            const engineer = new Engineer({name:'James', id:1, email:'validEmail', github:'ValidGithub'});
            expect(engineer.name).toEqual('James');
        });
        it("should return a id as integer", () => {
            const engineer = new Engineer({name:'James', id:1, email:'validEmail', github:'ValidGithub'});
            expect(engineer.id).toBe(1);
        });
        it("should return an email string", () => {
            const engineer = new Engineer({name:'James', id:1, email:'validEmail', github:'ValidGithub'});
            expect(engineer.email).toBe('validEmail');
        });
        it("should return a github url string", () => {
            const engineer = new Engineer({name:'James', id:1, email:'validEmail', github:'ValidGithub'});
            expect(engineer.github).toBe('ValidGithub');
        });

        // missing arguments at initialization
        it("should raise a MissingArgumentError if missing all values", () => {
            expect(()=> {
                new Engineer({});
            }).toThrow(exceptions.MissingArgumentError);
        });
        it("should raise a MissingArgumentError if missing last 3 values", () => {
            expect(()=> {
                new Engineer({name: 'Jarrod'});
            }).toThrow(exceptions.MissingArgumentError);
        });
        it("should raise a MissingArgumentError Error if missing last 2 values", () => {
            expect(()=> {
                new Engineer({name: 'Jarrod', id: 4});
            }).toThrow(exceptions.MissingArgumentError);
        });
        it("should raise a MissingArgumentError Error if missing last value", () => {
            expect(()=> {
                new Engineer({name: 'Jarrod', id: 4, email: 'ValidEmail'});
            }).toThrow(exceptions.MissingArgumentError);
        });

        // bad arguments at initialization
        it("should raise a BadArgumentError if bad name", () => {
            expect(()=> {
                new Engineer({name: 0, id: 1, email: 'ValidEmail', github: 'ValidGithub'});
            }).toThrow(exceptions.BadArgumentError);
        });
        it("should raise a BadArgumentError if bad id", () => {
            expect(()=> {
                new Engineer({name: 0, id: 'badId', email: 'ValidEmail', github: 'ValidGithub'});
            }).toThrow(exceptions.BadArgumentError);
        });
        it("should raise a BadArgumentError if bad email", () => {
            expect(()=> {
                new Engineer({name: 0, id: 1, email: 0, github: 'ValidGithub'});
            }).toThrow(exceptions.BadArgumentError);
        });
        it("should raise a BadArgumentError if bad github", () => {
            expect(()=> {
                new Engineer({name: 0, id: 1, email: 'ValidEmail', github: 0});
            }).toThrow(exceptions.BadArgumentError);
        });
    });
    // testing get name method
    let ValidEngineer = {name: 'Jemima', id: 2, email: 'anotherValidEmail', github: 'ValidGithub'};
    describe('get name method', () => {
        const engineer = new Engineer(ValidEngineer);
        it("should return a name string", () => {
            expect(engineer.getName()).toEqual('Jemima');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const engineer = new Engineer(ValidEngineer);
        it("should return an id integer", () => {
            expect(engineer.getId()).toEqual(2);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const engineer = new Engineer(ValidEngineer);
        it("should return an email string", () => {
            expect(engineer.getEmail()).toEqual('anotherValidEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        const engineer = new Engineer(ValidEngineer);
        it("should return a role string", () => {
            expect(engineer.getRole()).toEqual('Engineer');
        });
    });
    // testing get github method
    describe('get github method', () => {
        const engineer = new Engineer(ValidEngineer);
        it("should return a github string", () => {
            expect(engineer.getGithub()).toEqual('ValidGithub');
        });
    });
});