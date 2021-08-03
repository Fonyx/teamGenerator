const Intern = require('../lib/Intern');

// top level test of Intern class
describe('Intern', () => {
    // testing initialization
    describe('Initialization', () => {
        let intern = new Intern('James', 1, 'validEmail', 'SchoolName');
        it("should return a name string", () => {
            expect(intern.name).toEqual('James');
        });
    })
});
//         it("should return a id as integer", () => {
//             expect(intern.id).toBe(1);
//         });
//         it("should return an email string", () => {
//             expect(intern.name).toBe('validEmail');
//         });
//         it("should return a school string", () => {
//             expect(intern.school).toBe('SchoolName');
//         });

//         // missing arguments
//         it("should raise a MissingArgumentError if miss-constructed", () => {
//             expect(()=> {
//                 new Intern()
//             }).toThrow(MissingArgumentError);
//         })
//         it("should raise a MissingArgumentError Error if miss-constructed", () => {
//             expect(()=> {
//                 new Intern('Jarrod')
//             }).toThrow(MissingArgumentError);
//         })
//         it("should raise a MissingArgumentError Error if miss-constructed", () => {
//             expect(()=> {
//                 new Intern('Jarrod', 4)
//             }).toThrow(MissingArgumentError);
//         })
//         it("should raise a MissingArgumentError Error if miss-constructed", () => {
//             expect(()=> {
//                 new Intern('Jarrod', 4, 'ValidEmail')
//             }).toThrow(MissingArgumentError);
//         })

//         // bad argument types
//         it("should raise a BadArgumentError if bad name", () => {
//             expect(()=> {
//                 new Intern('ValidName', 0, 'ValidEmail', 1);
//             }).toThrow(BadArgumentError);
//         })
//         it("should raise a BadArgumentError if bad id", () => {
//             expect(()=> {
//                 new Intern('ValidName', 'badId', 'ValidEmail', 1);
//             }).toThrow(BadArgumentError);
//         });
//         it("should raise a BadArgumentError if bad email", () => {
//             expect(()=> {
//                 new Intern('ValidName', 1, 0, 1);
//             }).toThrow(BadArgumentError);
//         });
//         it("should raise a BadArgumentError if bad school", () => {
//             expect(()=> {
//                 new Intern('ValidName', 1, 'ValidEmail', 0);
//             }).toThrow(BadArgumentError);
//         })
//     });
//     // testing get name method
//     describe('get name method', () => {
//         const intern = new Intern('Jemima', 2, 'anotherValidEmail');
//         it("should return a name string", () => {
//             expect(intern.getName()).toEqual('James');
//         });
//     });
//     // testing get id method
//     describe('get id method', () => {
//         const intern = new Intern('Jemima', 2, 'anotherValidEmail');
//         it("should return an id integer", () => {
//             expect(intern.getId()).toEqual(2);
//         });
//     });
//     // testing get email method
//     describe('get email method', () => {
//         const intern = new Intern('Jemima', 2, 'anotherValidEmail');
//         it("should return an email string", () => {
//             expect(intern.getEmail()).toEqual('anotherValidEmail');
//         });
//     });
//     // testing get role method
//     describe('get role method', () => {
//         const intern = new Intern('Jemima', 2, 'anotherValidEmail');
//         it("should return a role string", () => {
//             expect(intern.getRole()).toEqual('Intern');
//         });
//     });
//     // testing get school method
//     describe('get school method', () => {
//         const intern = new Intern('Jemima', 2, 'anotherValidEmail', 'SchoolName');
//         it("should return a school string", () => {
//             expect(intern.getSchool()).toEqual('SchoolName');
//         });
//     });
// });